/* Procedural 3D brain. Coordinates: +x right, +y superior, +z anterior.
   1 model unit ≈ 85 mm, so the cerebrum is ~2.0 long × 1.6 wide × 1.25 high —
   the real 170 × 140 × 110 mm proportions. Cortical folding is inverse-ridged
   fractal noise: narrow meandering sulci between broad gyral crowns, with
   per-vertex shading baked from fold depth so sulci read dark. */
window.BRAIN = (function () {
  const T = window.THREE;
  let scene, cam, renderer, ray, canvas;
  let groups = {}, pickables = [], cortexMeshes = [], tissueMeshes = [];
  let overlayGroup = null, markerGroup = null;
  let selected = null, hovered = null, isolateOn = false, colorMode = 'tissue';
  let cb = {};
  let rot = { az: 0.72, el: 0.17 }, dist = 3.0, target = new T.Vector3(0, -0.04, 0);
  let want = { az: 0.72, el: 0.17, dist: 3.0, target: new T.Vector3(0, -0.04, 0) };
  let spinning = true, lastInput = 0, failed = false, needsRender = true, ready = false, fit = 1, lastClip = null;
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ── noise ──────────────────────────────────────────────────────── */
  function hash(i, j, k) {
    let n = (i * 374761393 + j * 668265263 + k * 1274126177) | 0;
    n = (n ^ (n >> 13)) * 1274126177 | 0;
    return ((n ^ (n >> 16)) & 0x7fffffff) / 0x7fffffff;
  }
  const sm = t => t * t * (3 - 2 * t);
  function noise(x, y, z) {
    const i = Math.floor(x), j = Math.floor(y), k = Math.floor(z);
    const fx = sm(x - i), fy = sm(y - j), fz = sm(z - k);
    let v = 0;
    for (let a = 0; a < 2; a++) for (let b = 0; b < 2; b++) for (let c = 0; c < 2; c++)
      v += (a ? fx : 1 - fx) * (b ? fy : 1 - fy) * (c ? fz : 1 - fz) * hash(i + a, j + b, k + c);
    return v * 2 - 1;
  }
  const fbm2 = (x, y, z) => noise(x, y, z) * 0.68 + noise(x * 2.03 + 5, y * 2.03, z * 2.03) * 0.32;

  /* ── cortical surface ───────────────────────────────────────────── */
  const sylvian = z => -0.10 - 0.20 * (z - 0.5);
  const centralS = y => 0.22 - 0.45 * y;
  function lobeOf(x, y, z) {
    if (z < -0.70) return 'occipital';
    if (y < sylvian(z) + 0.02 && z > -0.56) return 'temporal';
    if (z > centralS(y)) return 'frontal';
    return 'parietal';
  }

  /* Sulcal atlas — each sulcus is a polyline in the (z, y) lateral projection
     with a depth, a width and the surface it belongs to. Drawing the named
     sulci where they actually run, and letting the tissue between them stand
     proud, is what makes the surface read as a brain rather than as noise. */
  const SULCI = [
    // lateral convexity
    { n: 'lateral (Sylvian)', f: 'lat', d: 0.072, w: 0.046, p: [[0.54, -0.17], [0.32, -0.13], [0.06, -0.06], [-0.20, 0.03], [-0.40, 0.11]] },
    { n: 'central',           f: 'lat', d: 0.058, w: 0.036, p: [[-0.10, 0.58], [0.00, 0.40], [0.09, 0.21], [0.17, 0.03]] },
    { n: 'precentral',        f: 'lat', d: 0.044, w: 0.032, p: [[0.06, 0.56], [0.17, 0.37], [0.26, 0.19], [0.32, 0.05]] },
    { n: 'postcentral',       f: 'lat', d: 0.054, w: 0.028, p: [[-0.26, 0.55], [-0.17, 0.37], [-0.09, 0.19], [-0.03, 0.05]] },
    { n: 'superior frontal',  f: 'lat', d: 0.038, w: 0.031, p: [[0.20, 0.43], [0.42, 0.41], [0.62, 0.35], [0.76, 0.25]] },
    { n: 'inferior frontal',  f: 'lat', d: 0.036, w: 0.030, p: [[0.22, 0.18], [0.44, 0.16], [0.63, 0.12], [0.75, 0.05]] },
    { n: 'superior temporal', f: 'lat', d: 0.050, w: 0.036, p: [[0.46, -0.31], [0.24, -0.27], [0.00, -0.21], [-0.25, -0.12], [-0.42, -0.04]] },
    { n: 'inferior temporal', f: 'lat', d: 0.036, w: 0.031, p: [[0.42, -0.43], [0.20, -0.41], [-0.04, -0.35], [-0.27, -0.27]] },
    { n: 'intraparietal',     f: 'lat', d: 0.044, w: 0.033, p: [[-0.14, 0.37], [-0.34, 0.33], [-0.52, 0.25], [-0.64, 0.15]] },
    { n: 'lateral occipital', f: 'lat', d: 0.034, w: 0.030, p: [[-0.60, 0.07], [-0.70, -0.02], [-0.75, -0.11]] },
    // medial wall
    { n: 'cingulate',         f: 'med', d: 0.046, w: 0.036, p: [[0.44, 0.06], [0.32, 0.30], [0.06, 0.43], [-0.26, 0.41], [-0.46, 0.29]] },
    { n: 'parieto-occipital', f: 'med', d: 0.054, w: 0.034, p: [[-0.50, 0.42], [-0.60, 0.22], [-0.65, 0.05]] },
    { n: 'calcarine',         f: 'med', d: 0.048, w: 0.034, p: [[-0.76, 0.03], [-0.64, -0.01], [-0.50, -0.02]] },
    // basal surface
    { n: 'collateral',        f: 'inf', d: 0.040, w: 0.032, p: [[0.36, -0.43], [0.10, -0.45], [-0.16, -0.41]] },
    { n: 'olfactory',         f: 'inf', d: 0.034, w: 0.030, p: [[0.74, -0.35], [0.56, -0.37]] }
  ];

  function segDist(pz, py, a, b) {
    const vz = b[0] - a[0], vy = b[1] - a[1];
    const wz = pz - a[0], wy = py - a[1];
    const L = vz * vz + vy * vy;
    let t = L > 0 ? (wz * vz + wy * vy) / L : 0;
    t = t < 0 ? 0 : t > 1 ? 1 : t;
    const dz = wz - vz * t, dy = wy - vy * t;
    return Math.sqrt(dz * dz + dy * dy);
  }
  const sstep = (a, b, x) => { const t = Math.max(0, Math.min(1, (x - a) / (b - a))); return t * t * (3 - 2 * t); };

  function sulcalDepth(ex, ey, ez) {
    let depth = 0;
    for (let i = 0; i < SULCI.length; i++) {
      const S = SULCI[i];
      const gate = S.f === 'lat' ? sstep(0.20, 0.40, ex)
                 : S.f === 'med' ? 1 - sstep(0.05, 0.20, ex)
                 : 1 - sstep(-0.42, -0.25, ey);
      if (gate < 0.02) continue;
      let dmin = 9;
      for (let k = 0; k < S.p.length - 1; k++) {
        const d = segDist(ez, ey, S.p[k], S.p[k + 1]);
        if (d < dmin) dmin = d;
      }
      // wander the sulcus off its guide line, and vary its depth along its length
      dmin = Math.max(0, dmin + fbm2(ez * 6.5 + i * 4.7, ey * 6.5 + i * 2.3, ex * 5.0) * 0.016);
      const along = 0.82 + 0.30 * Math.max(0, Math.min(1, (fbm2(ez * 3.4 + i, ey * 3.4, 0.5) + 1) / 2));
      const r = dmin / S.w;
      if (r < 3) depth += S.d * along * Math.exp(-r * r) * gate;
    }
    return Math.min(depth * 0.9, 0.088);
  }

  function cortexPoint(px, py, pz) {
    const x = px, y = py, z = pz;
    // width: widest at the temporo-parietal region, tapering to both poles
    const wf = 1 - 0.30 * Math.pow(Math.max(0, z), 1.7) - 0.46 * Math.pow(Math.max(0, -z - 0.42), 1.5);
    const hf = 1 - 0.20 * Math.pow(Math.max(0, z - 0.28), 1.4) - 0.30 * Math.pow(Math.max(0, -z - 0.40), 1.4);
    let ex = (x >= 0 ? x * 0.715 : x * 0.05) * wf;
    let ey = y * 0.735 * hf;
    let ez = z * 1.0;

    if (ey > 0.40) ey = 0.40 + (ey - 0.40) * 0.88;          // flatter vault

    // Sylvian fissure: the temporal lobe is drawn back under the frontal lobe,
    // which is what creates the overhanging operculum and a real cleft
    const dy = ey - sylvian(ez);
    if (dy < 0.04) {
      const w2 = Math.min(1, Math.max(0, (0.04 - dy) / 0.12));
      const k = 1 - 0.30 * sstep(0, 1, w2);
      ez *= k;
      ex *= 1 + 0.05 * sstep(0, 1, w2);
      if (dy < 0) ey -= 0.012 * sstep(0, 1, w2);
    }
    if (ey < -0.38) ey = -0.38 + (ey + 0.38) * 0.38;        // flat temporal base
    if (ez > 0.40 && ey < -0.20) ey += (0.20 + ey) * -0.45 * Math.min(1, (ez - 0.40) * 3);  // orbital surface
    if (ez < -0.34) {                                        // tentorial notch
      const floor = Math.min(-0.10, -0.38 + 0.48 * (-ez - 0.34));
      if (ey < floor) ey = floor;
    }
    if (ez < -0.78) ey *= 1 - 0.22 * (-ez - 0.78) / 0.2;     // occipital pole pinch

    const sd = sulcalDepth(ex, ey, ez);
    // gentle gyral undulation between the sulci, plus a little skin texture
    const gy = fbm2(px * 4.6 + 11, py * 5.8 + 3, pz * 3.0 + 7) * 0.024
             + fbm2(px * 9.5 + 2, py * 11.0, pz * 6.0) * 0.013
             + fbm2(px * 19.0 + 5, py * 21.0, pz * 13.0) * 0.005;
    const len = Math.hypot(ex, ey, ez) || 1;
    const s = 1 + (gy - sd) / len;
    // shading weight: 0 in the depth of a sulcus, 1 on a gyral crown
    let t = 1 - Math.pow(Math.min(1, sd / 0.062), 1.15);
    t *= 0.88 + 0.12 * Math.max(0, Math.min(1, (gy + 0.025) / 0.05));
    return [0.052 + ex * s, ey * s, ez * s, Math.max(0, Math.min(1, t))];
  }

  const LAYERS = {
    cortex: ['frontal', 'parietal', 'temporal', 'occipital'],
    paralimbic: ['insula', 'cingulate'],
    deep: ['thalamus', 'hypothalamus', 'caudate', 'putamen', 'pallidum', 'accumbens', 'amygdala', 'hippocampus', 'basalforebrain'],
    white: ['cc', 'fornix', 'arcuate', 'uncinate', 'internal_capsule'],
    ventricles: ['ventricles'],
    stem: ['midbrain', 'pons', 'medulla', 'sn', 'raphe', 'lc', 'chiasm', 'olf'],
    cerebellum: ['cerebellum'],
    endocrine: ['pituitary', 'pineal']
  };
  const layerOf = {};
  Object.keys(LAYERS).forEach(L => LAYERS[L].forEach(k => { layerOf[k] = L; }));
  const hiddenLayers = new Set();

  const LOBE_COL = { frontal: 0xa07cc4, parietal: 0x3f93a4, temporal: 0xc08347, occipital: 0x5c6cae };
  const TISSUE_HI = new T.Color(0xf3b2a6), TISSUE_MID = new T.Color(0xa85455), TISSUE_LO = new T.Color(0x1a1214);
  const mats = [];

  function gridSize() {
    const q = parseInt(new URLSearchParams(location.search).get('res') || '', 10);
    if (q && q >= 40 && q <= 320) return [q, Math.round(q * 0.7)];
    const small = Math.min(innerWidth, innerHeight) <= 700 || navigator.hardwareConcurrency <= 4;
    return small ? [156, 108] : [240, 166];
  }

  function buildCortexGeometries(onStep, done) {
    const gs = gridSize(), W = gs[0], H = gs[1];
    const verts = [], folds = [], key2i = new Map(), gp = [];
    const kk = (x, y, z) => (Math.round(x * 3000) + '|' + Math.round(y * 3000) + '|' + Math.round(z * 3000));
    let j = 0;
    function rows() {
      const t0 = performance.now();
      for (; j <= H && (performance.now() - t0 < 14 || j === 0); j++) {
        const row = [];
        for (let i = 0; i < W; i++) {
          const u = i / W * Math.PI * 2, v = j / H * Math.PI;
          const p = cortexPoint(Math.sin(v) * Math.cos(u), Math.sin(v) * Math.sin(u), Math.cos(v));
          const key = kk(p[0], p[1], p[2]);
          let id = key2i.get(key);
          if (id === undefined) { id = verts.length / 3; verts.push(p[0], p[1], p[2]); folds.push(p[3]); key2i.set(key, id); }
          row.push(id);
        }
        gp.push(row);
      }
      onStep(j / H * 0.8);
      if (j <= H) { requestAnimationFrame(rows); return; }
      finish();
    }
    function finish() {
      const at = id => [verts[id * 3], verts[id * 3 + 1], verts[id * 3 + 2]];
      const lob = {};
      ['frontal', 'parietal', 'temporal', 'occipital'].forEach(n => { lob[n] = { m: new Map(), pos: [], fold: [], idx: [] }; });
      const local = (L, id) => {
        let v = L.m.get(id);
        if (v === undefined) { const p = at(id); v = L.pos.length / 3; L.pos.push(p[0], p[1], p[2]); L.fold.push(folds[id]); L.m.set(id, v); }
        return v;
      };
      for (let r = 0; r < H; r++) {
        for (let i = 0; i < W; i++) {
          const i2 = (i + 1) % W;
          const A = gp[r][i], Bv = gp[r][i2], C = gp[r + 1][i2], D = gp[r + 1][i];
          const pa = at(A), pb = at(Bv), pc = at(C), pd = at(D);
          const cx = (pa[0] + pb[0] + pc[0] + pd[0]) / 4, cy = (pa[1] + pb[1] + pc[1] + pd[1]) / 4, cz = (pa[2] + pb[2] + pc[2] + pd[2]) / 4;
          const L = lob[lobeOf(cx, cy, cz)];
          const a = local(L, A), b = local(L, Bv), c = local(L, C), d = local(L, D);
          if (A !== Bv && Bv !== C) L.idx.push(a, b, c);
          if (A !== C && C !== D) L.idx.push(a, c, d);
        }
      }
      const out = {};
      Object.keys(lob).forEach(n => {
        const L = lob[n];
        const g = new T.BufferGeometry();
        g.setAttribute('position', new T.Float32BufferAttribute(L.pos, 3));
        g.setIndex(L.idx);
        g.computeVertexNormals();
        // bake two palettes: raw tissue, and lobe-tinted — both darkened in sulci
        const tissue = [], tint = [], lc = new T.Color(LOBE_COL[n]), c1 = new T.Color(), c2 = new T.Color();
        for (let v = 0; v < L.fold.length; v++) {
          const t = L.fold[v], e = 0.28 + 0.72 * Math.pow(t, 1.1);
          // two-stage ramp: sulcal line → rose flank → salmon crown
          const a = Math.min(1, t / 0.42), b = Math.max(0, (t - 0.40) / 0.60);
          c1.copy(TISSUE_LO).lerp(TISSUE_MID, a * a * (3 - 2 * a)).lerp(TISSUE_HI, b * b * (3 - 2 * b));
          c1.convertSRGBToLinear();
          tissue.push(c1.r, c1.g, c1.b);
          c2.copy(lc).multiplyScalar(Math.min(1, e * 1.12)).convertSRGBToLinear();
          tint.push(Math.min(1, c2.r), Math.min(1, c2.g), Math.min(1, c2.b));
        }
        g.setAttribute('color', new T.Float32BufferAttribute(tissue, 3));
        g.userData.tissue = new T.Float32BufferAttribute(tissue, 3);
        g.userData.tint = new T.Float32BufferAttribute(tint, 3);
        out[n] = g;
      });
      onStep(1);
      done(out);
    }
    requestAnimationFrame(rows);
  }

  /* ── materials & primitives ─────────────────────────────────────── */
  function mesh(geo, color, opt) {
    opt = opt || {};
    const Mat = opt.tissue ? T.MeshPhysicalMaterial : T.MeshStandardMaterial;
    const mat = new Mat({
      color: new T.Color(color).convertSRGBToLinear(), roughness: opt.rough != null ? opt.rough : 0.55, metalness: 0.0,
      transparent: false, opacity: 1, side: T.DoubleSide,
      vertexColors: !!opt.tissue, emissive: new T.Color(0x000000)
    });
    if (opt.tissue) { mat.clearcoat = 0.24; mat.clearcoatRoughness = 0.55; }
    mat.userData.base = { color: color, opacity: opt.opacity != null ? opt.opacity : 1 };
    mat.opacity = mat.userData.base.opacity;
    mats.push(mat);
    const m = new T.Mesh(geo, mat);
    m.userData.key = opt.key;
    scene.add(m);
    m.userData.layer = layerOf[opt.key] || 'other';
    if (opt.key) {
      (groups[opt.key] = groups[opt.key] || []).push(m);
      if (opt.pick !== false) pickables.push(m);
    }
    return m;
  }

  function blob(key, color, pos, scale, rotv, opt) {
    const m = mesh(new T.SphereGeometry(1, 36, 26), color, Object.assign({ key: key }, opt || {}));
    m.position.set(pos[0], pos[1], pos[2]);
    m.scale.set(scale[0], scale[1], scale[2]);
    if (rotv) m.rotation.set(rotv[0], rotv[1], rotv[2]);
    return m;
  }

  function tubeGeo(pts, radii, seg, rad) {
    const curve = new T.CatmullRomCurve3(pts.map(p => new T.Vector3(p[0], p[1], p[2])));
    const pos = [], idx = [];
    const up = new T.Vector3(0, 1, 0), tan = new T.Vector3(), n1 = new T.Vector3(), n2 = new T.Vector3();
    for (let i = 0; i <= seg; i++) {
      const t = i / seg, c = curve.getPoint(t);
      curve.getTangent(t, tan).normalize();
      n1.copy(Math.abs(tan.y) > 0.9 ? new T.Vector3(1, 0, 0) : up).cross(tan).normalize();
      n2.copy(tan).cross(n1).normalize();
      const r = typeof radii === 'function' ? radii(t) : radii;
      for (let k = 0; k < rad; k++) {
        const a = k / rad * Math.PI * 2, ca = Math.cos(a), sa = Math.sin(a);
        pos.push(c.x + (n1.x * ca + n2.x * sa) * r, c.y + (n1.y * ca + n2.y * sa) * r, c.z + (n1.z * ca + n2.z * sa) * r);
      }
    }
    for (let i = 0; i < seg; i++) for (let k = 0; k < rad; k++) {
      const a = i * rad + k, b = i * rad + (k + 1) % rad;
      idx.push(a, b, b + rad, a, b + rad, a + rad);
    }
    const g = new T.BufferGeometry();
    g.setAttribute('position', new T.Float32BufferAttribute(pos, 3));
    g.setIndex(idx);
    g.computeVertexNormals();
    return g;
  }
  function tube(key, color, pts, radii, opt) {
    opt = opt || {};
    const m = mesh(tubeGeo(pts, radii, opt.seg || 76, opt.rad || 16), color, Object.assign({ key: key }, opt));
    if (opt.flatx) m.scale.x = opt.flatx;
    return m;
  }
  const both = fn => { fn(1); fn(-1); };

  /* ── the model ──────────────────────────────────────────────────── */
  function buildRest() {
    both(s => blob('insula', 0xc2707f, [s * 0.44, -0.02, 0.04], [0.05, 0.17, 0.22], [0, 0, s * 0.1]));
    both(s => tube('cingulate', 0xcf8f86, [
      [s * 0.075, -0.12, 0.42], [s * 0.075, 0.16, 0.50], [s * 0.075, 0.40, 0.30],
      [s * 0.075, 0.45, 0.0], [s * 0.075, 0.38, -0.32], [s * 0.075, 0.20, -0.54], [s * 0.075, 0.02, -0.60]
    ], 0.06, { flatx: 0.45, rad: 14 }));

    const sh = new T.Shape();
    const prof = [[-0.44, 0.25], [-0.28, 0.33], [0.0, 0.345], [0.32, 0.315], [0.50, 0.20],
                  [0.53, 0.10], [0.40, 0.125], [0.28, 0.185], [0.0, 0.225], [-0.26, 0.205],
                  [-0.38, 0.14], [-0.34, 0.045], [-0.43, 0.09]];
    sh.moveTo(prof[0][0], prof[0][1]);
    prof.slice(1).forEach(p => sh.lineTo(p[0], p[1]));
    sh.closePath();
    const cc = mesh(new T.ExtrudeGeometry(sh, { depth: 0.19, bevelEnabled: true, bevelSize: 0.012, bevelThickness: 0.012, bevelSegments: 2, curveSegments: 8 }), 0xf6e7dc, { key: 'cc', rough: 0.45 });
    cc.rotation.y = Math.PI / 2; cc.position.x = -0.095;

    both(s => blob('thalamus', 0xc7a15a, [s * 0.135, 0.12, -0.06], [0.10, 0.105, 0.175], [0, s * -0.22, 0]));
    both(s => blob('hypothalamus', 0xc98f4e, [s * 0.06, -0.10, 0.06], [0.058, 0.05, 0.08]));
    blob('pituitary', 0xd79a55, [0, -0.26, 0.10], [0.058, 0.048, 0.058]);
    tube('pituitary', 0xd79a55, [[0, -0.15, 0.07], [0, -0.21, 0.09]], 0.017, { rad: 8, seg: 8, pick: false });
    blob('pineal', 0xc98f4e, [0, 0.14, -0.27], [0.036, 0.031, 0.036], null, { pick: false });

    both(s => tube('hippocampus', 0xb5574e, [
      [s * 0.30, -0.31, 0.28], [s * 0.325, -0.28, 0.14], [s * 0.315, -0.22, -0.02],
      [s * 0.285, -0.14, -0.18], [s * 0.235, -0.04, -0.31], [s * 0.19, 0.04, -0.39]
    ], t => 0.058 - 0.026 * t, { rad: 16 }));
    both(s => blob('amygdala', 0x8e4a6b, [s * 0.30, -0.27, 0.39], [0.068, 0.058, 0.066]));

    both(s => tube('caudate', 0x6d8bc0, [
      [s * 0.155, -0.02, 0.34], [s * 0.175, 0.13, 0.28], [s * 0.195, 0.25, 0.08],
      [s * 0.225, 0.22, -0.15], [s * 0.26, 0.08, -0.28], [s * 0.29, -0.07, -0.29]
    ], t => 0.085 - 0.060 * Math.pow(t, 0.7), { rad: 16 }));
    both(s => blob('putamen', 0x5f9e8a, [s * 0.355, 0.02, 0.08], [0.055, 0.135, 0.215], [0, s * -0.2, s * 0.1]));
    both(s => blob('pallidum', 0xa9adc4, [s * 0.255, 0.0, 0.05], [0.043, 0.105, 0.15], [0, s * -0.18, s * 0.08]));
    both(s => blob('pallidum', 0x8f93ab, [s * 0.13, -0.07, -0.10], [0.04, 0.027, 0.052], null, { pick: false }));
    both(s => blob('accumbens', 0xc9746b, [s * 0.165, -0.095, 0.25], [0.058, 0.052, 0.062]));
    both(s => blob('basalforebrain', 0xa08fc0, [s * 0.17, -0.175, 0.17], [0.052, 0.036, 0.058]));

    both(s => tube('fornix', 0xf0e2d8, [
      [s * 0.19, 0.05, -0.37], [s * 0.14, 0.25, -0.28], [s * 0.085, 0.31, -0.04],
      [s * 0.065, 0.16, 0.13], [s * 0.06, -0.08, 0.06], [s * 0.055, -0.155, -0.01]
    ], 0.02, { rad: 12 }));
    both(s => blob('fornix', 0xf3e7dd, [s * 0.055, -0.17, -0.015], [0.034, 0.03, 0.034], null, { pick: false }));

    both(s => tube('arcuate', 0xe0c07a, [
      [s * 0.40, -0.18, -0.28], [s * 0.445, 0.04, -0.32], [s * 0.46, 0.24, -0.18],
      [s * 0.45, 0.27, 0.10], [s * 0.42, 0.12, 0.36], [s * 0.385, -0.01, 0.42]
    ], 0.028, { rad: 14 }));
    both(s => tube('uncinate', 0xd08c6a, [
      [s * 0.33, -0.28, 0.40], [s * 0.355, -0.20, 0.52], [s * 0.32, -0.25, 0.62], [s * 0.24, -0.31, 0.66]
    ], 0.024, { rad: 12 }));
    both(s => tube('internal_capsule', 0xeaddd4, [
      [s * 0.245, 0.25, 0.14], [s * 0.25, 0.10, 0.01], [s * 0.215, -0.08, -0.06], [s * 0.175, -0.24, -0.07]
    ], t => 0.05 - 0.014 * t, { rad: 14, flatx: 0.55 }));

    both(s => tube('ventricles', 0x4fb3c9, [
      [s * 0.10, 0.08, 0.34], [s * 0.115, 0.24, 0.22], [s * 0.135, 0.32, 0.0],
      [s * 0.16, 0.24, -0.26], [s * 0.19, 0.05, -0.40], [s * 0.25, -0.14, -0.30], [s * 0.30, -0.22, -0.12]
    ], t => 0.052 - 0.02 * Math.abs(t - 0.5), { rad: 14, opacity: 0.42, rough: 0.2 }));

    tube('midbrain', 0xecd8cb, [[0, 0.03, -0.03], [0, -0.10, 0.0], [0, -0.22, 0.02]], t => 0.135 - 0.008 * t, { rad: 24, seg: 26 });
    tube('pons', 0xf0ddd1, [[0, -0.22, 0.02], [0, -0.35, 0.035], [0, -0.47, 0.015]], t => 0.145 + 0.04 * Math.sin(Math.PI * t), { rad: 24, seg: 26 });
    blob('pons', 0xf0ddd1, [0, -0.35, 0.09], [0.145, 0.135, 0.085], null, { pick: false });
    tube('medulla', 0xe6d0c4, [[0, -0.47, 0.015], [0, -0.60, -0.01], [0, -0.74, -0.045]], t => 0.105 - 0.035 * t, { rad: 20, seg: 22 });
    both(s => blob('midbrain', 0xd9bfb2, [s * 0.06, 0.055, -0.095], [0.05, 0.045, 0.05], null, { pick: false }));
    both(s => blob('sn', 0x2f8fa3, [s * 0.07, -0.115, 0.04], [0.05, 0.024, 0.06], [0, 0, s * 0.2]));
    tube('raphe', 0xb4628f, [[0, -0.05, -0.01], [0, -0.30, 0.01], [0, -0.55, -0.015]], 0.015, { rad: 10, seg: 22 });
    both(s => blob('lc', 0x4fb3c9, [s * 0.055, -0.375, -0.055], [0.027, 0.032, 0.027]));

    // cerebellum: foliated hemispheres plus vermis
    both(s => {
      const g = new T.SphereGeometry(1, 60, 42);
      const p = g.attributes.position, col = [];
      const hi = new T.Color(0xd2888a), lo = new T.Color(0xf2e0d4), c = new T.Color();
      for (let i = 0; i < p.count; i++) {
        const x = p.getX(i), y = p.getY(i), z = p.getZ(i);
        const rid = 2 * Math.pow(Math.abs(Math.sin(y * 17 + z * 1.6 + noise(x * 3, y * 3, z * 3) * 0.35)), 0.5) - 1;
        const f = 1 + rid * 0.038;
        p.setXYZ(i, x * f, y * f, z * f);
        c.copy(lo).lerp(hi, (rid + 1) / 2).convertSRGBToLinear();
        col.push(c.r, c.g, c.b);
      }
      g.setAttribute('color', new T.Float32BufferAttribute(col, 3));
      g.computeVertexNormals();
      const m = mesh(g, 0xffffff, { key: 'cerebellum', rough: 0.8, tissue: true });
      m.position.set(s * 0.275, -0.43, -0.55);
      m.scale.set(0.27, 0.155, 0.235);
      tissueMeshes.push(m);
    });
    const vg = new T.SphereGeometry(1, 34, 26);
    const vp = vg.attributes.position;
    for (let i = 0; i < vp.count; i++) {
      const x = vp.getX(i), y = vp.getY(i), z = vp.getZ(i);
      const f = 1 + 0.045 * Math.sin(y * 12);
      vp.setXYZ(i, x * f, y * f, z * f);
    }
    vg.computeVertexNormals();
    const verm = mesh(vg, 0xe9cfc2, { key: 'cerebellum', rough: 0.85, pick: false });
    verm.position.set(0, -0.40, -0.52); verm.scale.set(0.06, 0.14, 0.19);

    both(s => tube('chiasm', 0xf2e4da, [[s * 0.004, -0.21, 0.15], [s * 0.10, -0.22, 0.33]], 0.019, { rad: 10, seg: 10, pick: false }));
    both(s => tube('olf', 0xf2e4da, [[s * 0.085, -0.30, 0.38], [s * 0.085, -0.32, 0.62]], 0.016, { rad: 10, seg: 10, pick: false }));
  }

  /* ── appearance ─────────────────────────────────────────────────── */
  let peelValue = 1, activeOverlay = null;

  function paint() {
    mats.forEach(mt => {
      const b = mt.userData.base;
      mt.color.setHex(b.color).convertSRGBToLinear();
      mt.emissive.setHex(0x000000);
      mt.opacity = b.opacity;
    });
    const reveal = !!selected || !!activeOverlay;
    if (isolateOn && selected) {
      mats.forEach(mt => { mt.opacity = mt.userData.base.opacity * 0.0; });
      cortexMeshes.forEach(m => { m.material.opacity = 0.07; });
    } else if (reveal) {
      mats.forEach(mt => { mt.opacity = mt.userData.base.opacity * 0.5; });
      cortexMeshes.forEach(m => { m.material.opacity = Math.min(peelValue, 0.2); });
    } else {
      cortexMeshes.forEach(m => { m.material.opacity = peelValue; });
    }
    const hi = (key, strong) => {
      (groups[key] || []).forEach(m => {
        m.material.emissive.setHex(strong ? 0x4a2742 : 0x261624).convertSRGBToLinear();
        if (!m.material.vertexColors) m.material.color.offsetHSL(0, strong ? 0.16 : 0.09, strong ? 0.09 : 0.05);
        m.material.opacity = Math.max(m.material.userData.base.opacity, strong ? 1 : 0.9);
      });
    };
    if (activeOverlay) activeOverlay.keys.forEach(k => hi(k, false));
    if (hovered && hovered !== selected) hi(hovered, false);
    if (selected) hi(selected, true);
    mats.forEach(mt => {
      mt.transparent = mt.opacity < 0.995;
      mt.depthWrite = !mt.transparent;
      mt.visible = mt.opacity > 0.004;
    });
    needsRender = true;
  }

  function setColorMode(mode) {
    colorMode = mode;
    cortexMeshes.forEach(m => {
      const g = m.geometry;
      if (!g.userData.tissue) return;
      g.setAttribute('color', mode === 'tint' ? g.userData.tint : g.userData.tissue);
      g.attributes.color.needsUpdate = true;
    });
    needsRender = true;
  }

  /* ── overlays & markers ─────────────────────────────────────────── */
  function centroidOf(key) {
    if (failed) return null;
    const ms = (groups[key] || []).filter(m => m.visible !== false);
    if (!ms.length) return null;
    // bilateral structures: label the right-hand instance rather than the midline
    let best = null, bestX = -Infinity;
    ms.forEach(m => {
      m.updateMatrixWorld();
      const c = new T.Box3().expandByObject(m).getCenter(new T.Vector3());
      const x = m.scale.x < 0 ? -Math.abs(c.x) - 1 : c.x;
      if (x > bestX) { bestX = x; best = c; }
    });
    return best;
  }
  function bboxOf(key) {
    const ms = groups[key];
    if (!ms || !ms.length) return null;
    const box = new T.Box3();
    ms.forEach(m => { m.updateMatrixWorld(); box.expandByObject(m); });
    return box;
  }

  function setOverlay(def) {
    if (failed) return;
    if (overlayGroup) { scene.remove(overlayGroup); overlayGroup.traverse(o => { if (o.geometry) o.geometry.dispose(); }); overlayGroup = null; }
    activeOverlay = null;
    if (!def) { paint(); return; }
    overlayGroup = new T.Group();
    const keys = [], nodePts = {};
    def.nodes.forEach(id => {
      const e = window.ATLAS.get(id), key = e && e.mesh;
      if (!key) return;
      keys.push(key);
      const c = centroidOf(key);
      if (c) nodePts[id] = c;
    });
    (def.arcs || []).forEach(([a, b]) => {
      const p = nodePts[a], q = nodePts[b];
      if (!p || !q) return;
      const mid = p.clone().add(q).multiplyScalar(0.5).multiplyScalar(1.2).add(new T.Vector3(0, 0.08, 0));
      const g = tubeGeo([[p.x, p.y, p.z], [mid.x, mid.y, mid.z], [q.x, q.y, q.z]], 0.014, 44, 9);
      overlayGroup.add(new T.Mesh(g, new T.MeshStandardMaterial({ color: new T.Color(0xc86bbd).convertSRGBToLinear(), emissive: new T.Color(0x3d1638).convertSRGBToLinear(), roughness: 0.3 })));
    });
    Object.keys(nodePts).forEach(id => {
      const s = new T.Mesh(new T.SphereGeometry(0.036, 18, 14), new T.MeshStandardMaterial({ color: new T.Color(0xf3dcef).convertSRGBToLinear(), emissive: new T.Color(0x52234b).convertSRGBToLinear(), roughness: 0.25 }));
      s.position.copy(nodePts[id]);
      overlayGroup.add(s);
    });
    scene.add(overlayGroup);
    activeOverlay = { keys: keys, nodes: nodePts };
    paint();
  }

  function setMarker(dir) {
    if (failed) return null;
    if (markerGroup) { scene.remove(markerGroup); markerGroup = null; }
    if (!dir) { needsRender = true; return null; }
    const d = new T.Vector3(dir[0], dir[1], dir[2]).normalize();
    ray.set(new T.Vector3(0, 0.04, 0), d);
    ray.far = 3;
    const hits = ray.intersectObjects(cortexMeshes.concat(groups.insula || [], groups.cingulate || []), false);
    const pt = hits.length ? hits[hits.length - 1].point.clone() : d.clone().multiplyScalar(0.8);
    markerGroup = new T.Group();
    const dot = new T.Mesh(new T.SphereGeometry(0.032, 20, 14), new T.MeshStandardMaterial({ color: new T.Color(0xf6e2f2).convertSRGBToLinear(), emissive: new T.Color(0x7a3570).convertSRGBToLinear(), roughness: 0.2 }));
    dot.position.copy(pt.clone().multiplyScalar(1.015));
    markerGroup.add(dot);
    const halo = new T.Mesh(new T.TorusGeometry(0.062, 0.008, 8, 28), new T.MeshStandardMaterial({ color: new T.Color(0xc86bbd).convertSRGBToLinear(), emissive: new T.Color(0x5d2455).convertSRGBToLinear(), roughness: 0.3, transparent: true, opacity: 0.85 }));
    halo.position.copy(dot.position);
    halo.lookAt(dot.position.clone().multiplyScalar(2));
    markerGroup.add(halo);
    scene.add(markerGroup);
    needsRender = true;
    return pt;
  }

  /* ── camera ─────────────────────────────────────────────────────── */
  const VIEWS = {
    'lat-r': [0, 0.08, 2.95], 'lat-l': [Math.PI, 0.08, 2.95], 'med': [Math.PI, 0.02, 2.5],
    'sup': [Math.PI / 2, 1.42, 2.95], 'inf': [Math.PI / 2, -1.42, 2.95], 'ant': [Math.PI / 2, 0.06, 2.9],
    'default': [0.72, 0.17, 3.0]
  };
  function setHemi(mode) {
    const hideLeft = mode === 'right';
    scene.traverse(o => {
      if (!o.isMesh) return;
      const cx = o.scale.x < 0 ? -1 : o.position.x;
      if (cx < -0.01) o.userData.hemiHidden = hideLeft;
    });
    needsRender = true;
  }
  function view(name) {
    if (failed) return;
    setHemi(name === 'med' ? 'right' : 'both');

    const v = VIEWS[name] || VIEWS.default;
    want.az = v[0]; want.el = v[1]; want.dist = v[2] * fit;
    want.target.set(0, -0.04, 0);
    spinning = false;
    needsRender = true;
  }
  function focus(key) {
    if (failed) return;
    const box = bboxOf(key);
    if (!box) { want.target.set(0, -0.04, 0); want.dist = 3.0 * fit; return; }
    const c = box.getCenter(new T.Vector3()), size = box.getSize(new T.Vector3());
    const r = Math.max(size.x, size.y, size.z);
    want.target.copy(c).multiplyScalar(0.55);
    want.dist = Math.max(1.85, Math.min(3.1, 1.2 + r * 2.6)) * fit;
    spinning = false;
    needsRender = true;
  }
  function updateCam(dt) {
    if (spinning && !reduce && !selected && performance.now() - lastInput > 4000) want.az += dt * 0.10;
    const k = 0.14;
    rot.az += (want.az - rot.az) * k;
    rot.el += (want.el - rot.el) * k;
    dist += (want.dist - dist) * k;
    target.lerp(want.target, k);
    const ce = Math.cos(rot.el);
    cam.position.set(target.x + dist * ce * Math.cos(rot.az), target.y + dist * Math.sin(rot.el), target.z + dist * ce * Math.sin(rot.az));
    cam.lookAt(target);
    scene.traverse(o => { if (o.isMesh) o.visible = o.material.visible !== false && !o.userData.hemiHidden && !hiddenLayers.has(o.userData.layer); });
  }

  /* ── interaction ────────────────────────────────────────────────── */
  function bind() {
    let drag = false, lx = 0, ly = 0, moved = 0, pinch = 0;
    canvas.addEventListener('pointerdown', e => {
      drag = true; moved = 0; lx = e.clientX; ly = e.clientY; lastInput = performance.now(); spinning = false;
      try { canvas.setPointerCapture(e.pointerId); } catch (_) {}
    });
    canvas.addEventListener('pointerup', e => {
      drag = false;
      try { canvas.releasePointerCapture(e.pointerId); } catch (_) {}
      if (moved < 7) { const h = hit(e); cb.onPick && cb.onPick(h ? h.object.userData.key : null, h ? h.point : null); }
    });
    canvas.addEventListener('pointermove', e => {
      if (drag) {
        const dx = e.clientX - lx, dy = e.clientY - ly;
        moved += Math.abs(dx) + Math.abs(dy);
        want.az -= dx * 0.0075;
        want.el = Math.max(-1.48, Math.min(1.48, want.el + dy * 0.0058));
        lx = e.clientX; ly = e.clientY; lastInput = performance.now(); needsRender = true;
      } else hoverAt(e);
    });
    canvas.addEventListener('pointerleave', () => {
      if (hovered) { hovered = null; paint(); }
      cb.onHover && cb.onHover(null);
    });
    canvas.addEventListener('wheel', e => {
      e.preventDefault();
      want.dist = Math.max(1.3 * fit, Math.min(4.6 * fit, want.dist + Math.sign(e.deltaY) * 0.2 * fit));
      lastInput = performance.now(); spinning = false; needsRender = true;
    }, { passive: false });
    canvas.addEventListener('touchmove', e => {
      if (e.touches.length === 2) {
        const d = Math.hypot(e.touches[0].clientX - e.touches[1].clientX, e.touches[0].clientY - e.touches[1].clientY);
        if (pinch) { want.dist = Math.max(1.3 * fit, Math.min(4.6 * fit, want.dist - (d - pinch) * 0.009 * fit)); needsRender = true; }
        pinch = d;
      }
    }, { passive: true });
    canvas.addEventListener('touchend', () => { pinch = 0; });
    canvas.addEventListener('dblclick', e => {
      const h = hit(e);
      if (h) { cb.onPick && cb.onPick(h.object.userData.key, h.point); focus(h.object.userData.key); }
    });
  }

  function ndc(e) {
    const r = canvas.getBoundingClientRect();
    return new T.Vector2(((e.clientX - r.left) / r.width) * 2 - 1, -((e.clientY - r.top) / r.height) * 2 + 1);
  }
  function hit(e) {
    if (failed || !ready) return null;
    ray.setFromCamera(ndc(e), cam);
    ray.far = 100;
    const hits = ray.intersectObjects(pickables.filter(m => m.visible && m.material.opacity > 0.1), false);
    return hits.length ? hits[0] : null;
  }
  function hoverAt(e) {
    const h = hit(e);
    const key = h ? h.object.userData.key : null;
    if (key !== hovered) { hovered = key; paint(); }
    const r = canvas.getBoundingClientRect();
    cb.onHover && cb.onHover(key, e.clientX - r.left, e.clientY - r.top);
  }

  /* ── init ───────────────────────────────────────────────────────── */
  function init(opt) {
    canvas = opt.canvas; cb = opt;
    scene = new T.Scene();
    cam = new T.PerspectiveCamera(34, 1, 0.1, 60);
    try {
      renderer = new T.WebGLRenderer({ canvas: canvas, antialias: true, alpha: true, preserveDrawingBuffer: true });
    } catch (err) { failed = true; opt.onFail && opt.onFail(err); return api; }
    renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    renderer.outputEncoding = T.sRGBEncoding;
    renderer.toneMapping = T.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.18;
    renderer.localClippingEnabled = true;
    ray = new T.Raycaster();

    scene.add(new T.HemisphereLight(0xfff2ec, 0x2a1f24, 0.62));
    const d1 = new T.DirectionalLight(0xfff6ee, 1.05); d1.position.set(2.4, 2.6, 2.2); scene.add(d1);
    const d2 = new T.DirectionalLight(0xc9dcea, 0.34); d2.position.set(-2.6, -0.4, -1.8); scene.add(d2);
    const d3 = new T.DirectionalLight(0xffd9c4, 0.3); d3.position.set(0.6, -2.4, 1.4); scene.add(d3);
    const rim = new T.DirectionalLight(0xe8c0d8, 0.34); rim.position.set(-1.2, 1.6, -2.6); scene.add(rim);
    scene.add(new T.AmbientLight(0xffffff, 0.05));

    bind();
    resize();
    opt.onProgress && opt.onProgress(0.02);
    buildCortexGeometries(
      f => { opt.onProgress && opt.onProgress(f * 0.75); },
      geos => {
        Object.keys(geos).forEach(n => {
          [1, -1].forEach(s => {
            const m = mesh(geos[n], 0xffffff, { key: n, rough: 0.72, tissue: true });
            if (s < 0) m.scale.x = -1;
            cortexMeshes.push(m); tissueMeshes.push(m);
          });
        });
        opt.onProgress && opt.onProgress(0.85);
        setTimeout(() => {
          buildRest();
          setColorMode(colorMode);
          paint();
          ready = true;
          opt.onProgress && opt.onProgress(1);
          opt.onReady && opt.onReady();
        }, 16);
      }
    );

    let prev = performance.now();
    (function loop() {
      requestAnimationFrame(loop);
      const now = performance.now(), dt = Math.min(0.05, (now - prev) / 1000);
      prev = now;
      const moving = Math.abs(want.az - rot.az) + Math.abs(want.el - rot.el) + Math.abs(want.dist - dist) + target.distanceTo(want.target) > 0.0004;
      const spin = spinning && !reduce && !selected && now - lastInput > 4000;
      if (moving || spin || needsRender) {
        updateCam(dt);
        renderer.render(scene, cam);
        needsRender = moving || spin;
        cb.onFrame && cb.onFrame();
      }
    })();
    return api;
  }

  function resize() {
    if (failed) return;
    const w = canvas.clientWidth || 800, h = canvas.clientHeight || 600;
    renderer.setSize(w, h, false);
    cam.aspect = w / h; cam.updateProjectionMatrix();
    const prev = fit;
    const halfFov = Math.tan(cam.fov * Math.PI / 360);
    const needH = 0.70 / halfFov;                 // fit the height
    const needW = 1.05 / (halfFov * cam.aspect);  // fit the length
    fit = Math.max(0.72, Math.min(2.6, Math.max(needH, needW) * 1.16 / 3.0));
    if (prev !== fit) { want.dist *= fit / prev; dist *= fit / prev; }
    needsRender = true;
  }

  const api = {
    init: init, resize: resize, view: view, focus: focus, setOverlay: setOverlay, setMarker: setMarker,
    hemi: setHemi, colorMode: setColorMode, centroid: centroidOf,
    layers: Object.keys(LAYERS),
    layerFor(key) { return layerOf[key] || 'other'; },
    layerHidden(L) { return hiddenLayers.has(L); },
    setLayer(L, on) {
      if (on) hiddenLayers.delete(L); else hiddenLayers.add(L);
      needsRender = true;
    },
    showAllLayers() { hiddenLayers.clear(); needsRender = true; },
    snapshot() {
      if (failed) return null;
      renderer.render(scene, cam);
      try { return canvas.toDataURL('image/png'); } catch (_) { return null; }
    },
    reset() {
      if (failed) return;
      hiddenLayers.clear();
      selected = null; hovered = null; isolateOn = false;
      renderer.clippingPlanes = []; lastClip = null;
      setHemi('both');
      peelValue = 1;
      cortexMeshes.forEach(m => { m.material.userData.base.opacity = 1; });
      paint();
      want.az = 0.72; want.el = 0.17; want.dist = 3.0 * fit; want.target.set(0, -0.04, 0);
      spinning = true; lastInput = performance.now();
      needsRender = true;
    },
    failed() { return failed; },
    isReady() { return ready; },
    select(key) { if (failed) return; selected = key || null; paint(); },
    isolate(on) { if (failed) return; isolateOn = on; paint(); },
    spin(on) { spinning = on; lastInput = on ? 0 : performance.now(); needsRender = true; },
    spinning() { return spinning; },
    nudge(dAz, dEl) { want.az += dAz; want.el = Math.max(-1.48, Math.min(1.48, want.el + dEl)); spinning = false; lastInput = performance.now(); needsRender = true; },
    zoom(d) { want.dist = Math.max(1.3 * fit, Math.min(4.6 * fit, want.dist + d * fit)); needsRender = true; },
    peel(v) {
      if (failed) return;
      peelValue = v;
      cortexMeshes.forEach(m => { m.material.userData.base.opacity = v; });
      paint();
    },
    clip(axis, t, remember) {
      if (failed) return;
      if (remember !== false) lastClip = (!axis || axis === 'none') ? null : { axis: axis, t: t };
      if (!axis || axis === 'none') { renderer.clippingPlanes = []; needsRender = true; return; }
      const n = axis === 'x' ? new T.Vector3(-1, 0, 0) : axis === 'y' ? new T.Vector3(0, -1, 0) : new T.Vector3(0, 0, -1);
      const span = axis === 'z' ? 1.1 : axis === 'y' ? 0.75 : 0.85;
      renderer.clippingPlanes = [new T.Plane(n, t * span)];
      needsRender = true;
    },
    project(v3) {
      if (failed) return { x: -9999, y: -9999, z: 2 };
      const p = v3.clone().project(cam), r = canvas.getBoundingClientRect();
      return { x: (p.x * 0.5 + 0.5) * r.width, y: (-p.y * 0.5 + 0.5) * r.height, z: p.z };
    },
    has(key) { return !failed && !!groups[key]; },
    _cortexPoint: cortexPoint, _lobeOf: lobeOf,
    _stats() {
      let total = 0, vis = 0, hemi = 0, matHidden = 0;
      scene.traverse(o => {
        if (!o.isMesh) return;
        total++;
        if (o.visible) vis++;
        if (o.userData.hemiHidden) hemi++;
        if (o.material.visible === false) matHidden++;
      });
      return { total: total, visible: vis, hemiHidden: hemi, matHidden: matHidden,
               cam: [+cam.position.x.toFixed(2), +cam.position.y.toFixed(2), +cam.position.z.toFixed(2)],
               dist: +dist.toFixed(2), fit: +fit.toFixed(2), az: +rot.az.toFixed(2), el: +rot.el.toFixed(2) };
    },
    viewName() {
      if (failed) return 'model unavailable';
      const a = ((rot.az % (Math.PI * 2)) + Math.PI * 2) % (Math.PI * 2);
      if (rot.el > 0.9) return 'superior';
      if (rot.el < -0.9) return 'inferior';
      if (a < 0.7 || a > 5.6) return 'right lateral';
      if (a > 2.5 && a < 3.8) return 'left lateral';
      if (a >= 0.7 && a <= 2.5) return 'right antero-oblique';
      return 'postero-oblique';
    }
  };
  return api;
})();
