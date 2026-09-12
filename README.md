# Encephalon Atlas

An interactive 3D brain atlas for cognitive psychology, psycholinguistics and
neuropsychological assessment. Fifty structure dossiers — gross anatomy,
cytoarchitecture, connectivity, function, neurochemistry, clinical correlates,
and the **instruments that measure each structure**, with the psychometric
cautions that decide whether a score means anything.

- **Atlas** — click any structure on the procedural 3D model, or browse the index.
  Peel the cortex, take sagittal/axial/coronal cuts, and trace networks
  (default mode, salience, language, Papez, CSTC loops, and the dopamine,
  serotonin, noradrenaline and acetylcholine systems).
- **Course** — eight ordered modules, each with objectives and a probe question.
- **Viva** — forty examiner-style questions with full reasoning.

Progress and per-structure notes are stored in the browser (`localStorage`).

## Running it

No build step, no dependencies to install. Any static server:

```bash
python3 -m http.server 8000    # then open http://localhost:8000
```

Three.js (r128) is loaded from cdnjs; everything else — including all geometry —
is in this repository. The brain is generated procedurally: the cortex is a
gyrified ellipsoid partitioned into real lobes by anatomical boundary functions,
so each lobe, nucleus and tract is separately pickable.

## Deploying

**GitHub Pages** — Settings → Pages → *Deploy from a branch* → `main` / `/ (root)`.
The site is then served at `https://<user>.github.io/mybrain/`.

**Netlify** — connect the repository; no build command, publish directory `.`
(`netlify.toml` already specifies this).

## Files

| Path | Contents |
| --- | --- |
| `index.html` | Page shell, design tokens, layout |
| `src/atlas-cortex.js` | Frontal cortex dossiers |
| `src/atlas-posterior.js` | Parietal, temporal, occipital, insula, cingulate |
| `src/atlas-subcortical.js` | Subcortical grey and white-matter tracts |
| `src/atlas-stem.js` | Brainstem, modulatory systems, cerebellum, CSF |
| `src/atlas-systems.js` | Networks, psychometrics chapter, course, question bank |
| `src/brain-model.js` | Procedural Three.js geometry, picking, cuts, overlays |
| `src/app.js` | Index, dossier, course, viva, persistence |

Content is sourced from the primary literature cited in each dossier. It is a
study tool, not a clinical decision aid.
