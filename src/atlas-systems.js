/* Cross-cutting systems, overlay definitions, curriculum and question bank. */
(function (A) {
  const add = A.add;

  add({
    id: 'orientation', name: 'Orientation & organising principles', latin: 'Nomina anatomica', group: 'Systems',
    ba: '—', mesh: null,
    tag: 'Before any structure: the axes, planes and four organising principles that make the rest of the atlas predictable rather than memorised.',
    anatomy: [
      '<b>Axes.</b> Because the human neuraxis bends ~110° at the midbrain, directional terms change meaning between forebrain and brainstem: <em>dorsal</em> means superior in the forebrain but posterior in the brainstem. Use <b>rostral–caudal</b>, <b>dorsal–ventral</b>, <b>medial–lateral</b> and state the frame.',
      '<b>Planes.</b> Sagittal (left–right, midsagittal at x = 0), coronal (frontal), axial/horizontal. In MNI/Talairach space coordinates are given as (x, y, z) in mm from the anterior commissure: +x right, +y anterior, +z superior. Use the cut-plane control on the model to see each.',
      '<b>Developmental divisions.</b> Telencephalon (cortex, hippocampus, amygdala, basal ganglia) · diencephalon (thalamus, hypothalamus, epithalamus) · mesencephalon (midbrain) · metencephalon (pons, cerebellum) · myelencephalon (medulla). Grouping by embryology explains why thalamus and hypothalamus share a wall, and why cerebellum and pons share a peduncle.',
      '<b>Grey vs white.</b> Grey matter = cell bodies (cortex, nuclei); white matter = myelinated axons. Projection fibres run vertically (internal capsule), association fibres within a hemisphere (arcuate, uncinate, cingulum), commissural fibres between hemispheres (corpus callosum).'
    ],
    cyto: [
      '<b>Isocortex</b> (six layers) covers most of the hemisphere; <b>allocortex</b> (three layers: hippocampal archicortex, olfactory palaeocortex) and transitional periallocortex/proisocortex form the limbic core.',
      'Laminar logic, worth knowing once and using everywhere: <b>layer IV</b> receives thalamic input (thick in sensory cortex, absent in motor cortex), <b>layers II/III</b> send cortico-cortical and callosal output, <b>layer V</b> sends subcortical output (striatum, brainstem, spinal cord), <b>layer VI</b> feeds back to thalamus.',
      'Granularity therefore predicts function and hierarchy: agranular = motor or limbic, koniocortical = primary sensory, granular = association.'
    ],
    circuit: [
      { dir: 'Principle', txt: '<b>1 · Topographic mapping.</b> Neighbouring receptors project to neighbouring cortex — somatotopy, retinotopy, tonotopy. Magnification is proportional to receptor density, not body size.' },
      { dir: 'Principle', txt: '<b>2 · Hierarchy with heavier feedback.</b> Flow runs primary → unimodal → heteromodal → paralimbic → limbic (Mesulam), but descending connections outnumber ascending ones — which is why perception is predictive rather than passive.' },
      { dir: 'Principle', txt: '<b>3 · Parallel segregated loops.</b> Cortex → striatum → pallidum → thalamus → cortex, repeated five times for motor, oculomotor, executive, orbitofrontal and limbic functions (Alexander, DeLong & Strick). The same motif recurs in cortico-cerebellar circuits.' },
      { dir: 'Principle', txt: '<b>4 · Diffuse neuromodulation.</b> A few hundred thousand brainstem and basal-forebrain neurons (dopamine, noradrenaline, serotonin, acetylcholine, histamine) reach the whole forebrain and set gain, plasticity and state. Nearly every psychotropic drug acts here.' }
    ],
    fn: [
      '<b>How to reason about a lesion</b> — the sequence that works: (1) which structures lie in the vascular or anatomical territory? (2) which tracts pass through? (3) which loop is interrupted, and at which node? (4) what is the expected signature, and what should be <em>spared</em>? Predicting spared functions is what separates localisation from pattern-matching.',
      '<b>Double dissociation</b> is the logic of the field: patient A impaired on task X but not Y, patient B the reverse. It licenses claims about separable systems in a way a single deficit never can (Teuber; Shallice).',
      '<b>Vascular territories</b> give the fastest differential: ACA (medial frontal, leg, cingulate → abulia), MCA (lateral fronto-temporo-parietal → aphasia, neglect, face/arm weakness), PCA (occipital, medial temporal, thalamus → hemianopia, alexia, amnesia).'
    ],
    chem: ['Fast ionotropic transmission (glutamate — AMPA/NMDA/kainate; GABA — GABA-A) carries information; slow metabotropic transmission (monoamines, muscarinic ACh, peptides, GABA-B) modulates it. ~80 % of cortical neurons are glutamatergic pyramidal cells and ~20 % GABAergic interneurons — a ratio that matters because most disease and most drug action falls on the 20 %.'],
    clinic: [
      'Two questions to ask of any imaging or biomarker claim: <em>what is the effect size</em>, and <em>what is the base rate</em>? Structural findings in psychiatry are typically d = 0.2–0.7 with heavily overlapping distributions — informative about mechanism, useless for individual diagnosis.',
      'Group-to-individual inference is the recurring error: a significant difference at d = 0.5 still leaves ~69 % distribution overlap.'
    ],
    tests: [
      ['Use a fixed assessment sequence', 'Sensory/motor screen → orientation → attention → language → memory → visuospatial → executive → mood/behaviour. Language first: every later test depends on it.'],
      ['Always record the moderators', 'Handedness (Edinburgh), education years, test language and dominance, sensory aids, medication, sleep, mood, performance validity.'],
      ['Estimate premorbid ability', 'TOPF/WTAR, NART, or demographic regression — without it a "low" score has no referent.'],
      ['Interpret patterns, not points', 'Multivariate base rates of low scores, reliable-change indices with published SEM, index discrepancies rather than single subtests.']
    ],
    caution: 'Localisation in the strict sense — "function F lives in region R" — is obsolete. Regions participate in multiple networks; networks implement multiple functions. The defensible claims are: <em>this region is necessary for this operation</em> (lesions), <em>this region participates under these conditions</em> (imaging), and <em>this network configuration accompanies this state</em>. Treat reverse inference from activation to mental state as a hypothesis, never a conclusion.',
    nums: [
      ['≈ 86 × 10⁹', 'neurons in the brain', '16 billion in cerebral cortex, 69 billion in cerebellum (Herculano-Houzel, 2009) — the familiar "100 billion" was never measured.'],
      ['≈ 1 400 g', 'adult brain mass', '~2 % of body weight, ~20 % of resting oxygen and glucose use.'],
      ['7 000–10 000', 'synapses per cortical neuron', 'Of the order of 10¹⁴ cortical synapses in total.'],
      ['≈ 2 400 cm²', 'cortical surface area', 'Two-thirds of it hidden inside sulci.'],
      ['50 ml/100 g/min', 'cerebral blood flow', 'Grey matter ~80, white matter ~20 — the basis of perfusion imaging.']
    ],
    refs: [
      'Mesulam MM (1998). From sensation to cognition. <em>Brain</em>.',
      'Herculano-Houzel S (2009). The human brain in numbers. <em>Front Hum Neurosci</em>.',
      'Shallice T (1988). <em>From Neuropsychology to Mental Structure</em>.',
      'Poldrack RA (2006). Can cognitive processes be inferred from neuroimaging data? <em>Trends Cogn Sci</em>.'
    ]
  });

  add({
    id: 'language', name: 'The language network', latin: 'Systema linguisticum', group: 'Systems',
    ba: 'BA 44/45, 22, 37, 39/40, ATL', mesh: null,
    nodes: ['broca', 'wernicke', 'a1', 'ipl', 'atl', 'fusiform', 'arcuate'],
    tag: 'A dual-stream, left-dominant network — and the system where psycholinguistic method (RT, ERP, eye movements) gives the most precise behavioural read-out in cognitive neuroscience.',
    anatomy: [
      '<b>Dorsal stream</b> (sound → articulation): posterior STG/STS → Spt/supramarginal → pars opercularis (BA 44) → premotor cortex, via the <b>arcuate fasciculus/SLF</b>. Supports repetition, phonological working memory and new word-form learning.',
      '<b>Ventral stream</b> (sound → meaning): mid/posterior MTG → anterior temporal lobe → pars triangularis/orbitalis (BA 45/47), via <b>IFOF, ILF, extreme capsule and uncinate</b>. Supports comprehension and lexical-semantic access.',
      'Reading adds the <b>visual word form area</b> (left occipitotemporal sulcus) feeding both streams; writing adds Exner’s area in superior premotor cortex.',
      'Subcortical contributions are real: left caudate and thalamus participate in language selection and switching — hence thalamic and striatal aphasias, and the basal-ganglia basis of bilingual language control.'
    ],
    cyto: ['Leftward asymmetries in planum temporale surface area, layer III pyramidal size, intracortical myelin and arcuate fibre count; several are present at birth, so they cannot be simple consequences of language use.'],
    circuit: [
      { dir: 'Afferent', txt: 'Auditory (MGN → A1 → belt), visual (V1 → VWFA) and somatosensory input (sign language, articulatory feedback), plus prefrontal predictive signals.' },
      { dir: 'Efferent', txt: 'Motor cortex face/larynx/tongue representation and corticobulbar tract; cerebellum via cortico-ponto-cerebellar loops for speech timing; basal ganglia for selection and initiation.' },
      { dir: 'Loop', txt: 'Predictive coding: frontal and temporal cortex generate expectations that reduce responses to predictable input — the mechanism behind cloze-probability effects on N400 amplitude and on reading eye movements.' }
    ],
    fn: [
      '<b>Levels of representation</b> to keep separate in any design: phonetic → phonological → lexical → morphosyntactic → semantic → pragmatic/discourse. Most deficits and most effects sit at one or two levels, and instruments that collapse them are uninterpretable.',
      '<b>Comprehension</b> is incremental and predictive: commitments are made before the sentence ends, which is why garden-path sentences disrupt processing exactly at the disambiguating word.',
      '<b>Production</b> (Levelt): conceptualisation → lemma selection → morphological and phonological encoding → articulation. Naming latencies and speech-error patterns map onto these stages; tip-of-the-tongue states are a lemma/phonology dissociation.',
      '<b>Bilingualism</b> recruits domain-general control (ACC, prefrontal, caudate) for selection. The "bilingual advantage" in executive function is a contested literature whose effect sizes shrank with pre-registration and larger samples — a useful case study in publication bias.'
    ],
    chem: ['Dopaminergic modulation of lexical selection (levodopa has been trialled in aphasia rehabilitation). That this system is defined connectionally rather than chemically is itself informative.'],
    clinic: [
      '<b>Classical aphasia taxonomy</b> (fluency × comprehension × repetition): Broca, Wernicke, conduction, transcortical motor/sensory, global, anomic — clinically useful while neuroanatomically approximate.',
      '<b>Primary progressive aphasia variants</b> (Gorno-Tempini criteria): non-fluent/agrammatic (left IFG, tau), semantic (left ATL, TDP-43), logopenic (left temporoparietal, usually Alzheimer pathology). The classification predicts pathology.',
      '<b>Developmental disorders:</b> dyslexia (phonological deficit, left occipitotemporal and arcuate involvement), developmental language disorder, stuttering (basal-ganglia timing plus reduced left arcuate integrity).',
      '<b>Formal thought disorder</b> is quantifiable with psycholinguistic tools: reduced referential cohesion, increased semantic distance between successive words, lower syntactic complexity. Computational language analysis of speech now predicts psychosis onset in clinical high-risk cohorts — arguably the most promising quantitative measure in clinical psychology today.'
    ],
    tests: [
      ['Lexical decision, semantic priming, picture naming (RT)', 'Millisecond-resolution access measures. Control and report log frequency, length, neighbourhood density, age of acquisition, imageability and concreteness — they account for most RT variance.'],
      ['Eye-tracking during reading', 'First-fixation and gaze duration index early lexical access; regression-path and total time index integration difficulty. The most ecologically valid online measure available.'],
      ['ERP components', '<b>N400</b> lexical-semantic access · <b>P600</b> syntactic reanalysis · <b>ELAN/LAN</b> early morphosyntax (contested) · <b>MMN</b> pre-attentive phonological discrimination · <b>N170</b> orthographic tuning.'],
      ['Self-paced reading, maze task, cross-modal priming', 'Sentence-processing time course without an eye tracker.'],
      ['Standardised batteries', 'WAB-R (AQ), BDAE-3, CAT and PALPA for componential analysis; TROG and CELF for developmental syntax; BNT and fluency for lexical access.'],
      ['Corpus and computational measures', 'Type–token ratio, MLU, idea density, embedding-based coherence, syntactic complexity — increasingly the most sensitive markers of thought disorder and prodromal decline.']
    ],
    caution: 'Two points decide whether psycholinguistic data replicate. <b>(1) Item variance is not error.</b> Analyse with mixed-effects models including crossed random intercepts (and justified slopes) for participants <em>and</em> items — the language-as-fixed-effect fallacy (Clark, 1973; Baayen et al., 2008; Barr et al., 2013) badly inflates Type I error. <b>(2) Do not transform RTs to chase normality</b> — log transformation can create or mask interactions; prefer GLMMs with a Gamma/inverse-Gaussian family, or model the distribution with drift-diffusion (Lo & Andrews, 2015; Ratcliff).<br><br>For multilingual work in India: match participants on language history (AoA, proficiency, dominance, context of use) with an instrument such as the LEAP-Q, and do not assume script-transparent orthographies behave like English. Akshara-based systems (Bengali, Devanagari) have a different grain size, so phonological-awareness measures must be built at the level the script actually encodes.',
    nums: [
      ['≈ 400 ms', 'N400 peak', 'Amplitude scales inversely with cloze probability.'],
      ['200–250 ms', 'gaze duration in reading', 'Skilled adults; 10–15 % of words receive a regression.'],
      ['≈ 150 ms', 'onset of lexical frequency effects', 'From MEG/ERP — the earliest reliable index of lexical access.'],
      ['≈ 60 000', 'receptive vocabulary', 'Educated adult; a naming test samples about 1 in 1 000 of these items.']
    ],
    refs: [
      'Hickok G & Poeppel D (2007). The cortical organization of speech processing. <em>Nat Rev Neurosci</em>.',
      'Kutas M & Federmeier KD (2011). Thirty years and counting: finding meaning in the N400. <em>Annu Rev Psychol</em>.',
      'Friederici AD (2011). The brain basis of language processing. <em>Physiol Rev</em>.',
      'Barr DJ, Levy R, Scheepers C & Tily HJ (2013). Random effects structure for confirmatory hypothesis testing. <em>J Mem Lang</em>.',
      'Gorno-Tempini ML et al. (2011). Classification of primary progressive aphasia. <em>Neurology</em>.'
    ]
  });

  add({
    id: 'dmn', name: 'Default mode network', latin: '—', group: 'Systems',
    ba: 'mPFC · PCC/precuneus · angular gyrus · MTL', mesh: null,
    nodes: ['vmpfc', 'precuneus', 'ipl', 'hippocampus', 'atl'],
    tag: 'The network that engages when nothing is asked of you — self-projection, memory, and the narrative construction of a self in time.',
    anatomy: ['Medial prefrontal cortex (vmPFC and pregenual ACC), posterior cingulate/precuneus, bilateral angular gyri, lateral temporal cortex and the medial temporal lobe. Subdivides into a <b>medial temporal</b> (memory-based construction) and a <b>dorsomedial</b> (mentalising) subsystem sharing a midline core (Andrews-Hanna).'],
    cyto: ['Heteromodal and paralimbic cortex sitting at maximal geodesic distance from primary sensory areas — the apex of the cortical hierarchy in connectivity-gradient analyses (Margulies).'],
    circuit: [
      { dir: 'Loop', txt: 'Anticorrelated with dorsal attention and frontoparietal networks: task engagement deactivates the DMN, and failure to deactivate predicts errors and attentional lapses. The salience network mediates the switch.' }
    ],
    fn: [
      '<b>Self-projection:</b> autobiographical memory, prospection, theory of mind and scene construction all recruit it — the common element is simulating experience not present in the environment (Buckner & Carroll).',
      '<b>Spontaneous thought and mind-wandering</b>, including its costs: DMN activity precedes lapses, and its connectivity tracks rumination.',
      'Not simply "task-negative": the DMN is active during internally directed tasks, semantic processing and memory-guided decisions.'
    ],
    chem: ['Connectivity is reduced by psilocybin and ketamine (ego dissolution correlates with PCC decoupling), modulated by cholinergic and dopaminergic state, and disrupted early in Alzheimer’s disease.'],
    clinic: [
      '<b>Depression:</b> DMN hyperconnectivity — particularly subgenual ACC–PCC — correlates with rumination; the most consistent functional-connectivity finding in the disorder.',
      '<b>Alzheimer’s disease:</b> amyloid deposition follows DMN topography, a striking pathology–network alignment.',
      '<b>Schizophrenia:</b> reduced task-related DMN suppression and poor segregation from task networks, linked to source-monitoring failure.',
      '<b>Disorders of consciousness:</b> DMN integrity is among the better predictors of covert awareness and recovery.'
    ],
    tests: [
      ['Resting-state fMRI connectivity', 'Needs ≥ 10 min of data and strict motion control for even moderate individual-level reliability.'],
      ['Thought-sampling probes, SART', 'Behavioural analogue; report probe-caught and self-caught rates separately.'],
      ['Ruminative Response Scale, PTQ', 'Brooding subscale carries the pathological variance.'],
      ['Autobiographical Interview, future-thinking tasks', 'Self-projection with objective scoring.']
    ],
    caution: 'Resting-state connectivity has a reliability problem that directly limits individual-differences work: with typical 5–10 minute scans, edge-level ICCs run about 0.3–0.5. Relating connectivity to behaviour therefore needs either very long scans (precision fMRI) or very large samples (Marek et al., 2022) — small-sample brain–behaviour correlations in this literature were substantially inflated.',
    nums: [
      ['≈ 20 %', 'of resting energy budget', 'Most of the brain’s metabolism is intrinsic, not task-evoked.'],
      ['ICC 0.3–0.5', 'reliability of typical rs-fMRI edges', 'The limiting factor for individual inference.'],
      ['2001', 'DMN named', 'Raichle et al., <em>PNAS</em>, from PET oxygen-extraction data.']
    ],
    refs: [
      'Raichle ME et al. (2001). A default mode of brain function. <em>PNAS</em>.',
      'Buckner RL, Andrews-Hanna JR & Schacter DL (2008). The brain’s default network. <em>Ann NY Acad Sci</em>.',
      'Marek S et al. (2022). Reproducible brain-wide association studies require thousands of individuals. <em>Nature</em>.'
    ]
  });

  add({
    id: 'control', name: 'Attention & control networks', latin: '—', group: 'Systems',
    ba: 'dlPFC · IPS · FEF · dACC · AI · TPJ', mesh: null,
    nodes: ['dlpfc', 'parietal', 'fef', 'cingulate', 'insula', 'ipl'],
    tag: 'Three dissociable systems — alerting, orienting, executive control — with a salience network deciding which one gets the brain.',
    anatomy: [
      '<b>Dorsal attention network:</b> frontal eye fields + intraparietal sulcus/superior parietal lobule — top-down goal-driven orienting with retinotopic priority maps.',
      '<b>Ventral attention network:</b> temporoparietal junction + ventral frontal cortex, right-lateralised — stimulus-driven reorienting ("circuit breaker"); its damage causes neglect.',
      '<b>Frontoparietal control network:</b> mid-DLPFC + anterior inferior parietal lobule — flexible task-set implementation, sitting between DMN and dorsal attention network in connectivity space, which is why it acts as a switchboard.',
      '<b>Salience / cingulo-opercular:</b> anterior insula + dorsal ACC — event detection, network switching and tonic alertness across a task.'
    ],
    cyto: ['Heteromodal association cortex; the anterior insula/dACC pair uniquely contains von Economo neurons, possibly supporting the rapid long-range signalling that switching requires.'],
    circuit: [
      { dir: 'Loop', txt: 'Posner’s three systems map onto distinct chemistry: <b>alerting</b> — noradrenergic (locus coeruleus); <b>orienting</b> — cholinergic (basal forebrain, superior colliculus, pulvinar); <b>executive control</b> — dopaminergic (ACC and prefrontal cortex). This is the theoretical basis of the Attention Network Test.' }
    ],
    fn: [
      '<b>Alerting:</b> readiness — phasic (warning cues) and tonic (vigilance decrement over minutes).',
      '<b>Orienting:</b> selection across space and time, covert or overt — including disengagement, the operation that fails in neglect.',
      '<b>Executive control:</b> conflict resolution, response inhibition, task switching — the "common EF" factor of latent-variable models.',
      '<b>Capacity limits:</b> visual working memory holds ~3–4 objects (Luck & Vogel); it is filtering efficiency rather than raw capacity that correlates with fluid intelligence.'
    ],
    chem: ['Methylphenidate and amphetamine raise prefrontal and parietal catecholamines along an inverted U; atomoxetine acts on NET, guanfacine on prefrontal α2A. Cholinergic agents improve orienting specifically.'],
    clinic: [
      '<b>ADHD:</b> the most robust cognitive findings are raised reaction-time variability, impaired stop-signal inhibition and delay aversion — not a unitary "attention deficit". Effect sizes are moderate (d ≈ 0.4–0.6), so cognitive testing characterises rather than diagnoses.',
      '<b>Neglect:</b> right TPJ/ventral attention and superior temporal damage; prognostically worse than hemiparesis for functional outcome and frequently undetected without formal testing.',
      '<b>Delirium:</b> a whole-system attentional failure — inattention is the cardinal feature, operationalised by the CAM-ICU and 4AT.',
      '<b>Schizophrenia:</b> reduced cingulo-opercular and frontoparietal integrity with elevated RT variability.'
    ],
    tests: [
      ['Attention Network Test (Fan & Posner)', 'Separate alerting, orienting and conflict scores from one task — elegant, but the three difference scores have known reliability limits; report reliability in your own sample.'],
      ['CPT-3 / TOVA / SART', 'Sustained attention; RT variability and commission errors carry more information than omissions.'],
      ['Change-detection visual WM tasks', 'Capacity via Cowan’s k or a mixture model — genuinely interval-scaled cognition.'],
      ['Stop-signal (SSRT), task switching, flanker', 'Inhibition and shifting; use trial-level modelling rather than difference scores.'],
      ['Behavioural Inattention Test, line bisection, cancellation', 'Neglect — mandatory in every right-hemisphere assessment.'],
      ['Latent-variable modelling of an EF battery', 'The methodologically correct approach: ≥ 3 indicators per construct, extracting common EF plus specific factors (Miyake & Friedman), since no single task is pure.']
    ],
    caution: 'This is where psychometric training is decisive. Executive and attention tasks were built to maximise <em>experimental</em> effects — low between-subject variance, large within-subject effects — which is the opposite of what a good individual-difference measure needs. Consequences: poor test–retest reliability of difference scores, attenuated correlations, non-replicable brain–behaviour associations. Remedies: latent factors from multiple indicators, hierarchical trial-level estimation, reliability reported for every derived score, and process-model parameters (drift rate, boundary, learning rate) in place of raw contrasts.',
    nums: [
      ['3–4 objects', 'visual working-memory capacity', 'Cowan’s k; filtering efficiency predicts fluid intelligence better than capacity itself.'],
      ['d ≈ 0.4–0.6', 'ADHD cognitive effect sizes', 'Group-level, with 70–80 % distribution overlap.'],
      ['≈ 200 ms', 'stop-signal reaction time', 'The covert latency of the stopping process.']
    ],
    refs: [
      'Posner MI & Petersen SE (1990). The attention system of the human brain. <em>Annu Rev Neurosci</em>.',
      'Corbetta M & Shulman GL (2002). <em>Nat Rev Neurosci</em>.',
      'Friedman NP & Miyake A (2017). Unity and diversity of executive functions. <em>Cortex</em>.',
      'Vogel EK & Machizawa MG (2004). Neural activity predicts individual differences in visual working memory capacity. <em>Nature</em>.'
    ]
  });

  add({
    id: 'limbic', name: 'Limbic circuits — memory, emotion, stress', latin: 'Circuitus limbicus', group: 'Systems',
    ba: '—', mesh: null,
    nodes: ['hippocampus', 'fornix', 'thalamus', 'cingulate', 'amygdala', 'hypothalamus', 'vmpfc'],
    tag: 'Papez’s circuit, MacLean’s limbic system, and what survived of both — three interlocking loops for memory, affect and physiological regulation.',
    anatomy: [
      '<b>Papez circuit (memory):</b> hippocampus → fornix → mammillary bodies → mammillothalamic tract → anterior thalamic nuclei → cingulate cortex → cingulum → parahippocampal/entorhinal cortex → hippocampus.',
      '<b>Amygdalar circuit (affect):</b> amygdala ↔ mediodorsal thalamus ↔ orbitofrontal/vmPFC, with outputs via stria terminalis and the ventral amygdalofugal pathway to hypothalamus and brainstem.',
      '<b>Stress axis:</b> amygdala/vmPFC → PVN → pituitary → adrenal, with hippocampal negative feedback.',
      'The umbrella term "limbic system" is anatomically loose, and MacLean’s triune-brain framing is now regarded as incorrect evolutionary neuroanatomy — all vertebrate brains share the same basic divisions. Name the circuit instead.'
    ],
    cyto: ['Allocortex and periallocortex with high glucocorticoid, mineralocorticoid, oxytocin, vasopressin and CRH receptor density — the molecular substrate of experience-dependent structural plasticity.'],
    circuit: [
      { dir: 'Principle', txt: '<b>Systems consolidation:</b> hippocampal encoding → sharp-wave-ripple replay in slow-wave sleep → gradual neocortical independence over weeks to years. This predicts the temporal gradient of retrograde amnesia (Ribot’s law).' },
      { dir: 'Principle', txt: '<b>Reconsolidation:</b> retrieval returns a memory to a labile, protein-synthesis-dependent state, opening a therapeutic window — the basis of propranolol and behavioural-interference studies in PTSD. The effect is real but boundary-condition-dependent, and clinical translation is unsettled.' },
      { dir: 'Principle', txt: '<b>Allostatic load:</b> repeated stress-axis activation carries cumulative cost — hippocampal and prefrontal dendritic retraction with amygdalar hypertrophy, measurable as multi-system biomarker burden (McEwen; Seeman).' }
    ],
    fn: [
      '<b>Memory taxonomy</b> worth carrying in your head: <em>declarative</em> (episodic — hippocampal; semantic — anterior temporal) vs <em>non-declarative</em> (procedural — striatum/cerebellum; classical conditioning — amygdala for emotional, cerebellum for motor; priming — neocortex; habituation). Each dissociates from the others in patients, which is the strongest evidence for multiple memory systems.',
      '<b>Emotion</b> is not localised to a limbic system: appraisal (OFC/vmPFC), interoception (insula), threat learning (amygdala), physiological expression (hypothalamus/brainstem) and conscious feeling (widespread) are separable components. Constructionist (Barrett) and basic-emotion (Ekman, Panksepp) accounts disagree about how they assemble — the anatomy is agreed, the psychology is not.'
    ],
    chem: ['Cortisol (MR: high-affinity, tonic, permissive; GR: low-affinity, occupied at stress peaks, mediating feedback and damage), noradrenaline (consolidation), oxytocin (social salience), CRH, and endocannabinoids (habituation and forgetting of aversive memories).'],
    clinic: [
      '<b>PTSD:</b> amygdala hyperreactivity, vmPFC hypoactivity, reduced hippocampal volume, impaired extinction retention with intact fear learning — an integrated circuit account with direct treatment implications (exposure is extinction learning, so context and renewal matter).',
      '<b>Depression:</b> amygdala reactivity to negative material, subgenual ACC hyperactivity, HPA dysregulation, hippocampal volume loss with recurrence.',
      '<b>Korsakoff vs Alzheimer:</b> the same circuit attacked at different nodes (diencephalic vs hippocampal/entorhinal), producing distinguishable amnesias — diencephalic damage impairs temporal order and source disproportionately.',
      '<b>Early-life adversity</b> is associated with amygdala–prefrontal connectivity differences and altered HPA reactivity; effect sizes are modest and mediation unestablished, so avoid deterministic language in formulations.'
    ],
    tests: [
      ['Fear conditioning / extinction / extinction retention (SCR, startle)', 'The most translational paradigm in clinical neuroscience; report conditioning success separately — non-learners must be handled explicitly, not silently dropped.'],
      ['List learning with delayed recall and recognition (RAVLT, CVLT-II)', 'Recognition d′ separates storage from retrieval.'],
      ['FCSRT with controlled encoding', 'Identifies the hippocampal amnestic profile specifically.'],
      ['Autobiographical Memory Test (cue-word specificity)', 'Overgeneral autobiographical memory — a replicated marker in depression and suicidality.'],
      ['Trier Social Stress Test, cortisol series, HRV', 'Stress reactivity across endocrine and autonomic channels.'],
      ['ACE / CTQ (childhood adversity)', 'Retrospective self-report — note recall bias and weak agreement with prospective records (Baldwin et al., 2019).']
    ],
    caution: 'Retrospective and prospective measures of childhood adversity agree only weakly (κ ≈ 0.3) and predict different outcomes. If adversity is a variable in your research or formulation, specify which kind of measurement it is and what that licenses you to claim — this is a measurement-validity problem, not a footnote.',
    nums: [
      ['κ ≈ 0.3', 'retrospective vs prospective adversity agreement', 'Baldwin et al. (2019), <em>JAMA Psychiatry</em> — not interchangeable constructs.'],
      ['weeks–years', 'systems consolidation timescale', 'Producing Ribot’s temporally graded retrograde amnesia.'],
      ['MR vs GR', 'two corticosteroid receptors', 'Tonic/permissive vs stress-peak/feedback — the basis of the inverted-U of stress on memory.']
    ],
    refs: [
      'Papez JW (1937). A proposed mechanism of emotion. <em>Arch Neurol Psychiatry</em>.',
      'Squire LR & Zola SM (1996). Structure and function of declarative and nondeclarative memory systems. <em>PNAS</em>.',
      'McEwen BS (2007). Physiology and neurobiology of stress and adaptation. <em>Physiol Rev</em>.',
      'Baldwin JR et al. (2019). Agreement between prospective and retrospective measures of childhood maltreatment. <em>JAMA Psychiatry</em>.'
    ]
  });

  add({
    id: 'loops', name: 'Cortico-striato-thalamo-cortical loops', latin: '—', group: 'Systems',
    ba: '—', mesh: null,
    nodes: ['dlpfc', 'ofc', 'cingulate', 'striatum', 'pallidum', 'thalamus', 'accumbens', 'dopamine'],
    tag: 'One circuit motif, five times over — the architecture that explains why movement disorders carry psychiatric symptoms and psychiatric disorders carry motor signs.',
    anatomy: [
      'Each loop runs <b>cortex → striatum → pallidum/SNr → thalamus → back to the same cortex</b>, segregated throughout. The five canonical loops (Alexander, DeLong & Strick, 1986): motor (M1/SMA–putamen), oculomotor (FEF–caudate body), dorsolateral prefrontal (DLPFC–dorsolateral caudate), lateral orbitofrontal (OFC–ventromedial caudate), anterior cingulate/limbic (ACC–ventral striatum).',
      'Three pathways within each: <b>direct</b> (D1, facilitatory), <b>indirect</b> (D2 → GPe → STN, suppressive), <b>hyperdirect</b> (cortex → STN, rapid global braking).'
    ],
    cyto: ['GABAergic striatal and pallidal projections with glutamatergic cortical and STN input, dopaminergically modulated at the striatal level — the point of action of every antipsychotic and every antiparkinsonian drug.'],
    circuit: [
      { dir: 'Principle', txt: 'Signal flow is <b>disinhibition</b>: tonically firing GPi/SNr neurons inhibit thalamus; the direct pathway pauses that inhibition to release a selected program while the indirect pathway suppresses competitors.' },
      { dir: 'Principle', txt: 'Loops are <b>open as well as closed</b>: ventral-to-dorsal "spiralling" dopaminergic connections let limbic loops influence motor loops — the proposed route by which motivated action becomes habit, and voluntary drug use becomes compulsive.' }
    ],
    fn: [
      '<b>Action selection, gating and reinforcement</b>, generalised from movement to thought: the same circuit selects a motor program, a saccade, a rule, a valuation or an emotional response depending on the cortical sector it serves.',
      '<b>Working-memory gating:</b> basal-ganglia signals determine what enters and is protected in prefrontal working memory (Frank & O’Reilly) — a mechanistic account of updating as distinct from maintenance.'
    ],
    chem: ['Dopamine implements opponent learning: D1/"go" learning from positive prediction errors, D2/"no-go" learning from negative ones. This predicts that dopamine agonists improve learning from reward while impairing learning from punishment — observed in Parkinson’s disease on versus off medication.'],
    clinic: [
      '<b>OCD:</b> orbitofrontal–caudate loop hyperactivity with failure of the "task completed" signal; SSRI, CBT, capsulotomy and DBS all normalise it.',
      '<b>Tourette syndrome:</b> striatal interneuron loss with disinhibited motor/limbic loops; tics follow a premonitory urge, which is why habit-reversal therapy works.',
      '<b>Parkinson’s disease:</b> indirect-pathway dominance → hypokinesia; dyskinesia is the opposite imbalance. Apathy, depression and impulse-control disorders are loop-based, not merely reactive.',
      '<b>Huntington’s disease:</b> early indirect-pathway loss → chorea, with a psychiatric prodrome (irritability, apathy, obsessionality) preceding motor onset.',
      '<b>Schizophrenia:</b> associative-striatal dopamine excess within the executive loop. <b>Catatonia:</b> a loop-level motor-affective syndrome responsive to benzodiazepines and ECT.'
    ],
    tests: [
      ['Probabilistic selection task with reward/punishment learning split', 'Dissociates D1-go from D2-no-go learning; sensitive to dopaminergic state.'],
      ['Set-shifting (IED/WCST) versus reversal learning', 'Dorsolateral versus orbitofrontal loop — administering both is what makes the localisation argument.'],
      ['Y-BOCS, YGTSS, UPDRS, AIMS, BFCRS', 'Loop-specific clinical scales; the Bush–Francis Catatonia Rating Scale detects catatonia missed in roughly 10 % of acute psychiatric admissions.'],
      ['Premonitory Urge for Tics Scale', 'Quantifies the sensory component patients report as primary.'],
      ['Serial reaction-time task', 'Loop integrity independent of declarative memory.']
    ],
    nums: [
      ['5', 'parallel loops', 'Alexander, DeLong & Strick (1986) — the single most useful diagram in behavioural neurology.'],
      ['≈ 10 %', 'of acute psychiatric admissions show catatonia', 'Under-detected without a structured scale.'],
      ['25–35 %', 'Y-BOCS reduction = response', 'The conventional trial criterion in OCD.']
    ],
    refs: [
      'Alexander GE, DeLong MR & Strick PL (1986). <em>Annu Rev Neurosci</em>.',
      'Frank MJ, Loughry B & O’Reilly RC (2001). Interactions between frontal cortex and basal ganglia in working memory. <em>Cogn Affect Behav Neurosci</em>.',
      'Haber SN (2003). The primate basal ganglia: parallel and integrative networks. <em>J Chem Neuroanat</em>.'
    ]
  });

  add({
    id: 'psychometrics', name: 'Measurement: from construct to brain', latin: '—', group: 'Systems',
    ba: '—', mesh: null,
    tag: 'The chapter that decides whether any of the rest is usable: what a score means, what it can support, and where brain–behaviour inference breaks.',
    anatomy: [
      '<b>Classical test theory:</b> X = T + E. Reliability is the proportion of observed variance that is true variance, and it bounds validity: r<sub>xy</sub> ≤ √(r<sub>xx</sub>·r<sub>yy</sub>). A measure with reliability 0.60 cannot correlate above about 0.77 with anything, however strong the true relation.',
      '<b>Kinds of reliability to keep distinct:</b> internal consistency (α is a lower bound and often misreported — prefer ω), test–retest (the one that matters for change scores), inter-rater (κ, ICC), split-half. For experimental cognitive tasks use permutation-based split-half or trial-level hierarchical estimates.',
      '<b>Validity</b> in Messick’s sense is a unified argument about score interpretation and use — content, structural, convergent/discriminant, consequential. "The test is valid" cannot be true; "these scores support this inference for this population and purpose" can be.',
      '<b>Structure of ability:</b> CHC theory (g over broad abilities Gf, Gc, Gsm, Glr, Gv, Ga, Gs) is the factor-analytic backbone of the WAIS/WJ family, and the <b>P-FIT</b> model maps Gf onto a parieto-frontal network. Bifactor and network models of psychopathology (p-factor, HiTOP) are the analogous structural debate on the clinical side.'
    ],
    cyto: [
      '<b>Interval-scale measures the brain sciences can actually use:</b> psychophysical thresholds, RT-distribution parameters, ERP latencies, saccade latencies, hormone concentrations, capacity estimates (k), learning rates, drift rates. This is where quantitative psychology and neuroscience genuinely meet.',
      '<b>IRT</b> (1PL/2PL/GRM) buys item-free ability estimation, precision that varies with ability level (information functions), computer-adaptive testing, and DIF analysis across languages — the last being essential for multilingual Indian samples.'
    ],
    circuit: [
      { dir: 'Practice', txt: '<b>Reliable change.</b> To claim a patient changed, use an RCI or standardised-regression-based change score incorporating SEM, practice effects and regression to the mean — not the raw difference. SEM = SD·√(1 − r<sub>xx</sub>); the 90 % CI for a difference is ±1.645·SEM·√2.' },
      { dir: 'Practice', txt: '<b>Base rates of low scores.</b> Administering k correlated tests guarantees some low scores in healthy people: in a 20-test battery, two or more scores below the 5th percentile is normal. Consult multivariate base-rate tables (Crawford; Binder, Iverson & Emmert) before calling a profile impaired.' },
      { dir: 'Practice', txt: '<b>Performance validity.</b> Embedded and standalone PVTs (reliable digit span, TOMM, forced-choice recognition) are a precondition for interpreting any score, especially where compensation or benefits are at stake. Report which were used and at what cut-off.' },
      { dir: 'Practice', txt: '<b>Norms.</b> Demographically corrected norms reduce bias, but Western norms transported to Indian samples systematically over-diagnose impairment. Prefer locally standardised instruments (the NIMHANS neuropsychology battery; Indian adaptations of ACE-III and ADAS-Cog) and state the norm source for every score.' }
    ],
    fn: [
      '<b>Design rules for brain–behaviour work.</b> (1) Power for the effect you expect, not the one you hope for — brain-wide association effects are typically r < 0.2. (2) Pre-register component, window, ROI and model. (3) Report effect sizes with intervals, not only p. (4) Model participants and items as crossed random effects. (5) Check parameter recovery for any computational model. (6) Separate exploratory from confirmatory analysis explicitly.',
      '<b>The reliability paradox.</b> Tasks optimised for large within-subject effects (Stroop, flanker, dot-probe, IAT) minimise the between-subject variance individual-difference research needs — robust experimental paradigms therefore make poor correlational measures (Hedge, Powell & Sumner, 2018). Fix with hierarchical estimation, many trials, or latent aggregation.',
      '<b>Group-to-individual inference.</b> d = 0.5 implies about 69 % distribution overlap and AUC ≈ 0.64 — informative about mechanism, near-useless for classification. Diagnostic claims need sensitivity, specificity, likelihood ratios and a stated base rate.'
    ],
    chem: ['—'],
    clinic: [
      '<b>A report that survives scrutiny</b> states: the referral question; the moderators (test language, education, sensory status, medication, effort); the norm sources; the pattern with confidence intervals; the alternative explanations considered; and what would change the conclusion. A localising claim needs converging evidence from at least two independent measures.',
      '<b>Common failure modes:</b> single-score interpretation; no premorbid estimate; treating a screener (MMSE/MoCA) as a battery; missing anticholinergic burden, sleep loss, pain, depression or hearing loss; and applying Western norms unmodified.'
    ],
    tests: [
      ['Factor-analytic battery construction', 'Three or more indicators per latent construct; establish measurement invariance (configural → metric → scalar) before comparing group means.'],
      ['Mixed-effects and hierarchical Bayesian models', 'For trial-level data: shrinkage-stabilised individual estimates with uncertainty — strictly better than one mean per participant.'],
      ['Drift-diffusion / evidence accumulation', 'Decomposes RT and accuracy into drift rate (efficiency), boundary (caution) and non-decision time — three constructs from one task.'],
      ['SPSS / JASP / R workflow', 'ω rather than α, bootstrap CIs, ICC(2,1) for test–retest, DIF via lordif or mirt when comparing language groups.'],
      ['Base-rate and RCI tables', 'Keep them beside the scoring manual — they change conclusions more often than any additional test.']
    ],
    caution: 'The single most useful habit for someone bridging psychometrics and neuroscience: <b>demand the reliability before the correlation</b>. When a paper reports that a connectivity measure, bias score or cortisol index predicts a clinical variable, look first for the test–retest reliability of both measures. If it is not reported, the correlation cannot be evaluated — and in much of this literature it is too low to support the claim being made.',
    nums: [
      ['r ≤ √(r₁r₂)', 'attenuation ceiling', 'Reliability bounds every observable correlation.'],
      ['≥ 2 scores < 5th %ile', 'normal in a 20-test battery', 'Multivariate base rates of low scores.'],
      ['69 %', 'distribution overlap at d = 0.5', 'AUC ≈ 0.64 — mechanism, not diagnosis.'],
      ['n in the thousands', 'for brain-wide association studies', 'Marek et al. (2022), <em>Nature</em>.'],
      ['ICC > 0.75', 'usable for individual inference', 'Below about 0.6, individual-level claims are unsupportable.']
    ],
    refs: [
      'Messick S (1995). Validity of psychological assessment. <em>Am Psychol</em>.',
      'Binder LM, Iverson GL & Emmert BL (2009). To err is human: "abnormal" neuropsychological scores and variability are common in healthy adults. <em>Arch Clin Neuropsychol</em>.',
      'Hedge C, Powell G & Sumner P (2018). The reliability paradox. <em>Behav Res Methods</em>.',
      'Marek S et al. (2022). Reproducible brain-wide association studies require thousands of individuals. <em>Nature</em>.',
      'Lezak MD et al. <em>Neuropsychological Assessment</em> (5th ed.); Strauss, Sherman & Spreen, <em>A Compendium of Neuropsychological Tests</em>.'
    ]
  });

  A.overlays = {
    dmn: { entry: 'dmn', label: 'Default mode network', nodes: ['vmpfc', 'precuneus', 'ipl', 'hippocampus', 'atl'], arcs: [['vmpfc', 'precuneus'], ['precuneus', 'ipl'], ['precuneus', 'hippocampus'], ['vmpfc', 'hippocampus'], ['ipl', 'atl']] },
    sal: { entry: 'control', label: 'Salience network', nodes: ['insula', 'cingulate', 'amygdala', 'thalamus'], arcs: [['insula', 'cingulate'], ['insula', 'amygdala'], ['cingulate', 'thalamus'], ['insula', 'thalamus']] },
    fpn: { entry: 'control', label: 'Frontoparietal control', nodes: ['dlpfc', 'ipl', 'cingulate', 'thalamus'], arcs: [['dlpfc', 'ipl'], ['dlpfc', 'cingulate'], ['dlpfc', 'thalamus']] },
    dan: { entry: 'control', label: 'Dorsal attention', nodes: ['fef', 'parietal', 'occipital'], arcs: [['fef', 'parietal'], ['parietal', 'occipital'], ['fef', 'occipital']] },
    lang: { entry: 'language', label: 'Language network', nodes: ['broca', 'wernicke', 'a1', 'ipl', 'atl', 'fusiform'], arcs: [['a1', 'wernicke'], ['wernicke', 'ipl'], ['ipl', 'broca'], ['wernicke', 'atl'], ['atl', 'broca'], ['fusiform', 'wernicke']] },
    papez: { entry: 'limbic', label: 'Papez circuit', nodes: ['hippocampus', 'thalamus', 'cingulate', 'fornix'], arcs: [['hippocampus', 'fornix'], ['fornix', 'thalamus'], ['thalamus', 'cingulate'], ['cingulate', 'hippocampus']] },
    cstc: { entry: 'loops', label: 'CSTC loops', nodes: ['dlpfc', 'ofc', 'striatum', 'pallidum', 'thalamus'], arcs: [['dlpfc', 'striatum'], ['ofc', 'striatum'], ['striatum', 'pallidum'], ['pallidum', 'thalamus'], ['thalamus', 'dlpfc'], ['thalamus', 'ofc']] },
    reward: { entry: 'accumbens', label: 'Mesolimbic reward', nodes: ['dopamine', 'accumbens', 'vmpfc', 'amygdala', 'hippocampus'], arcs: [['dopamine', 'accumbens'], ['accumbens', 'vmpfc'], ['amygdala', 'accumbens'], ['hippocampus', 'accumbens'], ['dopamine', 'vmpfc']] },
    da: { entry: 'dopamine', label: 'Dopamine pathways', nodes: ['dopamine', 'striatum', 'accumbens', 'dlpfc', 'hypothalamus'], arcs: [['dopamine', 'striatum'], ['dopamine', 'accumbens'], ['dopamine', 'dlpfc'], ['hypothalamus', 'pituitary']] },
    ht: { entry: 'raphe', label: 'Serotonergic system', nodes: ['raphe', 'cingulate', 'amygdala', 'hippocampus', 'ofc', 'hypothalamus'], arcs: [['raphe', 'ofc'], ['raphe', 'amygdala'], ['raphe', 'hippocampus'], ['raphe', 'cingulate'], ['raphe', 'hypothalamus']] },
    ne: { entry: 'lc', label: 'Noradrenergic system', nodes: ['lc', 'dlpfc', 'amygdala', 'hippocampus', 'parietal', 'cerebellum'], arcs: [['lc', 'dlpfc'], ['lc', 'amygdala'], ['lc', 'hippocampus'], ['lc', 'parietal']] },
    ach: { entry: 'basalforebrain', label: 'Cholinergic system', nodes: ['basalforebrain', 'hippocampus', 'frontal', 'parietal', 'amygdala'], arcs: [['basalforebrain', 'hippocampus'], ['basalforebrain', 'frontal'], ['basalforebrain', 'parietal'], ['basalforebrain', 'amygdala']] }
  };

  A.modules = [
    {
      id: 'm1', title: 'Orientation & organising principles',
      aim: 'Acquire the coordinate language and the four principles that make every later structure predictable. Finish able to reason from a lesion site to a spared-and-impaired profile.',
      items: ['orientation', 'frontal', 'parietal', 'temporal', 'occipital'],
      probe: 'Explain why "dorsal" changes meaning between forebrain and brainstem, and why layer IV thickness tells you whether a region is sensory or motor.'
    },
    {
      id: 'm2', title: 'Language & the psycholinguistic brain',
      aim: 'Map the dual-stream architecture onto the tools that resolve it — reaction time, eye movements, ERP components — and onto the aphasia taxonomy.',
      items: ['language', 'a1', 'wernicke', 'broca', 'arcuate', 'ipl', 'atl', 'fusiform'],
      probe: 'A patient has fluent speech, impaired repetition and good comprehension. Name the lesion, the tract, and the two tests that would confirm it.'
    },
    {
      id: 'm3', title: 'Memory systems & the limbic circuits',
      aim: 'Separate the memory systems that dissociate in patients, and learn which psychometric indices identify each pattern.',
      items: ['hippocampus', 'atl', 'fornix', 'thalamus', 'precuneus', 'limbic'],
      probe: 'Distinguish hippocampal from diencephalic amnesia on test data, and state which FCSRT pattern points to early Alzheimer pathology.'
    },
    {
      id: 'm4', title: 'Emotion, stress & motivation',
      aim: 'Trace threat learning, interoception and reward from cell to questionnaire — and learn where the questionnaires fail.',
      items: ['amygdala', 'vmpfc', 'insula', 'hypothalamus', 'accumbens', 'cingulate', 'pituitary'],
      probe: 'Design a study of extinction retention in anxiety: what do you measure, which confounds must you control, and what reliability must your indices have?'
    },
    {
      id: 'm5', title: 'Executive control & attention',
      aim: 'Understand prefrontal organisation and the three attention systems, then confront the reliability paradox in executive measurement.',
      items: ['dlpfc', 'ofc', 'premotor', 'fef', 'control', 'capsule', 'm1', 's1'],
      probe: 'Why can a patient with orbitofrontal damage score in the superior range on D-KEFS? What would you administer instead, and how would you report it?'
    },
    {
      id: 'm6', title: 'Subcortical loops & neuromodulation',
      aim: 'Learn the circuit motif that unifies movement disorders and psychiatric syndromes, plus the four diffuse modulatory systems and their drugs.',
      items: ['striatum', 'pallidum', 'loops', 'dopamine', 'raphe', 'lc', 'basalforebrain'],
      probe: 'Explain why dopamine agonists improve learning from reward while impairing learning from punishment, and how you would test that behaviourally.'
    },
    {
      id: 'm7', title: 'Networks, cerebellum & the rest of the brain',
      aim: 'Move from regions to networks, and cover the structures most often omitted from psychology curricula.',
      items: ['dmn', 'cerebellum', 'midbrain', 'pons', 'medulla', 'ventricles', 'v1', 'cc', 'uncinate'],
      probe: 'A patient has new executive difficulty, flat affect and dysprosodic speech. Which non-cortical structure must you examine before diagnosing a mood disorder?'
    },
    {
      id: 'm8', title: 'Measurement: making the neuroscience usable',
      aim: 'Consolidate the psychometric layer — reliability ceilings, base rates, reliable change, latent-variable design, group-to-individual inference.',
      items: ['psychometrics', 'orientation'],
      probe: 'A paper reports r = 0.45 between a dot-probe bias score and symptom severity in n = 40. List the four things you check before believing it.'
    }
  ];

  A.quiz = [
    { q: 'A patient produces fluent, well-articulated but empty speech with neologisms, cannot follow spoken commands, and seems untroubled by the difficulty. Where is the lesion?', o: ['Posterior left superior temporal gyrus', 'Left inferior frontal gyrus (BA 44/45)', 'Left supramarginal gyrus', 'Right temporoparietal junction'], a: 0, e: 'Wernicke’s aphasia: fluent, paraphasic, impaired comprehension and repetition, with characteristic anosognosia — frequently misdiagnosed as psychosis or delirium in emergency settings.', s: 'wernicke' },
    { q: 'Which test pattern most strongly indicates that a memory deficit is hippocampal (encoding/consolidation) rather than retrieval-based?', o: ['No benefit from cueing on the FCSRT', 'Slow performance on Trail Making A', 'Marked improvement with semantic cues', 'Preserved recognition with poor free recall'], a: 0, e: 'Controlled encoding with cueing is designed for exactly this question: failure to benefit from cues indicates a storage deficit of the amnestic Alzheimer type, while cue benefit indicates retrieval failure typical of subcortical/frontal disorders.', s: 'hippocampus' },
    { q: 'Why does a measure with test–retest reliability of 0.36 make a reported correlation of r = 0.55 implausible?', o: ['The attenuation ceiling √(r₁r₂) bounds the observable correlation', 'Reliability and validity are unrelated', 'Correlations cannot exceed 0.5 in clinical samples', 'The sample must have been too small'], a: 0, e: 'Observed correlations are bounded by √(r₁₁·r₂₂). With reliabilities of 0.36 and even 0.90, the ceiling is about 0.57 — so r = 0.55 would demand a near-perfect true-score relation. Ask this of every bias-score and connectivity finding.', s: 'psychometrics' },
    { q: 'An N400 is larger for "He spread his warm bread with socks" than with "butter". What does the difference index?', o: ['Ease of lexical-semantic access given context', 'Syntactic reanalysis and repair', 'Pre-attentive phonological change detection', 'Orthographic expertise for print'], a: 0, e: 'N400 amplitude scales inversely with cloze probability and contextual fit — a graded measure of semantic access, not a violation detector. P600 indexes syntactic reanalysis, MMN phonological change, N170 orthographic tuning.', s: 'ipl' },
    { q: 'Bilateral medial temporal resection in patient H.M. left which ability intact?', o: ['Mirror-drawing skill learning', 'Recall of the previous day’s events', 'Learning new names', 'Recognising newly met people'], a: 0, e: 'Procedural learning survives medial temporal damage — H.M. improved at mirror drawing while denying having done the task. This dissociation created the modern multiple-memory-systems taxonomy.', s: 'hippocampus' },
    { q: 'Which structure, when damaged bilaterally, abolishes fear conditioning yet leaves CO₂-induced panic fully intact?', o: ['Amygdala', 'Anterior insula', 'Periaqueductal grey', 'Hypothalamus'], a: 0, e: 'Feinstein et al. (2013): patients with bilateral amygdala damage still panic to CO₂ — panic is generated by brainstem chemosensory defence mechanisms rather than requiring the amygdala.', s: 'amygdala' },
    { q: 'A 62-year-old shows progressive anomia and loss of word meaning with fluent grammatical speech and good day-to-day memory. Most likely atrophy site?', o: ['Left anterior temporal lobe', 'Left inferior frontal gyrus', 'Bilateral hippocampi', 'Left temporoparietal junction'], a: 0, e: 'Semantic variant PPA: left ATL atrophy, usually TDP-43. Non-verbal semantic tests (Camel and Cactus, Pyramids and Palm Trees) show the loss is conceptual rather than lexical-retrieval.', s: 'atl' },
    { q: 'Why do Stroop and flanker difference scores show robust experimental effects but poor test–retest reliability?', o: ['Difference scores subtract reliable shared variance, leaving mostly error', 'Participants habituate to conflict', 'They have too few trials by design', 'They are not normally distributed'], a: 0, e: 'The reliability paradox (Hedge, Powell & Sumner, 2018): tasks built to minimise between-subject variance make poor individual-difference measures. Use hierarchical trial-level estimation or process-model parameters instead.', s: 'cingulate' },
    { q: 'Which is the most replicated molecular-imaging finding in schizophrenia?', o: ['Elevated presynaptic dopamine synthesis capacity in the associative striatum', 'Reduced accumbens D2 density', 'Increased cortical serotonin transporter binding', 'Reduced thalamic GABA-A binding'], a: 0, e: 'Presynaptic dopamine dysfunction in the associative (dorsal) — not limbic — striatum is the "final common pathway" of Howes & Kapur’s version III hypothesis.', s: 'dopamine' },
    { q: 'A patient repeats sentences poorly with phonemic paraphasias but comprehends well and speaks fluently. What is implicated?', o: ['Arcuate fasciculus / supramarginal gyrus', 'Uncinate fasciculus', 'Fornix', 'Splenium of the corpus callosum'], a: 0, e: 'Conduction aphasia — a dorsal-stream phonological buffer lesion. Nonword repetition is the purest behavioural probe.', s: 'arcuate' },
    { q: 'In a 20-test battery given to a healthy adult, how many scores below the 5th percentile should be expected?', o: ['Two or more is common', 'Zero, by definition of normality', 'Exactly one', 'None unless effort is poor'], a: 0, e: 'Multivariate base rates of low scores (Binder, Iverson & Emmert, 2009): several "abnormal" scores are normal. Impairment must be argued from a coherent pattern.', s: 'psychometrics' },
    { q: 'Which measure best indexes locus coeruleus tonic arousal in a behavioural laboratory?', o: ['Baseline pupil diameter under controlled luminance', 'Mean reaction time', 'Alpha peak frequency', 'Skin conductance level'], a: 0, e: 'Pupillometry is the standard practical LC-NA proxy: tonic diameter tracks arousal, phasic dilation effort and surprise. Luminance, accommodation, age and medication must be controlled.', s: 'lc' },
    { q: 'Cerebellar lesions produce which cognitive-affective picture?', o: ['Executive dysfunction, visuospatial disorganisation, dysprosody and blunted or disinhibited affect', 'Dense anterograde amnesia', 'Fluent aphasia with anosognosia', 'Isolated procedural learning failure'], a: 0, e: 'Schmahmann’s cerebellar cognitive affective syndrome (1998). Use the CCAS Scale — these patients are often referred to psychiatry first.', s: 'cerebellum' },
    { q: 'Which analysis choice most protects a psycholinguistic reaction-time study from inflated Type I error?', o: ['Crossed random effects for participants and items', 'Log-transforming RTs for normality', 'Averaging over items before ANOVA', 'Excluding RTs beyond 2 SD'], a: 0, e: 'The language-as-fixed-effect fallacy (Clark, 1973): items vary systematically, so both participants and items need random effects (Barr et al., 2013). Log transformation can create or mask interactions (Lo & Andrews, 2015).', s: 'language' },
    { q: 'A ventromedial prefrontal lesion most characteristically impairs:', o: ['Anticipatory autonomic responses before risky choices', 'Digit span', 'Verbal fluency', 'Two-point discrimination'], a: 0, e: 'On the Iowa Gambling Task with skin conductance, vmPFC patients fail to generate anticipatory SCRs before disadvantageous decks despite explicit knowledge — the operationalisation of the somatic-marker hypothesis.', s: 'vmpfc' },
    { q: 'Which diencephalic node’s damage produces the amnesia of Korsakoff syndrome?', o: ['Anterior thalamic nuclei and mammillothalamic tract', 'Pulvinar', 'Subthalamic nucleus', 'Medial geniculate nucleus'], a: 0, e: 'The hippocampal–anterior thalamic axis. Diencephalic amnesia disproportionately impairs temporal order and source memory; Wernicke encephalopathy needs parenteral thiamine before glucose.', s: 'fornix' },
    { q: 'Reduced mismatch negativity in schizophrenia is notable because:', o: ['It is a large, stable, NMDA-dependent pre-attentive marker requiring no task', 'It correlates with positive symptoms only in acute episodes', 'It is specific to first-episode patients', 'It normalises with antipsychotic treatment'], a: 0, e: 'MMN reduction (d ≈ 0.9) is among the largest replicated electrophysiological effects in psychiatry, is NMDA-dependent, requires no task or response, and behaves as a trait marker.', s: 'a1' },
    { q: 'The five parallel CSTC loops explain why:', o: ['A focal striatal lesion can cause a purely cognitive or affective syndrome with no motor sign', 'All basal ganglia lesions cause movement disorders', 'The cerebellum is required for cognition', 'Dopamine acts only on movement'], a: 0, e: 'Functional segregation (Alexander, DeLong & Strick, 1986) yields loop-specific syndromes — caudate stroke causing abulia, orbitofrontal-loop hyperactivity in OCD.', s: 'loops' },
    { q: 'What is the strongest early predictor of reading acquisition across languages?', o: ['Phonological awareness and rapid automatised naming', 'Verbal IQ', 'Visual acuity', 'Working memory span'], a: 0, e: 'Phonological awareness plus RAN outperform general-ability measures. Grain size differs by orthography, so akshara-based scripts need awareness measures built at the level the script encodes.', s: 'fusiform' },
    { q: 'Interoceptive accuracy, sensibility and metacognitive awareness intercorrelate weakly. The implication is:', o: ['Reporting a single "interoception" score is a measurement error', 'The measures are all invalid', 'Self-report should replace task measures', 'The construct is not brain-based'], a: 0, e: 'Construct fractionation (Garfinkel et al., 2015): specify the dimension and the task. The same discipline applies to "impulsivity", "executive function" and "emotion regulation".', s: 'insula' },
    { q: 'Motor signs of Parkinson’s disease appear only after roughly what proportion of SNc dopamine neurons has been lost?', o: ['50–60 %', '10–20 %', '80–90 %', '30–40 %'], a: 0, e: 'With about 70–80 % striatal dopamine depletion at motor onset — hence the long prodrome in which hyposmia, REM sleep behaviour disorder and constipation are detectable.', s: 'dopamine' },
    { q: 'Which lesion produces alexia without agraphia?', o: ['Left occipital cortex plus the splenium of the corpus callosum', 'Left angular gyrus', 'Left inferior frontal gyrus', 'Bilateral fusiform gyri'], a: 0, e: 'Dejerine’s disconnection: visual information cannot reach left language cortex, so patients write fluently then cannot read their own writing. Angular lesions give alexia *with* agraphia.', s: 'cc' },
    { q: 'A patient cannot recognise fear in faces but has normal intelligence and recognises other emotions. Most likely site?', o: ['Bilateral amygdala', 'Right fusiform gyrus', 'Left anterior temporal lobe', 'Orbitofrontal cortex'], a: 0, e: 'Patient S.M. (Urbach–Wiethe disease). The deficit arises partly from failure to fixate the eye region, and is restored when she is instructed to look at the eyes (Adolphs et al., 2005).', s: 'amygdala' },
    { q: 'Which dopaminergic pathway does D2 blockade affect to cause hyperprolactinaemia?', o: ['Tuberoinfundibular', 'Mesolimbic', 'Nigrostriatal', 'Mesocortical'], a: 0, e: 'Arcuate → median eminence dopamine tonically inhibits prolactin. The resulting amenorrhoea, galactorrhoea, sexual dysfunction and bone loss are routinely under-asked-about.', s: 'dopamine' },
    { q: 'Glymphatic clearance of amyloid-β increases most during:', o: ['Slow-wave sleep', 'REM sleep', 'Quiet wakefulness', 'Physical exercise'], a: 0, e: 'Xie et al. (2013): interstitial space expands about 60 % in slow-wave sleep, increasing convective clearance — the mechanistic link between sleep loss and amyloid accumulation, and a confound worth covarying.', s: 'ventricles' },
    { q: 'Which finding showed that smaller hippocampal volume in PTSD is partly a pre-existing vulnerability?', o: ['Monozygotic twin study showing small hippocampi in unexposed co-twins', 'Longitudinal shrinkage after trauma', 'Volume normalisation with SSRIs', 'Correlation of volume with symptom severity'], a: 0, e: 'Gilbertson et al. (2002): trauma-unexposed identical co-twins of PTSD patients also had smaller hippocampi — a design that separates vulnerability from consequence without an experiment.', s: 'hippocampus' },
    { q: 'Which anterior insula/ACC cell type is selectively depleted in behavioural-variant frontotemporal dementia?', o: ['Von Economo neurons', 'Betz cells', 'Purkinje cells', 'Chandelier cells'], a: 0, e: 'Large bipolar projection neurons found only in great apes, cetaceans and elephants; their early loss accompanies loss of social awareness and empathy.', s: 'insula' },
    { q: 'The antisaccade error rate is a strong schizophrenia endophenotype mainly because:', o: ['It is elevated in unaffected first-degree relatives and is heritable and continuous', 'It is diagnostic at the individual level', 'It normalises with antipsychotics', 'It requires no cortical involvement'], a: 0, e: 'Endophenotype criteria: heritable, present in unaffected relatives, state-independent, continuously measurable. Individual-level diagnostic use is not implied.', s: 'fef' },
    { q: 'In a reinforcement-learning study, which step is most often missing and most damaging to interpretation?', o: ['Parameter recovery on simulated data', 'Reporting mean accuracy', 'Counterbalancing stimulus assignment', 'Excluding slow trials'], a: 0, e: 'If parameters cannot be recovered from data simulated with known values, fitted values from real data are uninterpretable. Model comparison and posterior predictive checks belong in the same section.', s: 'striatum' },
    { q: 'A patient is quadriplegic and anarthric but awake with preserved vertical gaze after a ventral pontine infarct. The most important clinical action is:', o: ['Establish a communication channel before any capacity or prognosis judgement', 'Assess depression with observer ratings', 'Withdraw active treatment given the prognosis', 'Administer a standard bedside cognitive screen'], a: 0, e: 'Locked-in syndrome: awareness is intact. Covert awareness also occurs in a minority of apparently unresponsive patients (Owen et al., 2006) — absent motor output is never evidence of absent cognition.', s: 'pons' },
    { q: 'Which cortical layer receives the main thalamic input, and how does its thickness aid localisation?', o: ['Layer IV — thick in primary sensory cortex, absent in primary motor cortex', 'Layer V — thick in sensory cortex', 'Layer II — thick in motor cortex', 'Layer VI — absent in association cortex'], a: 0, e: 'Granularity is the key cytoarchitectonic clue: koniocortex (dense IV) = primary sensory, agranular = motor or limbic, granular = association. BA 4 is the classic agranular motor cortex.', s: 'orientation' },
    { q: 'Acute tryptophan depletion lowers mood in SSRI-remitted patients but not in never-depressed controls. The best interpretation is:', o: ['Serotonin function interacts with vulnerability rather than causing depression directly', 'Depression is a serotonin-deficiency disease', 'Tryptophan depletion is an invalid manipulation', 'SSRIs deplete serotonin'], a: 0, e: 'This dissociation is central evidence against a simple deficiency model and supports the emotional-processing account (Harmer), in which bias shifts precede mood change.', s: 'raphe' },
    { q: 'Which measure isolates the central "clock" component of timing from motor execution?', o: ['Wing–Kristofferson decomposition of tapping variance', 'Mean inter-tap interval', 'Reaction time to a tone', 'Total tapping duration'], a: 0, e: 'Tapping variability decomposes into central-clock and motor-implementation variance — two constructs from one simple task. Cerebellar lesions raise the clock component.', s: 'cerebellum' },
    { q: 'Which language-related structural asymmetry is already present in the neonate?', o: ['Larger left planum temporale', 'Larger right angular gyrus', 'Thicker left corpus callosum', 'Deeper right central sulcus'], a: 0, e: 'Geschwind & Levitsky (1968). Presence at birth means it cannot be a simple consequence of language experience — though it does not by itself prove a causal role.', s: 'temporal' },
    { q: 'For a brain-wide association study relating resting connectivity to a behavioural trait, what sample size does current evidence require?', o: ['Thousands', 'About 30', 'About 100', 'About 300'], a: 0, e: 'Marek et al. (2022): typical effects are r < 0.2, so smaller samples give inflated, non-replicable estimates. The alternative is precision imaging with very long scans in few individuals.', s: 'psychometrics' },
    { q: 'A right-hemisphere stroke patient scores normally on verbal tests but repeatedly leaves food on the left of the plate. The essential test is:', o: ['Line bisection and cancellation', 'Digit span', 'Boston Naming Test', 'RAVLT'], a: 0, e: 'Hemispatial neglect — prognostically worse than hemiparesis for functional outcome, and routinely missed when the battery is verbal. Deviation in millimetres also gives a change-sensitive continuous measure.', s: 'parietal' },
    { q: 'The therapeutic window for antipsychotic D2 occupancy is approximately:', o: ['65–80 %', '20–40 %', '85–95 %', '40–55 %'], a: 0, e: 'Below about 65 % efficacy falls; above about 80 % extrapyramidal effects, dysphoria and secondary negative symptoms rise steeply — a genuinely quantitative dose–response relation.', s: 'striatum' },
    { q: 'Which manipulation best distinguishes automatic from strategic semantic priming?', o: ['Short versus long SOA with a low relatedness proportion', 'Accuracy versus reaction time', 'Words versus nonwords', 'Visual versus auditory presentation'], a: 0, e: 'Short SOA (< 250 ms) with few related pairs isolates automatic access; long SOA with a high relatedness proportion invites expectancy and strategic prediction — a different construct.', s: 'wernicke' },
    { q: 'What is the correct reading of a group difference of d = 0.5 on a candidate biomarker?', o: ['Mechanistically informative, but ~69 % distribution overlap makes it diagnostically useless', 'Clinically diagnostic with good specificity', 'Evidence of causation', 'Equivalent to a correlation of 0.5'], a: 0, e: 'AUC ≈ 0.64. Diagnostic claims need sensitivity, specificity, likelihood ratios and a stated base rate — the group-to-individual error is pervasive in biological psychiatry.', s: 'psychometrics' },
    { q: 'The hyperdirect pathway providing rapid global "braking" runs from:', o: ['Cortex directly to the subthalamic nucleus', 'Striatum to GPi', 'GPe to thalamus', 'Thalamus to cortex'], a: 0, e: 'Right IFG/pre-SMA → STN. Stop-signal reaction time is its behavioural read-out, and STN DBS can increase impulsivity by lowering the decision threshold.', s: 'pallidum' }
  ];

})(window.ATLAS);
