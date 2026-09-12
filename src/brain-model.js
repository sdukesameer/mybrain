/* Procedural 3D brain. Coordinates: +x right, +y superior, +z anterior.
   1 model unit ≈ 85 mm. Cortex is a gyrified ellipsoid partitioned into real
   lobes by anatomical boundary functions, so each lobe is separately pickable. */
window.BRAIN = (function () {
  const T = window.THREE;
  let scene, cam, renderer, ray, canvas, labelHost;
  let groups = {};            // meshKey -> [meshes]
  let pickables = [];
  let cortexMeshes = [], overlayGroup, markerMesh;
  let selected = null, hovered = null;
  let onPick = null, onHover = null;
  let rot = { az: 0.62, el: 0.16 }, dist = 3.05, target = new T.Vector3(0, -0.02, 0);
  let want = { az: 0.62, el: 0.16, dist: 3.05 };
  let clipPlane = null, needsRender = true, failed = false;

  /* ── value noise ────────────────────────────────────────────────── */
  function hash(i, j, k) {
    let n = i * 374761393 + j * 668265263 + k * 1274126177;
    n = (n ^ (n >> 13)) * 1274126177;
    return ((n ^ (n >> 16)) & 0x7fffffff) / 0x7fffffff;
  }
  const sm = t => t * t * (3 - 2 * t);
  function noise(x, y, z) {
    const i = Math.floor(x), j = Math.floor(y), k = Math.floor(z);
    const fx = sm(x - i), fy = sm(y - j), fz = sm(z - k);
    let v = 0;
    for (let a = 0; a < 2; a++) for (let b = 0; b < 2; b++) for (let c = 0; c < 2; c++) {
      const w = (a ? fx : 1 - fx) * (b ? fy : 1 - fy) * (c ? fz : 1 - fz);
      v += w * hash(i + a, j + b, k + c);
    }
    return v * 2 - 1;
  }
  const fbm = (x, y, z) => noise(x, y, z) * 0.62 + noise(x * 2.1, y * 2.1, z * 2.1) * 0.26 + noise(x * 4.3, y * 4.3, z * 4.3) * 0.12;

  /* ── cortical surface ───────────────────────────────────────────── */
  // Sylvian (lateral) fissure line in the y–z plane.
  const sylvian = z => -0.12 - 0.22 * (z - 0.55);
  // Central sulcus: tilted fronto-parietal boundary.
  const centralS = y => 0.25 - 0.5 * y;

  function lobeOf(x, y, z) {
    if (z < -0.72) return 'occipital';
    if (y < sylvian(z) && z > -0.58) return 'temporal';
    if (z > centralS(y)) return 'frontal';
    return 'parietal';
  }

  // Map a unit-sphere direction to a point on the cortical surface (right hemisphere).
  function cortexPoint(px, py, pz) {
    let x = px, y = py, z = pz;
    // anterior narrowing + occipital taper
    const narrow = 1 - 0.16 * Math.max(0, z) - 0.14 * Math.max(0, -z - 0.55);
    let ex = (x >= 0 ? x * 0.395 : x * 0.055) * narrow;
    let ey = y * 0.615 * (1 - 0.10 * Math.max(0, z));
    if (ey > 0.34) ey = 0.34 + (ey - 0.34) * 0.82;   // flatter vertex
    let ez = z * 0.98;
    // ventral flattening of the base
    if (ey < -0.30) ey = -0.30 + (ey + 0.30) * 0.52;
    // tentorial notch: cerebrum lifts posteriorly where the cerebellum sits
    if (ez < -0.30) {
      const floor = Math.min(-0.04, -0.30 + 0.34 * (-ez - 0.30));
      if (ey < floor) ey = floor;
    }
    // temporal pole comes forward and down
    if (ez > 0.2 && ey < -0.05) ez += 0.07 * Math.min(1, (ez - 0.2) * 2);
    // Sylvian fissure groove
    const dy = ey - sylvian(ez);
    const g = Math.exp(-(dy * dy) / 0.0032) * (ez > -0.62 ? 1 : 0.2);
    const inward = 0.052 * g;
    // gyral corrugation
    const n = fbm(px * 7.5 + 11, py * 8.5 + 3, pz * 7.5 + 7) * 0.030
            + fbm(px * 16.0, py * 17.0, pz * 16.0) * 0.013
            + fbm(px * 31.0, py * 31.0, pz * 31.0) * 0.005;
    const len = Math.hypot(ex, ey, ez) || 1;
    const s = 1 + (n - inward) / len;
    return [0.055 + ex * s, ey * s, ez * s];
  }

  function buildCortex(side) {
    const W = 170, H = 112;
    const verts = [], key2i = new Map(), gp = [];
    const k = (x, y, z) => Math.round(x * 4000) + '|' + Math.round(y * 4000) + '|' + Math.round(z * 4000);
    for (let j = 0; j <= H; j++) {
      gp.push([]);
      for (let i = 0; i < W; i++) {
        const u = i / W * Math.PI * 2, v = j / H * Math.PI;
        const p = cortexPoint(Math.sin(v) * Math.cos(u), Math.cos(v), Math.sin(v) * Math.sin(u));
        const kk = k(p[0], p[1], p[2]);
        let id = key2i.get(kk);
        if (id === undefined) { id = verts.length / 3; verts.push(p[0], p[1], p[2]); key2i.set(kk, id); }
        gp[j].push(id);
      }
    }
    const at = id => [verts[id * 3], verts[id * 3 + 1], verts[id * 3 + 2]];
    const lob = {};
    ['frontal', 'parietal', 'temporal', 'occipital'].forEach(n => { lob[n] = { m: new Map(), pos: [], idx: [] }; });
    const local = (L, id) => {
      let v = L.m.get(id);
      if (v === undefined) { const p = at(id); v = L.pos.length / 3; L.pos.push(p[0], p[1], p[2]); L.m.set(id, v); }
      return v;
    };
    for (let j = 0; j < H; j++) {
      for (let i = 0; i < W; i++) {
        const i2 = (i + 1) % W;
        const A = gp[j][i], Bv = gp[j][i2], C = gp[j + 1][i2], D = gp[j + 1][i];
        const pa = at(A), pb = at(Bv), pc = at(C), pd = at(D);
        const cx = (pa[0] + pb[0] + pc[0] + pd[0]) / 4, cy = (pa[1] + pb[1] + pc[1] + pd[1]) / 4, cz = (pa[2] + pb[2] + pc[2] + pd[2]) / 4;
        const L = lob[lobeOf(cx, cy, cz)];
        const a = local(L, A), b = local(L, Bv), c = local(L, C), d = local(L, D);
        if (A !== Bv && Bv !== C) L.idx.push(a, b, c);
        if (A !== C && C !== D) L.idx.push(a, c, d);
      }
    }
    Object.keys(lob).forEach(n => {
      const L = lob[n];
      const g = new T.BufferGeometry();
      g.setAttribute('position', new T.Float32BufferAttribute(L.pos, 3));
      g.setIndex(L.idx);
      g.computeVertexNormals();
      const m = mesh(g, LOBE_COL[n], { key: n, rough: 0.93 });
      if (side === 'L') m.scale.x = -1;
      cortexMeshes.push(m);
    });
  }

  /* ── primitive helpers ──────────────────────────────────────────── */
  const LOBE_COL = { frontal: 0x7d5c9c, parietal: 0x3f7f8d, temporal: 0xa9713f, occipital: 0x55659c };
  const mats = [];

  function mesh(geo, color, opt) {
    opt = opt || {};
    const mat = new T.MeshStandardMaterial({
      color: color, roughness: opt.rough != null ? opt.rough : 0.7, metalness: 0.02,
      transparent: true, opacity: opt.opacity != null ? opt.opacity : 1,
      flatShading: !!opt.flat, side: T.DoubleSide,
      emissive: new T.Color(0x000000)
    });
    mat.userData.base = { color: color, opacity: mat.opacity };
    mats.push(mat);
    const m = new T.Mesh(geo, mat);
    m.userData.key = opt.key;
    m.userData.cortex = !!opt.cortex || !!LOBE_COL[opt.key];
    scene.add(m);
    if (opt.key) {
      (groups[opt.key] = groups[opt.key] || []).push(m);
      if (opt.pick !== false) pickables.push(m);
    }
    return m;
  }

  function blob(key, color, pos, scale, rotv, opt) {
    const g = new T.SphereGeometry(1, 34, 24);
    const m = mesh(g, color, Object.assign({ key: key }, opt || {}));
    m.position.set(pos[0], pos[1], pos[2]);
    m.scale.set(scale[0], scale[1], scale[2]);
    if (rotv) m.rotation.set(rotv[0], rotv[1], rotv[2]);
    return m;
  }

  // Variable-radius tube along a Catmull-Rom curve.
  function tubeGeo(pts, radii, seg, rad) {
    const curve = new T.CatmullRomCurve3(pts.map(p => new T.Vector3(p[0], p[1], p[2])));
    const pos = [], idx = [];
    const up = new T.Vector3(0, 1, 0), tan = new T.Vector3(), n1 = new T.Vector3(), n2 = new T.Vector3();
    for (let i = 0; i <= seg; i++) {
      const t = i / seg;
      const c = curve.getPoint(t);
      curve.getTangent(t, tan).normalize();
      n1.copy(Math.abs(tan.y) > 0.9 ? new T.Vector3(1, 0, 0) : up).cross(tan).normalize();
      n2.copy(tan).cross(n1).normalize();
      const r = typeof radii === 'function' ? radii(t) : radii;
      for (let k = 0; k < rad; k++) {
        const a = k / rad * Math.PI * 2;
        pos.push(
          c.x + (n1.x * Math.cos(a) + n2.x * Math.sin(a)) * r,
          c.y + (n1.y * Math.cos(a) + n2.y * Math.sin(a)) * r,
          c.z + (n1.z * Math.cos(a) + n2.z * Math.sin(a)) * r
        );
      }
    }
    for (let i = 0; i < seg; i++) for (let k = 0; k < rad; k++) {
      const a = i * rad + k, b = i * rad + (k + 1) % rad, c = a + rad, d = b + rad;
      idx.push(a, b, d, a, d, c);
    }
    const g = new T.BufferGeometry();
    g.setAttribute('position', new T.Float32BufferAttribute(pos, 3));
    g.setIndex(idx);
    g.computeVertexNormals();
    return g;
  }

  function tube(key, color, pts, radii, opt) {
    opt = opt || {};
    const g = tubeGeo(pts, radii, opt.seg || 70, opt.rad || 14);
    const m = mesh(g, color, Object.assign({ key: key }, opt));
    if (opt.flatx) m.scale.x = opt.flatx;
    return m;
  }

  function mirrored(fn) { const r = fn(1); const l = fn(-1); return [r, l]; }

  /* ── the model ──────────────────────────────────────────────────── */
  function build() {
    buildCortex('R'); buildCortex('L');

    // insula — buried in the depth of the Sylvian fissure
    mirrored(s => blob('insula', 0xb4628f, [s * 0.285, -0.02, 0.06], [0.055, 0.15, 0.21], [0, 0, s * 0.12]));

    // cingulate ribbon on the medial wall, arching over the corpus callosum
    mirrored(s => tube('cingulate', 0x7fa37a, [
      [s * 0.085, -0.10, 0.44], [s * 0.085, 0.18, 0.50], [s * 0.085, 0.42, 0.30],
      [s * 0.085, 0.47, 0.0], [s * 0.085, 0.40, -0.34], [s * 0.085, 0.22, -0.56], [s * 0.085, 0.02, -0.62]
    ], 0.055, { flatx: 0.42, rad: 12 }));

    // corpus callosum — midsagittal profile extruded across the midline
    const sh = new T.Shape();
    const prof = [[-0.46, 0.26], [-0.30, 0.34], [0.0, 0.355], [0.34, 0.325], [0.52, 0.21],
                  [0.55, 0.11], [0.42, 0.135], [0.30, 0.195], [0.0, 0.235], [-0.28, 0.215],
                  [-0.40, 0.15], [-0.36, 0.055], [-0.45, 0.10]];
    sh.moveTo(prof[0][0], prof[0][1]);
    prof.slice(1).forEach(p => sh.lineTo(p[0], p[1]));
    sh.closePath();
    const ccG = new T.ExtrudeGeometry(sh, { depth: 0.2, bevelEnabled: true, bevelSize: 0.012, bevelThickness: 0.012, bevelSegments: 2, curveSegments: 6 });
    const cc = mesh(ccG, 0xded6e6, { key: 'cc', rough: 0.55 });
    cc.rotation.y = Math.PI / 2; cc.position.x = -0.1;

    // diencephalon
    mirrored(s => blob('thalamus', 0xc7a15a, [s * 0.115, 0.14, -0.06], [0.095, 0.10, 0.165], [0, s * -0.22, 0]));
    mirrored(s => blob('hypothalamus', 0xc98f4e, [s * 0.055, -0.08, 0.06], [0.055, 0.05, 0.075]));
    blob('pituitary', 0xd79a55, [0, -0.235, 0.10], [0.055, 0.045, 0.055]);
    tube('pituitary', 0xd79a55, [[0, -0.13, 0.07], [0, -0.19, 0.09]], 0.016, { rad: 8, seg: 8, pick: false });
    blob('pineal', 0xc98f4e, [0, 0.16, -0.26], [0.035, 0.03, 0.035], null, { pick: false });

    // medial temporal lobe
    mirrored(s => tube('hippocampus', 0xb5574e, [
      [s * 0.24, -0.30, 0.30], [s * 0.255, -0.27, 0.16], [s * 0.25, -0.21, 0.0],
      [s * 0.225, -0.13, -0.16], [s * 0.185, -0.04, -0.30], [s * 0.15, 0.04, -0.38]
    ], t => 0.055 - 0.026 * t, { rad: 14 }));
    mirrored(s => blob('amygdala', 0x8e4a6b, [s * 0.245, -0.265, 0.41], [0.062, 0.055, 0.062]));

    // basal ganglia
    mirrored(s => tube('caudate', 0x6d8bc0, [
      [s * 0.135, 0.0, 0.36], [s * 0.15, 0.14, 0.30], [s * 0.17, 0.27, 0.10],
      [s * 0.19, 0.24, -0.14], [s * 0.215, 0.10, -0.28], [s * 0.24, -0.06, -0.30]
    ], t => 0.082 - 0.058 * Math.pow(t, 0.7), { rad: 14 }));
    mirrored(s => blob('putamen', 0x5f9e8a, [s * 0.285, 0.03, 0.09], [0.052, 0.125, 0.20], [0, s * -0.2, s * 0.1]));
    mirrored(s => blob('pallidum', 0xa9adc4, [s * 0.205, 0.01, 0.05], [0.04, 0.10, 0.145], [0, s * -0.18, s * 0.08]));
    mirrored(s => blob('pallidum', 0x8f93ab, [s * 0.11, -0.055, -0.10], [0.038, 0.026, 0.05], null, { pick: false }));  // STN
    mirrored(s => blob('accumbens', 0xc9746b, [s * 0.135, -0.075, 0.27], [0.055, 0.05, 0.06]));
    mirrored(s => blob('basalforebrain', 0xa08fc0, [s * 0.135, -0.155, 0.19], [0.05, 0.035, 0.055]));

    // limbic white matter
    mirrored(s => tube('fornix', 0xcfc6de, [
      [s * 0.15, 0.05, -0.36], [s * 0.12, 0.26, -0.28], [s * 0.075, 0.33, -0.04],
      [s * 0.06, 0.18, 0.14], [s * 0.055, -0.06, 0.06], [s * 0.05, -0.135, -0.01]
    ], 0.019, { rad: 10 }));
    mirrored(s => blob('fornix', 0xd8cfe4, [s * 0.05, -0.15, -0.015], [0.032, 0.028, 0.032], null, { pick: false }));  // mammillary body

    // long association tracts
    mirrored(s => tube('arcuate', 0xe0c07a, [
      [s * 0.31, -0.16, -0.30], [s * 0.345, 0.06, -0.34], [s * 0.355, 0.25, -0.20],
      [s * 0.35, 0.28, 0.10], [s * 0.325, 0.13, 0.38], [s * 0.30, 0.0, 0.44]
    ], 0.026, { rad: 12 }));
    mirrored(s => tube('uncinate', 0xd08c6a, [
      [s * 0.26, -0.27, 0.44], [s * 0.28, -0.20, 0.56], [s * 0.25, -0.24, 0.66], [s * 0.19, -0.30, 0.70]
    ], 0.022, { rad: 12 }));
    mirrored(s => tube('internal_capsule', 0xc9c2d6, [
      [s * 0.20, 0.26, 0.16], [s * 0.205, 0.12, 0.02], [s * 0.175, -0.06, -0.06], [s * 0.14, -0.22, -0.06]
    ], t => 0.048 - 0.014 * t, { rad: 12, flatx: 0.55 }));

    // ventricular system
    mirrored(s => tube('ventricles', 0x4fb3c9, [
      [s * 0.085, 0.10, 0.36], [s * 0.095, 0.26, 0.24], [s * 0.115, 0.34, 0.02],
      [s * 0.13, 0.26, -0.26], [s * 0.155, 0.06, -0.40], [s * 0.20, -0.12, -0.30], [s * 0.235, -0.20, -0.12]
    ], t => 0.05 - 0.02 * Math.abs(t - 0.5), { rad: 12, opacity: 0.4, rough: 0.25 }));

    // brainstem
    tube('midbrain', 0xa79aa6, [[0, 0.02, -0.02], [0, -0.10, 0.0], [0, -0.20, 0.015]], t => 0.115 - 0.005 * t, { rad: 20, seg: 24 });
    tube('pons', 0xb1a4ae, [[0, -0.20, 0.015], [0, -0.31, 0.03], [0, -0.42, 0.015]], t => 0.125 + 0.035 * Math.sin(Math.PI * t), { rad: 20, seg: 24 });
    blob('pons', 0xb1a4ae, [0, -0.31, 0.075], [0.115, 0.115, 0.075], null, { pick: false });
    tube('medulla', 0x9d919c, [[0, -0.42, 0.015], [0, -0.54, -0.01], [0, -0.66, -0.04]], t => 0.09 - 0.03 * t, { rad: 18, seg: 20 });
    mirrored(s => blob('midbrain', 0x8d8290, [s * 0.055, 0.045, -0.075], [0.045, 0.04, 0.045], null, { pick: false }));  // colliculi
    mirrored(s => blob('sn', 0x2f8fa3, [s * 0.06, -0.11, 0.03], [0.045, 0.022, 0.055], [0, 0, s * 0.2]));
    tube('raphe', 0xb4628f, [[0, -0.05, -0.005], [0, -0.28, 0.01], [0, -0.5, -0.01]], 0.014, { rad: 8, seg: 20 });
    mirrored(s => blob('lc', 0x4fb3c9, [s * 0.05, -0.335, -0.045], [0.025, 0.03, 0.025]));

    // cerebellum with folia
    mirrored(s => {
      const g = new T.SphereGeometry(1, 48, 34);
      const p = g.attributes.position;
      for (let i = 0; i < p.count; i++) {
        const x = p.getX(i), y = p.getY(i), z = p.getZ(i);
        const f = 1 + 0.028 * Math.sin(y * 13 + z * 1.5) + 0.012 * Math.sin(y * 26);
        p.setXYZ(i, x * f, y * f, z * f);
      }
      g.computeVertexNormals();
      const m = mesh(g, 0x8d7fa0, { key: 'cerebellum', rough: 0.95 });
      m.position.set(s * 0.185, -0.40, -0.58);
      m.scale.set(0.195, 0.135, 0.205);
      return m;
    });
    const vg = new T.SphereGeometry(1, 30, 22);
    const vp = vg.attributes.position;
    for (let i = 0; i < vp.count; i++) {
      const x = vp.getX(i), y = vp.getY(i), z = vp.getZ(i);
      const f = 1 + 0.03 * Math.sin(y * 16);
      vp.setXYZ(i, x * f, y * f, z * f);
    }
    vg.computeVertexNormals();
    const verm = mesh(vg, 0x7d7091, { key: 'cerebellum', rough: 0.95, pick: false });
    verm.position.set(0, -0.38, -0.56); verm.scale.set(0.055, 0.125, 0.17);

    // optic chiasm & olfactory tracts — orientation landmarks
    mirrored(s => tube('chiasm', 0xd6cee0, [[s * 0.005, -0.19, 0.16], [s * 0.09, -0.20, 0.34]], 0.018, { rad: 8, seg: 8, pick: false }));
    mirrored(s => tube('olf', 0xd6cee0, [[s * 0.075, -0.28, 0.40], [s * 0.075, -0.30, 0.66]], 0.015, { rad: 8, seg: 8, pick: false }));
  }

  /* ── appearance state ───────────────────────────────────────────── */
  function paint() {
    mats.forEach(mt => {
      const b = mt.userData.base;
      mt.color.setHex(b.color);
      mt.emissive.setHex(0x000000);
      mt.opacity = b.opacity;
    });
    // a selection (or an overlay) opens the cortex so deep structures read through
    const reveal = !!selected || !!activeOverlay;
    if (reveal) {
      mats.forEach(mt => { mt.opacity = mt.userData.base.opacity * 0.55; });
      cortexMeshes.forEach(m => { m.material.opacity = Math.min(peelValue, 0.26); });
    }
    const hi = (key, strong) => {
      (groups[key] || []).forEach(m => {
        m.material.emissive.setHex(strong ? 0x42243c : 0x241522);
        m.material.color.offsetHSL(0, strong ? 0.18 : 0.1, strong ? 0.1 : 0.05);
        m.material.opacity = Math.max(m.material.userData.base.opacity, strong ? 0.99 : 0.85);
      });
    };
    if (activeOverlay) activeOverlay.keys.forEach(k => hi(k, false));
    if (hovered && hovered !== selected) hi(hovered, false);
    if (selected) hi(selected, true);
    mats.forEach(mt => { mt.transparent = mt.opacity < 0.995; mt.depthWrite = !mt.transparent; });
    needsRender = true;
  }

  let peelValue = 1;
  let activeOverlay = null;

  /* ── overlay arcs ───────────────────────────────────────────────── */
  function centroidOf(key) {
    if (failed) return null;
    const ms = groups[key];
    if (!ms || !ms.length) return null;
    const box = new T.Box3();
    ms.forEach(m => { m.updateMatrixWorld(); box.expandByObject(m); });
    return box.getCenter(new T.Vector3());
  }

  function setOverlay(def) {
    if (failed) return;
    if (overlayGroup) { scene.remove(overlayGroup); overlayGroup.traverse(o => { if (o.geometry) o.geometry.dispose(); }); overlayGroup = null; }
    activeOverlay = null;
    if (!def) { paint(); return; }
    overlayGroup = new T.Group();
    const keys = [], nodePts = {};
    def.nodes.forEach(id => {
      const e = window.ATLAS.get(id);
      const key = e && e.mesh;
      if (!key) return;
      keys.push(key);
      const c = centroidOf(key);
      if (c) nodePts[id] = c;
    });
    (def.arcs || []).forEach(([a, b]) => {
      const p = nodePts[a], q = nodePts[b];
      if (!p || !q) return;
      const mid = p.clone().add(q).multiplyScalar(0.5);
      mid.multiplyScalar(1.22).add(new T.Vector3(0, 0.06, 0));
      const g = tubeGeo([[p.x, p.y, p.z], [mid.x, mid.y, mid.z], [q.x, q.y, q.z]], 0.013, 40, 8);
      const m = new T.Mesh(g, new T.MeshStandardMaterial({ color: 0xc86bbd, emissive: 0x3a1636, roughness: 0.35, transparent: true, opacity: 0.92 }));
      overlayGroup.add(m);
    });
    Object.values(nodePts).forEach(p => {
      const s = new T.Mesh(new T.SphereGeometry(0.032, 16, 12),
        new T.MeshStandardMaterial({ color: 0xf0d4ec, emissive: 0x4a2044, roughness: 0.3 }));
      s.position.copy(p);
      overlayGroup.add(s);
    });
    scene.add(overlayGroup);
    activeOverlay = { keys: keys, nodes: nodePts };
    paint();
  }

  /* ── marker for cortical subregions ─────────────────────────────── */
  function setMarker(dir) {
    if (failed) return null;
    if (markerMesh) { scene.remove(markerMesh); markerMesh = null; }
    if (!dir) { needsRender = true; return null; }
    const o = new T.Vector3(0, 0.04, 0);
    const d = new T.Vector3(dir[0], dir[1], dir[2]).normalize();
    ray.set(o, d);
    ray.far = 3;
    const hits = ray.intersectObjects(cortexMeshes.concat(groups.insula || [], groups.cingulate || []), false);
    const pt = hits.length ? hits[hits.length - 1].point.clone() : d.multiplyScalar(0.8);
    markerMesh = new T.Group();
    const ring = new T.Mesh(new T.SphereGeometry(0.034, 18, 14),
      new T.MeshStandardMaterial({ color: 0xf3dcef, emissive: 0x632a5b, roughness: 0.25 }));
    ring.position.copy(pt.clone().multiplyScalar(1.02));
    markerMesh.add(ring);
    scene.add(markerMesh);
    needsRender = true;
    return pt;
  }

  /* ── camera ─────────────────────────────────────────────────────── */
  const VIEWS = {
    'lat-r': [0, 0.12, 3.15], 'lat-l': [Math.PI, 0.12, 3.15], 'med': [Math.PI, 0.02, 2.55],
    'sup': [Math.PI / 2, 1.42, 3.0], 'inf': [Math.PI / 2, -1.42, 3.0], 'ant': [Math.PI / 2, 0.08, 3.0],
    'default': [0.62, 0.16, 3.05]
  };
  function setHemi(mode) {
    const hideLeft = mode === 'right';
    scene.traverse(o => {
      if (!o.isMesh) return;
      const cx = o.scale.x < 0 ? -1 : o.position.x;
      if (cx < -0.01) o.visible = !hideLeft;
    });
    needsRender = true;
  }

  function view(name) {
    if (failed) return;
    setHemi(name === 'med' ? 'right' : 'both');
    const v = VIEWS[name] || VIEWS.default;
    want.az = v[0]; want.el = v[1]; want.dist = v[2];
    needsRender = true;
  }

  function updateCam() {
    rot.az += (want.az - rot.az) * 0.16;
    rot.el += (want.el - rot.el) * 0.16;
    dist += (want.dist - dist) * 0.16;
    const ce = Math.cos(rot.el);
    cam.position.set(target.x + dist * ce * Math.cos(rot.az), target.y + dist * Math.sin(rot.el), target.z + dist * ce * Math.sin(rot.az));
    cam.lookAt(target);
  }

  /* ── interaction ────────────────────────────────────────────────── */
  function bind() {
    let drag = false, lx = 0, ly = 0, moved = 0, pinch = 0;
    const pt = e => (e.touches ? e.touches[0] : e);
    canvas.addEventListener('pointerdown', e => { drag = true; moved = 0; lx = e.clientX; ly = e.clientY; canvas.setPointerCapture(e.pointerId); });
    canvas.addEventListener('pointerup', e => {
      drag = false;
      try { canvas.releasePointerCapture(e.pointerId); } catch (_) {}
      if (moved < 6) click(e);
    });
    canvas.addEventListener('pointermove', e => {
      if (drag) {
        const dx = e.clientX - lx, dy = e.clientY - ly;
        moved += Math.abs(dx) + Math.abs(dy);
        want.az -= dx * 0.008; rot.az -= dx * 0.004;
        want.el = Math.max(-1.5, Math.min(1.5, want.el + dy * 0.006));
        lx = e.clientX; ly = e.clientY; needsRender = true;
      } else hoverAt(e);
    });
    canvas.addEventListener('pointerleave', () => { if (hovered) { hovered = null; paint(); onHover && onHover(null); } });
    canvas.addEventListener('wheel', e => {
      e.preventDefault();
      want.dist = Math.max(1.5, Math.min(5.5, want.dist + Math.sign(e.deltaY) * 0.22));
      needsRender = true;
    }, { passive: false });
    canvas.addEventListener('touchmove', e => {
      if (e.touches.length === 2) {
        const d = Math.hypot(e.touches[0].clientX - e.touches[1].clientX, e.touches[0].clientY - e.touches[1].clientY);
        if (pinch) { want.dist = Math.max(1.5, Math.min(5.5, want.dist - (d - pinch) * 0.01)); needsRender = true; }
        pinch = d;
      }
    }, { passive: true });
    canvas.addEventListener('touchend', () => { pinch = 0; });
  }

  function ndc(e) {
    const r = canvas.getBoundingClientRect();
    return new T.Vector2(((e.clientX - r.left) / r.width) * 2 - 1, -((e.clientY - r.top) / r.height) * 2 + 1);
  }
  function hit(e) {
    ray.setFromCamera(ndc(e), cam);
    ray.far = 100;
    const list = pickables.filter(m => m.material.opacity > 0.12);
    const hits = ray.intersectObjects(list, false);
    return hits.length ? hits[0] : null;
  }
  function hoverAt(e) {
    const h = hit(e);
    const key = h ? h.object.userData.key : null;
    if (key !== hovered) {
      hovered = key;
      paint();
      onHover && onHover(key, h ? h.point : null);
    }
  }
  function click(e) {
    const h = hit(e);
    onPick && onPick(h ? h.object.userData.key : null, h ? h.point : null);
  }

  /* ── public ─────────────────────────────────────────────────────── */
  function init(opt) {
    canvas = opt.canvas; labelHost = opt.labels; onPick = opt.onPick; onHover = opt.onHover;
    scene = new T.Scene();
    cam = new T.PerspectiveCamera(36, 1, 0.1, 60);
    try {
      renderer = new T.WebGLRenderer({ canvas: canvas, antialias: true, alpha: true });
    } catch (err) {
      failed = true;
      opt.onFail && opt.onFail(err);
      return api;
    }
    renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    renderer.outputEncoding = T.sRGBEncoding;
    renderer.localClippingEnabled = true;
    ray = new T.Raycaster();

    scene.add(new T.HemisphereLight(0xf2ecf4, 0x241d2a, 0.62));
    const d1 = new T.DirectionalLight(0xfff6f0, 0.78); d1.position.set(2.2, 2.4, 2.0); scene.add(d1);
    const d2 = new T.DirectionalLight(0xbcd8e4, 0.38); d2.position.set(-2.4, -0.6, -1.6); scene.add(d2);
    const d3 = new T.DirectionalLight(0xffe9d8, 0.32); d3.position.set(0.4, -2.2, 1.2); scene.add(d3);
    scene.add(new T.AmbientLight(0xffffff, 0.12));

    build();
    bind();
    resize();
    view('default');
    (function loop() {
      requestAnimationFrame(loop);
      const moving = Math.abs(want.az - rot.az) + Math.abs(want.el - rot.el) + Math.abs(want.dist - dist) > 0.0004;
      if (moving || needsRender) { updateCam(); renderer.render(scene, cam); needsRender = moving; opt.onFrame && opt.onFrame(); }
    })();
    return api;
  }

  function resize() {
    if (failed) return;
    const w = canvas.clientWidth || 800, h = canvas.clientHeight || 600;
    renderer.setSize(w, h, false);
    cam.aspect = w / h; cam.updateProjectionMatrix();
    needsRender = true;
  }

  const api = {
    init: init, resize: resize, view: view, setOverlay: setOverlay, setMarker: setMarker, hemi: setHemi,
    failed() { return failed; },
    select(key) { if (failed) return; selected = key || null; paint(); },
    hoverKey() { return hovered; },
    peel(v) {
      if (failed) return;
      peelValue = v;
      cortexMeshes.forEach(m => { m.material.userData.base.opacity = v; });
      (groups.cerebellum || []).forEach(m => { m.material.userData.base.opacity = Math.max(v, 0.35); });
      paint();
    },
    clip(axis, t) {
      if (failed) return;
      if (!axis || axis === 'none') { renderer.clippingPlanes = []; needsRender = true; return; }
      const n = axis === 'x' ? new T.Vector3(-1, 0, 0) : axis === 'y' ? new T.Vector3(0, -1, 0) : new T.Vector3(0, 0, -1);
      const span = axis === 'z' ? 1.15 : axis === 'y' ? 0.8 : 0.5;
      clipPlane = new T.Plane(n, t * span);
      renderer.clippingPlanes = [clipPlane];
      needsRender = true;
    },
    project(v3) {
      if (failed) return { x: -9999, y: -9999, z: 2 };
      const p = v3.clone().project(cam);
      const r = canvas.getBoundingClientRect();
      return { x: (p.x * 0.5 + 0.5) * r.width, y: (-p.y * 0.5 + 0.5) * r.height, z: p.z };
    },
    centroid: centroidOf,
    has(key) { return !failed && !!groups[key]; },
    viewName() {
      if (failed) return 'model unavailable';
      const a = ((rot.az % (Math.PI * 2)) + Math.PI * 2) % (Math.PI * 2);
      if (rot.el > 0.9) return 'superior';
      if (rot.el < -0.9) return 'inferior';
      if (a < 0.9 || a > 5.4) return 'right lateral';
      if (a > 2.3 && a < 4.0) return 'left lateral';
      if (a >= 0.9 && a <= 2.3) return 'anterior oblique';
      return 'posterior oblique';
    }
  };
  return api;
})();
