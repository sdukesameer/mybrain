/* Encephalon Atlas — UI layer: index, dossier, course, viva, persistence. */
(function () {
  const A = window.ATLAS, B = window.BRAIN;
  const $ = id => document.getElementById(id);
  const el = (tag, cls, html) => { const n = document.createElement(tag); if (cls) n.className = cls; if (html != null) n.innerHTML = html; return n; };
  const esc = s => String(s).replace(/[<>&]/g, c => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;' }[c]));

  const meshToEntry = {};
  A.entries.forEach(e => { if (e.mesh && !e.parent && !meshToEntry[e.mesh]) meshToEntry[e.mesh] = e.id; });
  A.entries.forEach(e => { if (e.mesh && !meshToEntry[e.mesh]) meshToEntry[e.mesh] = e.id; });
  const overlayByEntry = {};
  Object.keys(A.overlays).forEach(k => { if (!overlayByEntry[A.overlays[k].entry]) overlayByEntry[A.overlays[k].entry] = k; });

  /* ── persistence: artifact db when available, localStorage otherwise ── */
  const store = (function () {
    const KEY = 'encephalon-atlas-v1';
    let state = { seen: {}, notes: {}, quiz: { answered: {}, correct: 0 } };
    let doc = null, saveTimer = null;
    try { const raw = localStorage.getItem(KEY); if (raw) state = Object.assign(state, JSON.parse(raw)); } catch (_) {}
    function flush() {
      try { localStorage.setItem(KEY, JSON.stringify(state)); } catch (_) {}
      if (doc) doc.set({ data: state, updated: Date.now() }).catch(() => {});
    }
    function save() { clearTimeout(saveTimer); saveTimer = setTimeout(flush, 600); }
    (async function () {
      if (!window.claude || !window.claude.use) return;
      try {
        const db = await window.claude.use('db');
        if (!db) return;
        doc = db.doc('progress/state');
        const snap = await doc.get();
        if (snap && snap.data && snap.data.data) {
          const remote = snap.data.data;
          state.seen = Object.assign({}, remote.seen, state.seen);
          state.notes = Object.assign({}, remote.notes, state.notes);
          if (remote.quiz && (remote.quiz.correct || 0) > (state.quiz.correct || 0)) state.quiz = remote.quiz;
          renderTree(); renderProgress(); if (current) openEntry(current.id, true);
        }
      } catch (_) {}
    })();
    return {
      state: state,
      see(id) { if (!state.seen[id]) { state.seen[id] = Date.now(); save(); renderProgress(); renderTree(); } },
      note(id, txt) { state.notes[id] = txt; save(); },
      answer(i, ok) { if (state.quiz.answered[i] === undefined) { state.quiz.answered[i] = ok; if (ok) state.quiz.correct++; save(); } },
      reset() { state.quiz = { answered: {}, correct: 0 }; save(); }
    };
  })();

  /* ── index rail ──────────────────────────────────────────────────── */
  let current = null, filter = '';

  function matches(e) {
    if (!filter) return true;
    const hay = [e.name, e.latin, e.ba, e.tag, (e.tests || []).map(t => t[0]).join(' '), (e.clinic || []).join(' '), (e.fn || []).join(' ')].join(' ').toLowerCase();
    return hay.indexOf(filter) >= 0;
  }

  function renderTree() {
    const host = $('tree');
    const open = {};
    host.querySelectorAll('details').forEach(d => { open[d.dataset.g] = d.open; });
    host.innerHTML = '';
    A.groups.forEach(g => {
      const items = A.entries.filter(e => e.group === g.id && !e.parent && matches(e));
      const subs = A.entries.filter(e => e.group === g.id && e.parent && matches(e));
      if (!items.length && !subs.length) return;
      const d = el('details', 'grp');
      d.dataset.g = g.id;
      d.open = filter ? true : (open[g.id] !== undefined ? open[g.id] : (g.id === 'Cortex' || g.id === 'Systems'));
      const sum = el('summary', null, `<span>${g.label}</span><span class="n">${items.length + subs.length}</span>`);
      d.appendChild(sum);
      const box = el('div', 'items');
      const add = (e, isSub) => {
        const b = el('button', 'item' + (isSub ? ' sub' : '') + (store.state.seen[e.id] ? ' seen' : ''));
        b.innerHTML = `<span class="dot"></span><span>${esc(e.name)}</span>` + (e.ba && e.ba !== '—' ? `<span class="ba">${esc(e.ba.replace('BA ', ''))}</span>` : '');
        if (current && current.id === e.id) b.setAttribute('aria-current', 'true');
        b.onclick = () => openEntry(e.id);
        box.appendChild(b);
      };
      items.forEach(e => {
        add(e, false);
        A.entries.filter(s => s.parent === e.id && matches(s)).forEach(s => add(s, true));
      });
      subs.filter(s => !items.some(i => i.id === s.parent)).forEach(s => add(s, true));
      d.appendChild(box);
      host.appendChild(d);
    });
  }

  function renderProgress() {
    const total = A.entries.length;
    const n = A.entries.filter(e => store.state.seen[e.id]).length;
    $('pcount').textContent = `${n} / ${total} studied`;
    $('pbar').style.width = (n / total * 100).toFixed(1) + '%';
  }

  /* ── dossier ─────────────────────────────────────────────────────── */
  const TABS = [
    { id: 'anatomy', label: 'Anatomy' },
    { id: 'circuit', label: 'Circuitry' },
    { id: 'fn', label: 'Function' },
    { id: 'chem', label: 'Chemistry' },
    { id: 'clinic', label: 'Clinical' },
    { id: 'tests', label: 'Measurement' },
    { id: 'nums', label: 'Numbers' },
    { id: 'notes', label: 'Notes' }
  ];
  let tab = 'anatomy';

  function facts(list) {
    const ul = el('ul', 'facts');
    (list || []).forEach(t => ul.appendChild(el('li', null, t)));
    return ul;
  }
  function section(title, node) {
    const s = el('div', 'sect');
    s.appendChild(el('h3', null, `<span>${title}</span>`));
    s.appendChild(node);
    return s;
  }

  function renderBody(e) {
    const host = $('d-body');
    host.innerHTML = '';
    const wrap = el('div', 'sect');
    if (tab === 'anatomy') {
      wrap.appendChild(section('Gross anatomy', facts(e.anatomy)));
      if (e.cyto && e.cyto.length) wrap.appendChild(section('Cytoarchitecture & cell types', facts(e.cyto)));
    } else if (tab === 'circuit') {
      const flow = el('div', 'flow');
      (e.circuit || []).forEach(c => {
        const r = el('div', 'flowrow');
        r.appendChild(el('span', null, c.dir));
        r.appendChild(el('p', null, c.txt));
        flow.appendChild(r);
      });
      wrap.appendChild(section('Connectivity', flow));
      const links = el('div', 'linkrow');
      const ov = overlayByEntry[e.id];
      if (ov) { const b = el('button', null, 'Show this circuit on the model'); b.onclick = () => { $('overlay').value = ov; applyOverlay(ov); }; links.appendChild(b); }
      Object.keys(A.overlays).filter(k => A.overlays[k].nodes.indexOf(e.id) >= 0).forEach(k => {
        const b = el('button', null, 'Trace: ' + A.overlays[k].label);
        b.onclick = () => { $('overlay').value = k; applyOverlay(k); };
        links.appendChild(b);
      });
      if (links.children.length) wrap.appendChild(section('Trace on the model', links));
    } else if (tab === 'fn') {
      wrap.appendChild(section('Function', facts(e.fn)));
    } else if (tab === 'chem') {
      wrap.appendChild(section('Neurochemistry & pharmacology', facts(e.chem)));
    } else if (tab === 'clinic') {
      wrap.appendChild(section('Lesions, syndromes & clinical correlates', facts(e.clinic)));
    } else if (tab === 'tests') {
      const t = el('table', 'testtable');
      t.innerHTML = '<thead><tr><th>Instrument / paradigm</th><th>What it actually indexes</th></tr></thead>';
      const tb = el('tbody');
      (e.tests || []).forEach(([a, b]) => {
        const tr = el('tr');
        tr.appendChild(el('td', null, a));
        tr.appendChild(el('td', null, b));
        tb.appendChild(tr);
      });
      t.appendChild(tb);
      wrap.appendChild(section('Assessment & measurement', t));
      if (e.caution) wrap.appendChild(el('div', 'caution', '<b>Psychometric caution</b>' + e.caution));
    } else if (tab === 'nums') {
      const grid = el('div', 'nums');
      (e.nums || []).forEach(([v, l, n]) => {
        const d = el('div', 'num');
        d.appendChild(el('b', null, v));
        d.appendChild(el('span', null, l));
        if (n) d.appendChild(el('i', null, n));
        grid.appendChild(d);
      });
      if ((e.nums || []).length) wrap.appendChild(section('Quantities worth knowing', grid));
      const refs = el('div', 'refs');
      (e.refs || []).forEach(r => refs.appendChild(el('div', null, r)));
      if ((e.refs || []).length) wrap.appendChild(section('Primary sources', refs));
    } else if (tab === 'notes') {
      const ta = el('textarea', 'notes');
      ta.id = 'note-' + e.id;
      ta.placeholder = 'Your notes on ' + e.name + ' — questions to follow up, papers to read, how it connects to your own work.';
      ta.value = store.state.notes[e.id] || '';
      const st = el('div', 'savestate', 'Saved locally' + (window.claude && window.claude.use ? ' and to your account' : ''));
      ta.oninput = () => { store.note(e.id, ta.value); st.textContent = 'Saving…'; setTimeout(() => { st.textContent = 'Saved'; }, 500); };
      wrap.appendChild(section('Notes', ta));
      wrap.appendChild(st);
    }
    host.appendChild(wrap);
    host.scrollTop = 0;
  }

  function openEntry(id, keepTab) {
    const e = A.get(id);
    if (!e) return;
    current = e;
    if (!keepTab && !e[tab] && tab !== 'notes') tab = 'anatomy';
    store.see(id);

    const eb = $('d-eyebrow');
    eb.innerHTML = '';
    eb.appendChild(el('span', 'chip acc', (A.groups.find(g => g.id === e.group) || {}).label || e.group));
    if (e.ba && e.ba !== '—') eb.appendChild(el('span', 'chip', e.ba));
    if (e.parent) {
      const p = A.get(e.parent);
      const c = el('span', 'chip cy', 'in ' + p.name);
      eb.appendChild(c);
    }
    $('d-name').textContent = e.name;
    $('d-latin').textContent = e.latin && e.latin !== '—' ? e.latin : '';
    $('d-tag').innerHTML = e.tag || '';

    const tabs = $('tabs');
    tabs.innerHTML = '';
    TABS.forEach(t => {
      const has = t.id === 'notes' || (e[t.id] && e[t.id].length);
      if (!has) return;
      const b = el('button', null, t.label);
      b.setAttribute('aria-pressed', t.id === tab ? 'true' : 'false');
      b.onclick = () => { tab = t.id; openEntry(id, true); };
      tabs.appendChild(b);
    });
    renderBody(e);
    renderTree();
    showOn3D(e);
  }

  /* ── 3D coupling ─────────────────────────────────────────────────── */
  let pins = [], markerPoint = null, labelsOn = true, userOverlay = 'none';

  function showOn3D(e) {
    pins = [];
    markerPoint = null;
    if (e.mesh && B.has(e.mesh)) {
      B.select(e.mesh);
      if (e.marker) {
        markerPoint = B.setMarker(e.marker);
        if (markerPoint) pins.push({ p: markerPoint, t: e.name, pin: true });
      } else {
        B.setMarker(null);
        const c = B.centroid(e.mesh);
        if (c) pins.push({ p: c, t: e.name, pin: true });
      }
      if (userOverlay === 'none') B.setOverlay(null);
    } else {
      B.select(null);
      B.setMarker(null);
      const ovKey = overlayByEntry[e.id];
      if (ovKey && userOverlay === 'none') { applyOverlay(ovKey, true); $('overlay').value = ovKey; }
      else if (e.nodes) { B.setOverlay({ nodes: e.nodes, arcs: [] }); overlayPins(e.nodes); }
      else if (userOverlay === 'none') B.setOverlay(null);
    }
    $('ro-now').textContent = e.name;
    $('ro-kicker').textContent = 'Selected · ' + B.viewName();
    updateCoord(e);
    drawLabels();
  }

  function overlayPins(nodes) {
    pins = [];
    nodes.forEach(id => {
      const n = A.get(id);
      if (!n || !n.mesh) return;
      const c = B.centroid(n.mesh);
      if (c) pins.push({ p: c, t: n.name });
    });
  }

  function applyOverlay(key, silent) {
    userOverlay = key;
    if (key === 'none') {
      B.setOverlay(null);
      pins = [];
      if (current) showOn3D(current);
      return;
    }
    const def = A.overlays[key];
    B.setOverlay(def);
    overlayPins(def.nodes);
    if (!silent && def.entry) {
      const keep = userOverlay;
      openEntry(def.entry, false);
      userOverlay = keep;
      B.setOverlay(def);
      overlayPins(def.nodes);
    }
    $('ro-kicker').textContent = 'Overlay · ' + def.label;
    drawLabels();
  }

  function updateCoord(e) {
    const key = e && e.mesh;
    let p = markerPoint || (key ? B.centroid(key) : null);
    if (!p) { $('ro-coord').textContent = e && e.nodes ? e.nodes.length + ' nodes traced' : ''; return; }
    const mm = v => (v >= 0 ? '+' : '−') + Math.abs(Math.round(v * 85));
    $('ro-coord').textContent = `x ${mm(p.x)}  y ${mm(p.z)}  z ${mm(p.y)} mm · model estimate`;
  }

  function drawLabels() {
    const host = $('labels');
    host.innerHTML = '';
    if (!labelsOn) return;
    pins.forEach(pin => {
      const s = B.project(pin.p);
      if (s.z > 1) return;
      const d = el('div', 'lbl' + (pin.pin ? ' pin' : ''), esc(pin.t));
      d.style.left = s.x + 'px';
      d.style.top = (s.y - 8) + 'px';
      host.appendChild(d);
    });
  }

  /* ── course pane ─────────────────────────────────────────────────── */
  function renderLearn() {
    const host = $('pane-learn');
    host.innerHTML = '';
    const w = el('div', 'pane-wrap');
    w.appendChild(el('h2', null, 'A systematic course through the brain'));
    w.appendChild(el('p', 'lede', 'Eight modules, ordered so that each one supplies the vocabulary the next assumes. Work through a module’s structures in sequence, then answer its probe question from memory before moving on. Progress is tracked per structure — a structure counts as studied once you have opened its dossier.'));
    A.modules.forEach((m, i) => {
      const done = m.items.filter(id => store.state.seen[id]).length;
      const card = el('div', 'mod');
      const h = el('header');
      h.appendChild(el('span', 'idx', String(i + 1).padStart(2, '0')));
      h.appendChild(el('h3', null, m.title));
      h.appendChild(el('span', 'pct', done + '/' + m.items.length));
      card.appendChild(h);
      const inner = el('div', 'inner');
      inner.appendChild(el('div', 'obj', m.aim));
      const row = el('div', 'linkrow');
      m.items.forEach(id => {
        const e = A.get(id);
        const b = el('button', null, (store.state.seen[id] ? '✓ ' : '') + e.name);
        b.onclick = () => { setMode('explore'); openEntry(id); };
        row.appendChild(b);
      });
      inner.appendChild(row);
      inner.appendChild(el('div', 'expl', '<b>Probe:</b> ' + m.probe));
      card.appendChild(inner);
      w.appendChild(card);
    });
    host.appendChild(w);
  }

  /* ── viva pane ───────────────────────────────────────────────────── */
  let qIndex = 0;
  function renderTest() {
    const host = $('pane-test');
    host.innerHTML = '';
    const w = el('div', 'pane-wrap');
    w.appendChild(el('h2', null, 'Viva'));
    const ans = Object.keys(store.state.quiz.answered).length;
    w.appendChild(el('p', 'lede', `Forty questions on localisation, circuitry and measurement — written the way a viva examiner asks them, with the reasoning given in full after each answer. Answered ${ans} of ${A.quiz.length}, ${store.state.quiz.correct} correct.`));
    const q = A.quiz[qIndex % A.quiz.length];
    const card = el('div', 'quiz');
    card.appendChild(el('div', 'qmeta', `Question ${(qIndex % A.quiz.length) + 1} of ${A.quiz.length}`));
    card.appendChild(el('div', 'qstem', q.q));
    const opts = el('div', 'opts');
    const order = q._order || (q._order = q.o.map((_, i) => i).sort(() => Math.random() - 0.5));
    order.forEach(i => {
      const b = el('button', null, q.o[i]);
      b.onclick = () => {
        const ok = i === q.a;
        store.answer(qIndex % A.quiz.length, ok);
        opts.querySelectorAll('button').forEach(x => { x.disabled = true; });
        b.className = ok ? 'right' : 'wrong';
        if (!ok) { const right = [...opts.querySelectorAll('button')].find(x => x.textContent === q.o[q.a]); if (right) right.className = 'right'; }
        const ex = el('div', 'expl', q.e);
        card.appendChild(ex);
        const foot = el('div', 'qmeta');
        if (q.s) {
          const jump = el('button', null, 'Open ' + A.get(q.s).name);
          jump.onclick = () => { setMode('explore'); openEntry(q.s); };
          foot.appendChild(jump);
        }
        const next = el('button', null, 'Next question →');
        next.onclick = () => { qIndex++; renderTest(); };
        foot.appendChild(next);
        card.appendChild(foot);
      };
      opts.appendChild(b);
    });
    card.appendChild(opts);
    w.appendChild(card);
    const reset = el('div', 'linkrow');
    const rb = el('button', null, 'Reset score');
    rb.onclick = () => { store.reset(); qIndex = 0; renderTest(); };
    reset.appendChild(rb);
    w.appendChild(reset);
    host.appendChild(w);
  }

  /* ── modes & controls ────────────────────────────────────────────── */
  function setMode(m) {
    const isAtlas = m === 'explore';
    $('body').style.display = isAtlas ? '' : 'none';
    $('pane-learn').classList.toggle('on', m === 'learn');
    $('pane-test').classList.toggle('on', m === 'test');
    ['explore', 'learn', 'test'].forEach(k => $('m-' + k).setAttribute('aria-pressed', k === m ? 'true' : 'false'));
    if (m === 'learn') renderLearn();
    if (m === 'test') renderTest();
    if (isAtlas) setTimeout(() => B.resize(), 20);
  }

  function boot() {
    renderTree();
    renderProgress();
    B.init({
      canvas: $('gl'),
      onFail() {
        const st = $('stage');
        const n = el('div', 'glfail', '<b>3D view unavailable</b>This browser could not start WebGL, so the model cannot be drawn. Every dossier, the course and the viva all still work — use the index on the left. To restore the model, enable hardware acceleration or open the page in another browser.');
        st.appendChild(n);
        $('ro-now').textContent = 'Atlas';
        $('ro-kicker').textContent = 'Text mode';
      },
      labels: $('labels'),
      onFrame: drawLabels,
      onHover(key) {
        if (!key) { $('ro-kicker').textContent = (userOverlay !== 'none' ? 'Overlay · ' + A.overlays[userOverlay].label : 'Selected · ' + B.viewName()); $('ro-now').textContent = current ? current.name : '—'; return; }
        const id = meshToEntry[key];
        if (!id) return;
        $('ro-kicker').textContent = 'Hover · click to open';
        $('ro-now').textContent = A.get(id).name;
      },
      onPick(key) {
        if (!key) return;
        const id = meshToEntry[key];
        if (id) { userOverlay = $('overlay').value = 'none'; openEntry(id); }
      }
    });

    $('views').querySelectorAll('button').forEach(b => { b.onclick = () => { B.view(b.dataset.v); setTimeout(drawLabels, 400); }; });
    $('peel').oninput = e => { B.peel(+e.target.value / 100); };
    $('plane').onchange = e => { B.clip(e.target.value, +$('depth').value / 100); };
    $('depth').oninput = e => { B.clip($('plane').value, +e.target.value / 100); };
    $('overlay').onchange = e => applyOverlay(e.target.value);
    $('lblchk').onchange = e => { labelsOn = e.target.checked; drawLabels(); };
    $('q').oninput = e => { filter = e.target.value.trim().toLowerCase(); renderTree(); };
    $('m-explore').onclick = () => setMode('explore');
    $('m-learn').onclick = () => setMode('learn');
    $('m-test').onclick = () => setMode('test');
    $('theme').onclick = () => {
      const r = document.documentElement;
      const cur = r.getAttribute('data-theme');
      const dark = cur ? cur === 'dark' : matchMedia('(prefers-color-scheme: dark)').matches;
      r.setAttribute('data-theme', dark ? 'light' : 'dark');
    };
    addEventListener('resize', () => { B.resize(); drawLabels(); });

    openEntry('orientation');
    setMode('explore');
  }

  if (document.readyState === 'loading') addEventListener('DOMContentLoaded', boot); else boot();
})();
