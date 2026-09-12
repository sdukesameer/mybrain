/* Encephalon Atlas — content model + cerebral cortex dossiers.
   Coordinate convention for surface markers: +x right, +y superior, +z anterior.
   Markers are direction vectors; the model snaps them onto the cortical surface. */
window.ATLAS = (function () {
  const entries = [];
  const byId = {};
  const A = {
    entries, byId,
    add(e) { entries.push(e); byId[e.id] = e; return e; },
    get(id) { return byId[id]; },
    groups: [
      { id: 'Cortex', label: 'Cerebral cortex' },
      { id: 'Subcortical', label: 'Subcortical grey' },
      { id: 'White', label: 'White matter' },
      { id: 'Stem', label: 'Brainstem & modulators' },
      { id: 'Cerebellum', label: 'Cerebellum' },
      { id: 'Neuroendocrine', label: 'Neuroendocrine & CSF' },
      { id: 'Systems', label: 'Networks & systems' }
    ]
  };
  const add = A.add;

  /* ── Frontal lobe ───────────────────────────────────────────────── */
  add({
    id: 'frontal', name: 'Frontal lobe', latin: 'Lobus frontalis', group: 'Cortex',
    ba: 'BA 4, 6, 8–11, 24, 32, 44–47',
    mesh: 'frontal',
    tag: 'A third of the neocortex, organised as a caudal-to-rostral gradient from movement, through action selection, to the abstract rules and goals that outlive the current stimulus.',
    anatomy: [
      'Bounded by the <b>central sulcus</b> posteriorly and the <b>lateral (Sylvian) fissure</b> inferiorly; the medial surface descends to the cingulate sulcus.',
      'Four functional territories: <b>primary motor</b> (BA 4, anterior wall of central sulcus), <b>premotor/supplementary motor</b> (BA 6), <b>lateral prefrontal</b> (BA 8, 9, 46, 45, 44, 10), and <b>orbital/medial prefrontal</b> (BA 11, 47, 13, 14, 24, 32, 25).',
      'Rostral expansion is the human signature: frontopolar cortex (BA 10) has larger dendritic spine density and more inter-columnar space than in other primates, consistent with associative rather than sensory work.',
      'Gyral landmarks worth being able to name on the model: superior, middle and inferior frontal gyri; the inferior frontal gyrus divides into <em>pars opercularis</em> (44), <em>triangularis</em> (45) and <em>orbitalis</em> (47).'
    ],
    cyto: [
      'Almost entirely <b>homotypical isocortex</b> (six laminae) except BA 4, which is <em>agranular</em> — layer IV is effectively absent and layer V carries the giant Betz cells.',
      'A gradient of granularity runs from agranular motor/limbic cortex (posteromedial, orbital) to fully granular dysgranular→granular prefrontal cortex rostrally; this gradient predicts connectional hierarchy (Barbas’ structural model).',
      'Layer III pyramidal neurons in lateral PFC support recurrent excitation through NMDA-NR2B synapses — the cellular basis of persistent delay-period firing, and the reason PFC is unusually sensitive to noise, stress and NMDA antagonism.'
    ],
    circuit: [
      { dir: 'Afferent', txt: 'Parietal and temporal association cortex (dorsal and ventral streams), thalamic mediodorsal nucleus, amygdala (to orbital/medial sectors), midbrain dopaminergic VTA, locus coeruleus, basal forebrain cholinergic projections.' },
      { dir: 'Efferent', txt: 'Corticospinal and corticobulbar tracts (BA 4/6), corticostriatal projections topographically to caudate/putamen, corticothalamic feedback, corticopontine to cerebellum, and dense top-down projections back onto sensory cortices.' },
      { dir: 'Loop', txt: 'Five parallel cortico-striato-pallido-thalamo-cortical loops (motor, oculomotor, dorsolateral prefrontal, lateral orbitofrontal, anterior cingulate) — the architecture that makes frontal and basal-ganglia syndromes phenomenologically overlapping.' }
    ],
    fn: [
      '<b>Cognitive control:</b> maintaining a goal representation robust to interference, and biasing posterior processing in its favour (Miller & Cohen’s guided-activation account).',
      '<b>Temporal organisation of behaviour:</b> cross-temporal contingencies — bridging a cue, a delay and a response (Fuster).',
      '<b>Action selection and inhibition:</b> right inferior frontal gyrus and pre-SMA for stopping; medial wall for monitoring conflict and error.',
      '<b>Valuation and social regulation:</b> orbital and ventromedial sectors compute expected value and constrain behaviour by social consequence.',
      'Frontal cortex does not “house” intelligence: it hosts the control operations that let stored knowledge be deployed flexibly. Crystallised knowledge survives frontal lesions; the use of it often does not.'
    ],
    chem: [
      '<b>Dopamine (mesocortical, from VTA):</b> inverted-U relationship to working-memory performance; D1 receptor stimulation sharpens tuning, too little or too much degrades it. COMT Val158Met modulates the set-point.',
      '<b>Noradrenaline:</b> post-synaptic α2A stimulation (guanfacine) strengthens network connectivity; α1 and β activation under stress impairs it.',
      '<b>Acetylcholine</b> from nucleus basalis supports attentional effort; <b>serotonin</b> from dorsal raphe modulates orbitofrontal reversal learning and aggression thresholds.',
      'Glutamatergic recurrent networks with fast-spiking parvalbumin GABA interneurons generate gamma; loss of PV interneuron function is a leading account of prefrontal dysfunction in schizophrenia.'
    ],
    clinic: [
      '<b>Dorsolateral syndrome:</b> dysexecutive — poor planning, perseveration, impaired set-shifting, reduced fluency, flat problem-solving.',
      '<b>Orbitofrontal / ventromedial syndrome:</b> disinhibition, poor risk appraisal, pseudopsychopathy, acquired sociopathy (Gage; Iowa lesion series).',
      '<b>Medial / anterior cingulate syndrome:</b> apathy, abulia, akinetic mutism — reduced initiation with preserved capacity.',
      '<b>Behavioural-variant FTD</b> begins here: early loss of social comportment with normal MMSE and normal memory testing — a classic false-negative for screening instruments.',
      'Also: alien-hand and grasp reflexes (medial premotor), utilisation behaviour and environmental dependency (Lhermitte), and expressive aphasia (BA 44/45).'
    ],
    tests: [
      ['WCST — perseverative errors', 'Set-shifting and feedback use; sensitive but <em>not</em> anatomically specific (Mountain & Snow, 1993).'],
      ['Trail Making B (minus A)', 'Alternating set with speed partialled out; contaminated by visual search and motor speed.'],
      ['Letter (FAS) vs category fluency', 'Letter fluency loads frontal-executive retrieval; category fluency loads temporal semantic store — the dissociation is more informative than either score.'],
      ['Stroop colour-word interference', 'Prepotent-response suppression; D-KEFS adds an inhibition/switching condition.'],
      ['n-back / WAIS-IV Letter-Number Sequencing', 'Maintenance plus manipulation; LNS is the cleaner clinical proxy for PFC load.'],
      ['Iowa Gambling Task, Cambridge Gamble', 'Value-based decision under ambiguity vs explicit risk — vmPFC/OFC rather than DLPFC.'],
      ['BRIEF-A / DEX (informant)', 'Everyday executive failure; informant ratings routinely outperform office tests in bvFTD.']
    ],
    caution: 'The <b>task-impurity problem</b> is at its worst here: every executive test requires the abilities it is meant to isolate plus several it is not. Miyake’s latent-variable work (2000) shows updating, shifting and inhibition are separable but correlated factors — so interpret a <em>pattern across tasks with a common-EF factor in mind</em>, never a single score. Office testing is also poorly ecological: structured, cued and time-limited conditions are exactly what a dysexecutive patient needs to look normal.',
    nums: [
      ['≈ 35 %', 'of neocortical volume', 'Largest lobe; the prefrontal share is not disproportionate to brain size across primates — its <em>connectivity</em> is.'],
      ['1.8–4.5 mm', 'cortical thickness', 'Thinnest in primary sensory cortex, thickest in motor and prefrontal crowns of gyri.'],
      ['≈ 30 000', 'Betz cells per hemisphere', 'Only ~3–5 % of corticospinal axons — the pyramidal tract is mostly small fibres from BA 6 and parietal cortex.']
    ],
    refs: [
      'Miller EK & Cohen JD (2001). An integrative theory of prefrontal cortex function. <em>Annu Rev Neurosci</em>.',
      'Fuster JM. <em>The Prefrontal Cortex</em> — cross-temporal contingency and the perception–action cycle.',
      'Stuss DT & Benson DF (1986). <em>The Frontal Lobes</em>.',
      'Alexander GE, DeLong MR & Strick PL (1986). Parallel organization of functionally segregated circuits. <em>Annu Rev Neurosci</em>.',
      'Arnsten AFT (2009). Stress signalling pathways that impair prefrontal cortex structure and function. <em>Nat Rev Neurosci</em>.'
    ]
  });

  add({
    id: 'm1', name: 'Primary motor cortex (M1)', latin: 'Gyrus praecentralis', group: 'Cortex',
    ba: 'BA 4', parent: 'frontal', mesh: 'frontal', marker: [0.62, 0.60, 0.16],
    tag: 'The cortical output stage for voluntary movement — a somatotopic map that codes movement parameters, not muscles.',
    anatomy: [
      'Occupies the anterior bank of the central sulcus and the crown of the precentral gyrus; the leg representation folds onto the medial surface into the paracentral lobule.',
      'The <b>motor homunculus</b> (Penfield) is disproportionate: hand, lips and tongue occupy territory far beyond their mass, reflecting degrees of freedom rather than size.',
      'Anterior (rostral) M1 is phylogenetically older and less directly connected to motoneurons; caudal M1 in the sulcal depth holds the "new" primate monosynaptic cortico-motoneuronal cells for fractionated finger movement.'
    ],
    cyto: [
      '<b>Agranular</b> cortex: no discernible layer IV; layer V contains Betz cells (soma up to 100 µm) — among the largest neurons in the CNS.',
      'Output is organised in radial columns; intracortical horizontal connections mean neighbouring "muscle" sites overlap extensively — the map is a smear, not a mosaic.'
    ],
    circuit: [
      { dir: 'Afferent', txt: 'Premotor and supplementary motor cortex, S1 and area 5 (proprioceptive updating), cerebellum via thalamic VL/VPLo, basal ganglia via VA/VLo.' },
      { dir: 'Efferent', txt: 'Corticospinal tract (≈ 1 million axons; ~85–90 % decussate at the pyramidal decussation into the lateral CST), corticobulbar to cranial motor nuclei, corticoreticular and corticostriatal branches.' }
    ],
    fn: [
      'Population activity encodes movement <b>direction, velocity and force</b> (Georgopoulos population vector), and — in the sulcal cortico-motoneuronal cells — individuated digit force.',
      'Supports motor learning through synaptic plasticity: map reorganisation follows use, injury and skill acquisition within days.'
    ],
    chem: ['Glutamatergic pyramidal output; local GABAergic inhibition sets intracortical inhibition measurable with paired-pulse TMS (SICI/ICF) — a usable biomarker in movement disorders and in mapping cortical excitability in psychiatric samples.'],
    clinic: [
      'Lesion: contralateral <b>spastic hemiparesis</b> with weakness maximal distally, loss of fine finger individuation, upper-motor-neuron signs (hyperreflexia, Babinski) after the acute flaccid phase.',
      'Focal irritative lesion: <b>Jacksonian march</b> — seizure spreading along the homuncular map.',
      'Selective loss of Betz cells with corticospinal degeneration defines the upper-motor-neuron component of ALS.'
    ],
    tests: [
      ['Grooved Pegboard, Finger Tapping', 'Lateralised manual speed and dexterity; interpret as a <em>dominant/non-dominant ratio</em> (typically 10 % advantage for the dominant hand).'],
      ['Purdue Pegboard, dynamometer', 'Bilateral dexterity and grip; useful for detecting non-physiological asymmetry.'],
      ['TMS motor threshold / MEP latency', 'Direct corticospinal integrity, independent of effort.']
    ],
    caution: 'Motor tests are the most effort-dependent measures in the battery. A discrepancy between grip strength, tapping speed and pegboard time that does not follow any neuroanatomical gradient is one of the classic performance-validity signals — check it before interpreting cognitive scores.',
    nums: [
      ['≈ 1 × 10⁶', 'corticospinal axons', 'Only ~40 000 are large-diameter, fast-conducting fibres.'],
      ['60–120 µm', 'Betz cell soma', 'Largest cortical pyramidal neuron.']
    ],
    refs: ['Penfield W & Boldrey E (1937). Somatic motor and sensory representation. <em>Brain</em>.', 'Lemon RN (2008). Descending pathways in motor control. <em>Annu Rev Neurosci</em>.']
  });

  add({
    id: 'premotor', name: 'Premotor & supplementary motor area', latin: 'Area praemotoria, area motoria supplementaria', group: 'Cortex',
    ba: 'BA 6 (SMA, pre-SMA, PMd, PMv)', parent: 'frontal', mesh: 'frontal', marker: [0.5, 0.62, 0.45],
    tag: 'Where an intention becomes a motor plan: sequencing, preparation, and the sense that a movement is one’s own.',
    anatomy: [
      'Lateral BA 6 splits into dorsal (PMd) and ventral (PMv) premotor cortex; medial BA 6 into <b>SMA proper</b> (caudal) and <b>pre-SMA</b> (rostral to the VCA line).',
      'Pre-SMA connects with prefrontal cortex and caudate (cognitive), SMA proper with M1, spinal cord and putamen (motor) — a rostro-caudal transition from "which action" to "how to execute it".'
    ],
    cyto: ['Agranular/dysgranular; large layer V pyramids project directly to the spinal cord (SMA contributes ~10 % of the corticospinal tract).'],
    circuit: [
      { dir: 'Afferent', txt: 'Posterior parietal cortex (action affordances), prefrontal cortex, basal ganglia via thalamic VA/VLo, cerebellum via VL.' },
      { dir: 'Efferent', txt: 'M1, spinal cord, reticular formation, putamen; mirror-property PMv neurons project to inferior parietal cortex.' }
    ],
    fn: [
      '<b>SMA:</b> internally generated, sequential and bimanual movement; source of the <em>Bereitschaftspotential</em> (readiness potential) preceding self-initiated action by ~1 s — the signal at the centre of the Libet debates on volition.',
      '<b>pre-SMA:</b> sequence learning, switching between motor sets, and — with right IFG — stopping.',
      '<b>PMv:</b> grasp selection and object affordance; contains mirror neurons (di Pellegrino/Rizzolatti), the physiological basis of action–observation matching.'
    ],
    chem: ['Heavy dopaminergic modulation via striatal loops — accounts for hypokinesia in Parkinson’s disease being partly a premotor/SMA activation failure rather than a pyramidal deficit.'],
    clinic: [
      'SMA lesion: transient akinesia and mutism, then impaired bimanual coordination; sometimes <b>alien-hand</b> phenomena.',
      'Premotor lesion: <b>limb-kinetic apraxia</b>, impaired sequencing with intact strength.',
      'Hypoactivation of SMA is one of the most replicated functional findings in Parkinson’s disease and in psychogenic (functional) movement disorder, with different connectivity signatures.'
    ],
    tests: [
      ['Luria three-step (fist–edge–palm)', 'Motor sequencing — bedside, fast, and abnormal early in frontal disease.'],
      ['Alternating hand movements / reciprocal coordination', 'Bimanual sequencing; dissociates apraxia from weakness.'],
      ['Go/No-Go and Stop-Signal Reaction Time (SSRT)', 'Pre-SMA–right IFG–STN stopping network; SSRT is a genuinely quantitative inhibition index.']
    ],
    nums: [['≈ 1 s', 'readiness potential onset', 'Precedes self-reported urge in Libet-type paradigms by several hundred ms.']],
    refs: ['Nachev P, Kennard C & Husain M (2008). Functional role of the supplementary and pre-supplementary motor areas. <em>Nat Rev Neurosci</em>.', 'Aron AR et al. (2014). Inhibition and the right inferior frontal cortex: one decade on. <em>Trends Cogn Sci</em>.']
  });

  add({
    id: 'dlpfc', name: 'Dorsolateral prefrontal cortex', latin: 'Cortex praefrontalis dorsolateralis', group: 'Cortex',
    ba: 'BA 9, 46 (with 8, 45)', parent: 'frontal', mesh: 'frontal', marker: [0.72, 0.42, 0.78],
    tag: 'The maintenance-and-manipulation cortex: holds what is not present, and uses it to select what to do next.',
    anatomy: [
      'Middle frontal gyrus and the rostral superior frontal gyrus, anterior to premotor cortex, above the inferior frontal sulcus.',
      'Granular cortex with reciprocal connections to almost every association area — the structural correlate of its domain-general role.',
      'Human BA 46 sits within a mid-dorsolateral region whose macaque homologue is also 46; BA 9/46 boundaries are cytoarchitectonically fuzzy, so fMRI "DLPFC" coordinates should be read as a territory, not a nucleus.'
    ],
    cyto: [
      'Fully granular, thick layer III with high spine density; layer III pyramidal recurrent microcircuits sustain persistent firing across delays (Goldman-Rakic).',
      'Parvalbumin-expressing chandelier and basket cells impose gamma-band timing; reduced GAD67 and PV mRNA in layer III here is among the best-replicated post-mortem findings in schizophrenia.'
    ],
    circuit: [
      { dir: 'Afferent', txt: 'Posterior parietal cortex (area 7a/LIP — spatial and attentional), superior temporal association cortex, mediodorsal thalamus, VTA dopaminergic, locus coeruleus noradrenergic.' },
      { dir: 'Efferent', txt: 'Dorsal caudate (DLPFC loop), premotor cortex, superior colliculus via FEF, parietal cortex (top-down attentional bias), and the reticular nucleus for thalamic gating.' },
      { dir: 'Loop', txt: 'DLPFC → dorsolateral caudate → GPi/SNr → VA/MD thalamus → DLPFC. Lesions anywhere in this loop produce dysexecutive phenotypes — including caudate stroke and Huntington’s disease.' }
    ],
    fn: [
      '<b>Working memory:</b> delay-period persistent activity representing spatial and non-spatial information; capacity is not storage but protection against distraction.',
      '<b>Rule and task-set representation:</b> abstract, hierarchically ordered rules; rostral regions code more abstract policies (Badre’s rostro-caudal hierarchy).',
      '<b>Manipulation:</b> reordering, updating and monitoring information in mind (Petrides’ mid-dorsolateral monitoring account).',
      'Substrate of the <b>common executive factor</b>, and the parieto-frontal integration theory’s frontal node for <em>g</em> (Jung & Haier, 2007).'
    ],
    chem: [
      'D1 receptor stimulation follows an <b>inverted U</b>: too little and delay-firing collapses, too much and tuning is lost (Arnsten). This is why stimulants help some and worsen others at the same dose.',
      'α2A-adrenergic agonism (guanfacine) closes HCN channels on dendritic spines and strengthens network connections — the mechanistic basis for its use in ADHD.',
      'NMDA-NR2B dependence explains why ketamine transiently reproduces schizophrenia-like working-memory and thought-disorder phenomena.'
    ],
    clinic: [
      'Lesion: dysexecutive syndrome — perseveration, poor strategy generation, impaired self-ordered search, reduced verbal fluency; IQ often preserved.',
      '<b>Schizophrenia:</b> hypofrontality with reduced efficiency (more activation for equivalent performance), layer III PV interneuron pathology, and working-memory deficit as a candidate endophenotype.',
      '<b>Depression:</b> relative left DLPFC hypoactivity — the rationale for left high-frequency rTMS at F3 (the 5 cm rule or, better, MRI-guided BA 46/9 targeting).',
      'Caudate or MD thalamic lesions mimic DLPFC damage — always consider subcortical loop disruption before localising to cortex.'
    ],
    tests: [
      ['Self-Ordered Pointing, CANTAB SWM', 'Monitoring of self-generated responses — the closest human analogue of Petrides’ mid-dorsolateral tasks.'],
      ['n-back (2-back, 3-back)', 'Continuous updating with interference; the standard fMRI probe of DLPFC load.'],
      ['Digit Span backward / LNS / Arithmetic', 'WAIS-IV Working Memory Index — manipulation more than storage.'],
      ['WCST, D-KEFS Sorting', 'Concept formation and shifting; report perseverative errors and conceptual-level responses, not just categories achieved.'],
      ['Verbal fluency (FAS), design fluency', 'Strategic retrieval and generativity; check cluster/switch structure (Troyer) to separate retrieval from semantic store.'],
      ['Tower of London / Zoo Map', 'Planning with look-ahead; scoring separates planning latency from execution errors.']
    ],
    caution: 'Working-memory and executive indices correlate 0.5–0.7 with <em>g</em>. Without an estimate of premorbid ability (WTAR/TOPF, NART, demographic regression), a low executive score is uninterpretable. Use normative <b>base rates of low scores</b> — in a healthy adult given a 25-test battery, several scores below the 5th percentile are expected (Binder, Iverson & Emmert, 2009; Crawford’s multivariate base rates), which is why "impairment" should require a pattern, not an outlier.',
    nums: [
      ['0.5–0.7', 'correlation of EF with g', 'Executive measures are among the most g-saturated in the battery.'],
      ['≈ 3–4 items', 'working-memory capacity', 'Cowan’s k; the older "7 ± 2" was chunk capacity with rehearsal.'],
      ['Inverted U', 'D1 dose–response', 'Optimal catecholamine level is state- and genotype-dependent (COMT Val158Met).']
    ],
    refs: [
      'Goldman-Rakic PS (1995). Cellular basis of working memory. <em>Neuron</em>.',
      'Petrides M (2005). Lateral prefrontal cortex: architectonic and functional organization. <em>Phil Trans R Soc B</em>.',
      'Miyake A et al. (2000). The unity and diversity of executive functions. <em>Cogn Psychol</em>.',
      'Jung RE & Haier RJ (2007). The parieto-frontal integration theory (P-FIT). <em>Behav Brain Sci</em>.',
      'Lewis DA, Hashimoto T & Volk DW (2005). Cortical inhibitory neurons and schizophrenia. <em>Nat Rev Neurosci</em>.'
    ]
  });

  add({
    id: 'ofc', name: 'Orbitofrontal cortex', latin: 'Cortex orbitofrontalis', group: 'Cortex',
    ba: 'BA 11, 12, 13, 47 (lateral OFC ≈ 47/12)', parent: 'frontal', mesh: 'frontal', marker: [0.42, -0.58, 0.86],
    tag: 'A value map built from every sensory modality, continuously updated by outcome — the cortex of reversal, regret and restraint.',
    anatomy: [
      'The ventral frontal surface above the orbital plate, with a characteristic H-shaped pattern of orbital sulci; medial OFC merges into vmPFC, lateral OFC into the inferior frontal gyrus pars orbitalis.',
      'A posterior-to-anterior gradient: agranular/dysgranular posteriorly (limbic, interoceptive) to granular anteriorly (abstract, secondary reinforcers).',
      'Structurally vulnerable: the orbital gyri sit against the sharp bony ridge of the orbital roof, making this the commonest site of contusion in frontal-impact TBI along with the anterior temporal poles.'
    ],
    cyto: ['Belongs to Mesulam’s paralimbic belt; dense reciprocal amygdala connections, and the only cortex receiving direct primary olfactory and gustatory input.'],
    circuit: [
      { dir: 'Afferent', txt: 'All five sensory modalities (including primary olfactory and gustatory cortex), amygdala, hypothalamus, mediodorsal thalamus (magnocellular), VTA, dorsal raphe.' },
      { dir: 'Efferent', txt: 'Ventromedial caudate and nucleus accumbens (lateral OFC loop), amygdala, hypothalamus, periaqueductal grey, striatum, and back to sensory association cortex.' },
      { dir: 'Loop', txt: 'Lateral orbitofrontal loop: OFC → ventromedial caudate → GPi/SNr → VA/MD thalamus → OFC. Hyperactivity in this loop, with the caudate as the pivot, is the dominant circuit model of OCD.' }
    ],
    fn: [
      '<b>Outcome-specific value coding:</b> neurons code the value of a particular reward, and update within a trial or two when contingencies change — hence <em>reversal learning</em>.',
      '<b>Economic choice:</b> transforms heterogeneous goods into a common currency (Padoa-Schioppa); tracks relative and not just absolute value.',
      '<b>Regret and counterfactual comparison</b> depend on medial OFC; lateral OFC signals punishment and non-reward, driving behavioural change.',
      '<b>Sensory-specific satiety</b>: OFC responses to a food drop as it is eaten to satiety while the taste percept itself is unchanged — value, not sensation.'
    ],
    chem: [
      'Serotonergic depletion selectively impairs reversal learning without affecting attentional set-shifting — a pharmacological double dissociation from DLPFC (Clarke, Roberts, Robbins).',
      'Dopaminergic prediction-error input from VTA teaches the value map; low 5-HT function is associated with impulsive aggression and steeper delay discounting.'
    ],
    clinic: [
      '<b>Acquired disinhibition syndrome:</b> tactlessness, facetiousness (<em>Witzelsucht</em>), impulsivity, hypersexuality, gambling — with intact IQ, memory and executive test scores.',
      '<b>OCD:</b> elevated OFC/caudate metabolism that normalises with SSRI or CBT response (Baxter’s PET series) — one of the first demonstrations that psychotherapy changes regional metabolism.',
      '<b>Addiction:</b> OFC damage or dysfunction produces persistence of choice despite loss, and blunts devaluation of habitual reinforcers.',
      'Orbitofrontal contusion is often the unseen lesion in "mild" TBI with major personality change and a normal neuropsychological profile.'
    ],
    tests: [
      ['Iowa Gambling Task', 'Learning to avoid high-magnitude/high-penalty decks; vmPFC/OFC patients keep choosing them despite explicit knowledge.'],
      ['Probabilistic reversal learning', 'The most mechanistically specific OFC probe; scores perseverative responses after contingency switch.'],
      ['Delay-discounting (MCQ, Kirby)', 'Temporal impulsivity as a rate parameter k — a genuinely psychometric alternative to categorical impulsivity.'],
      ['Faux Pas test, Hotel Task, Multiple Errands', 'Social judgement and real-world multitasking — the domains where OFC damage actually shows.'],
      ['FrSBe / Iowa Rating Scales (informant)', 'Quantifies the disinhibition/apathy/dysexecutive triad against premorbid ratings.']
    ],
    caution: 'This is the region where standard batteries fail most conspicuously. A patient may score in the superior range on WAIS-IV and D-KEFS while being unable to hold a job or a marriage. Document the discrepancy explicitly: <em>structured office performance is not evidence of preserved regulation in unstructured settings</em>. Prefer informant instruments, real-world tasks and behavioural observation, and say so in the report.',
    nums: [
      ['1–2 trials', 'reversal learning update', 'Speed at which OFC value coding tracks a changed contingency.'],
      ['≈ 2 %', 'of cortex is paralimbic OFC', 'Small territory, disproportionate behavioural consequence.']
    ],
    refs: [
      'Rolls ET (2004). The functions of the orbitofrontal cortex. <em>Brain Cogn</em>.',
      'Bechara A, Damasio AR, Damasio H & Anderson SW (1994). Insensitivity to future consequences following damage to human prefrontal cortex. <em>Cognition</em>.',
      'Padoa-Schioppa C (2011). Neurobiology of economic choice: a good-based model. <em>Annu Rev Neurosci</em>.',
      'Baxter LR et al. (1992). Caudate glucose metabolic rate changes with both drug and behavior therapy for OCD. <em>Arch Gen Psychiatry</em>.'
    ]
  });

  add({
    id: 'vmpfc', name: 'Ventromedial prefrontal cortex', latin: 'Cortex praefrontalis ventromedialis', group: 'Cortex',
    ba: 'BA 10m, 11m, 14, 25, 32', parent: 'frontal', mesh: 'frontal', marker: [0.1, -0.42, 0.95],
    tag: 'Where bodily state, memory and value converge into a felt sense of what matters — and where extinction learning tells the amygdala to stand down.',
    anatomy: [
      'The medial orbital and subgenual/pregenual medial wall: BA 14 and 10m/11m with BA 25 (subcallosal) at its posterior limit.',
      'A hub of the default-mode network’s anterior node, and the cortical origin of descending control over the amygdala and hypothalamus.'
    ],
    cyto: ['Agranular to dysgranular limbic cortex; layer V projections to amygdala intercalated cell masses — the inhibitory gate for conditioned fear.'],
    circuit: [
      { dir: 'Afferent', txt: 'Hippocampus and subiculum, amygdala, mediodorsal thalamus, insula (interoceptive), VTA, dorsal raphe, hypothalamus.' },
      { dir: 'Efferent', txt: 'Amygdala (intercalated cells → inhibition of central nucleus output), hypothalamus, PAG, nucleus accumbens shell, and brainstem autonomic nuclei.' }
    ],
    fn: [
      '<b>Somatic marker generation</b> — reinstating the bodily correlates of previous outcomes so that options are pre-filtered before deliberation (Damasio).',
      '<b>Fear extinction and its retention:</b> infralimbic/vmPFC drives extinction consolidation; extinction is new learning that inhibits, not erasure — the core rationale of exposure therapy and of return-of-fear phenomena (renewal, reinstatement, spontaneous recovery).',
      '<b>Self-referential processing and moral judgement:</b> lesions shift utilitarian/deontological judgement in trolley-type dilemmas (Koenigs & Tranel).',
      '<b>Value-guided choice</b> with subjective, non-instrumental goods; also tracks the value of information.'
    ],
    chem: ['Glucocorticoid receptor-rich; chronic stress causes dendritic retraction here while the amygdala hypertrophies — the structural asymmetry underlying stress-related loss of top-down regulation (McEwen).'],
    clinic: [
      '<b>BA 25 (subgenual ACC)</b> hypermetabolism in treatment-resistant depression is the target of Mayberg’s DBS work; subgenual volume loss is reported in familial depression (Drevets).',
      '<b>PTSD:</b> reduced vmPFC activation with amygdala hyperresponsivity and impaired extinction retention — the best-supported circuit account of the disorder.',
      'Lesions: impaired decision-making with preserved intellect, blunted anticipatory autonomic responses (absent SCR before risky choice), altered moral judgement, and reduced spontaneous emotional experience.'
    ],
    tests: [
      ['Iowa Gambling Task with skin conductance', 'The anticipatory SCR before a risky deck is the operationalisation of the somatic-marker hypothesis.'],
      ['Fear-conditioning/extinction paradigms (SCR, fear-potentiated startle)', 'Extinction retention indices are the translational measure used in PTSD trials.'],
      ['Moral dilemma batteries', 'Sensitive to vmPFC lesion; interpret cautiously — heavily culture-bound.'],
      ['TAS-20, interoceptive accuracy (heartbeat tracking)', 'Alexithymia and interoception; pairs with insula measures.']
    ],
    caution: 'Reverse inference is a live danger here: "vmPFC activation" is reported for reward, self, extinction, morality and rest. A finding is only interpretable against a stated task contrast and a prior — Poldrack’s (2006) argument applies directly to how these maps are read in clinical papers.',
    nums: [
      ['BA 25', 'Cg25 DBS target', 'Mayberg et al. (2005) — subcallosal cingulate white matter stimulation in TRD.'],
      ['↓ volume', 'subgenual ACC in MDD', 'Reported in familial and recurrent depression; effect sizes modest, samples heterogeneous.']
    ],
    refs: [
      'Damasio AR (1994). <em>Descartes’ Error</em> — the somatic marker hypothesis.',
      'Milad MR & Quirk GJ (2012). Fear extinction as a model for translational neuroscience. <em>Annu Rev Psychol</em>.',
      'Mayberg HS et al. (2005). Deep brain stimulation for treatment-resistant depression. <em>Neuron</em>.',
      'Koenigs M et al. (2007). Damage to the prefrontal cortex increases utilitarian moral judgements. <em>Nature</em>.'
    ]
  });

  add({
    id: 'broca', name: "Broca's area & inferior frontal gyrus", latin: 'Gyrus frontalis inferior', group: 'Cortex',
    ba: 'BA 44 (opercularis), 45 (triangularis)', parent: 'frontal', mesh: 'frontal', marker: [0.78, 0.02, 0.62],
    tag: 'Speech production, syntactic assembly, and — in the right hemisphere — the brake on prepotent responses.',
    anatomy: [
      'Pars opercularis (BA 44) and pars triangularis (BA 45) of the left inferior frontal gyrus in ~95 % of right-handers; pars orbitalis (47) belongs functionally with OFC.',
      'Connected to posterior temporal language cortex by the <b>arcuate fasciculus / SLF III</b> (dorsal stream) and to anterior temporal cortex by the extreme capsule/uncinate (ventral stream).',
      'Broca’s original cases (Leborgne, Lelong) had lesions extending well beyond BA 44 — persistent Broca’s aphasia requires damage to underlying white matter and insula, not the gyrus alone.'
    ],
    cyto: ['BA 44 dysgranular, BA 45 granular; both show leftward asymmetry in layer III pyramidal size and in interhemispheric connectivity.'],
    circuit: [
      { dir: 'Afferent', txt: 'Posterior superior temporal gyrus and supramarginal gyrus via arcuate fasciculus, premotor cortex, insula, parietal operculum.' },
      { dir: 'Efferent', txt: 'Ventral premotor cortex and motor cortex face/larynx representation, basal ganglia (striatum), and pre-SMA; right IFG → subthalamic nucleus for the hyperdirect stopping pathway.' }
    ],
    fn: [
      '<b>Phonological encoding and articulatory planning</b> (BA 44); <b>semantic and syntactic selection</b> (BA 45).',
      'Syntactic complexity — especially non-canonical, movement-containing sentences — drives BA 44 activity; Grodzinsky’s trace-deletion account links this to asyntactic comprehension in agrammatism.',
      '<b>Right IFG:</b> response inhibition and stop-signal performance; also prosody and pragmatic inference.'
    ],
    chem: ['Left IFG dopaminergic and cholinergic modulation affects verbal fluency; language network activity is a target of inhibitory rTMS in fluency mapping prior to surgery.'],
    clinic: [
      '<b>Broca’s (expressive, non-fluent) aphasia:</b> effortful, agrammatic, telegraphic output; repetition impaired; comprehension relatively spared but not normal for complex syntax; <em>awareness preserved</em> — hence frequent, appropriate frustration and high rates of post-stroke depression.',
      'Isolated BA 44 lesion often causes transient mutism or apraxia of speech, recovering in weeks — a fact that revises the classic teaching.',
      'Right IFG damage: impaired stopping, disinhibition, and loss of prosodic/pragmatic nuance.'
    ],
    tests: [
      ['Boston Diagnostic Aphasia Examination, WAB (AQ)', 'Fluency, repetition, naming, comprehension profile — localises aphasia type quantitatively.'],
      ['Phonemic (FAS) vs semantic fluency dissociation', 'Left IFG vs anterior temporal contribution.'],
      ['Repetition of complex sentences, Token Test', 'Syntactic comprehension load.'],
      ['Stop-Signal Reaction Time', 'Right IFG–pre-SMA–STN network; SSRT in ms is an interval-scale inhibition measure.'],
      ['Apraxia of speech screens (diadochokinesis)', 'Separates articulatory planning from language.']
    ],
    caution: 'Verbal-test interpretation collapses if handedness and language dominance are unspecified: ~95 % of right-handers but only ~70 % of left-handers are left-dominant. Record handedness (Edinburgh Inventory), family sinistrality and education/language history before scoring any verbal index.',
    nums: [
      ['≈ 95 %', 'left dominance in right-handers', 'Falls to ~70 % in left-handers; ~15 % show bilateral representation.'],
      ['1861', 'Broca’s report on Leborgne', 'The lesion is preserved and has been MRI-scanned (Dronkers et al., 2007) — it extends into insula and deep white matter.']
    ],
    refs: [
      'Geschwind N (1970). The organization of language and the brain. <em>Science</em>.',
      'Hickok G & Poeppel D (2007). The cortical organization of speech processing. <em>Nat Rev Neurosci</em>.',
      'Dronkers NF et al. (2007). Paul Broca’s historic cases: high-resolution MR imaging of the brains of Leborgne and Lelong. <em>Brain</em>.'
    ]
  });

  add({
    id: 'fef', name: 'Frontal eye fields', latin: 'Area oculomotoria frontalis', group: 'Cortex',
    ba: 'BA 8 (with 6 pre-FEF)', parent: 'frontal', mesh: 'frontal', marker: [0.66, 0.5, 0.62],
    tag: 'Voluntary gaze and covert attention share one map — which is why eye-movement recordings are such a sensitive psychiatric probe.',
    anatomy: ['At the junction of the precentral and superior frontal sulci; projects to the superior colliculus and to the paramedian pontine reticular formation via the oculomotor loop through caudate and SNr.'],
    cyto: ['Granular cortex with large layer V cells projecting subcortically; movement and visual-fixation cell classes are intermixed.'],
    circuit: [
      { dir: 'Afferent', txt: 'LIP/parietal eye field, MT/MST motion areas, DLPFC (goal), thalamic MD.' },
      { dir: 'Efferent', txt: 'Superior colliculus (direct and via SNr disinhibition), PPRF (horizontal saccades), riMLF (vertical), caudate — the oculomotor CSTC loop.' }
    ],
    fn: [
      'Generation of <b>volitional saccades</b> and suppression of reflexive ones; microstimulation shifts covert attention, grounding premotor theories of attention.',
      'Antisaccade performance requires the FEF to suppress collicular reflexes via the basal ganglia — the reason it indexes frontal inhibition so cleanly.'
    ],
    chem: ['Dopaminergic modulation via the oculomotor loop; antipsychotics and anticholinergics both alter smooth-pursuit gain, a persistent confound in clinical eye-tracking studies.'],
    clinic: [
      'Acute unilateral lesion: transient gaze deviation <em>towards</em> the lesion and impaired contralateral volitional saccades (reflexive saccades spared).',
      '<b>Antisaccade error rate</b> and <b>smooth-pursuit gain</b> deficits are among the most robust endophenotypes in schizophrenia, present in unaffected first-degree relatives.',
      'Progressive supranuclear palsy: vertical saccade slowing then vertical gaze palsy (a brainstem/riMLF lesion, not FEF — useful contrast).'
    ],
    tests: [
      ['Antisaccade task (error rate, latency)', 'Reflex suppression; heritable, drug-sensitive, and continuous — a psychometrically strong measure.'],
      ['Smooth-pursuit gain, predictive pursuit', 'Schizophrenia endophenotype; distinguish from medication effects.'],
      ['Memory-guided saccade', 'Spatial working memory without a verbal channel — useful in aphasia or low literacy.'],
      ['Visual search / eye-movement recording during reading', 'Objective attentional strategy, no verbal report required.']
    ],
    nums: [['≈ 200 ms', 'volitional saccade latency', 'Reflexive express saccades occur at 90–120 ms.'], ['20–30 %', 'antisaccade errors in schizophrenia', 'vs ~10 % in controls; also elevated in relatives.']],
    refs: ['Hutton SB (2008). Cognitive control of saccadic eye movements. <em>Brain Cogn</em>.', 'Levy DL et al. Eye tracking dysfunction and schizophrenia — endophenotype literature.']
  });

  return A;
})();
