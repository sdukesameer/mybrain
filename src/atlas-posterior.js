/* Posterior cortex: parietal, temporal, occipital, insula, cingulate. */
(function (A) {
  const add = A.add;

  /* ── Parietal ──────────────────────────────────────────────────── */
  add({
    id: 'parietal', name: 'Parietal lobe', latin: 'Lobus parietalis', group: 'Cortex',
    ba: 'BA 1–3, 5, 7, 39, 40, 43', mesh: 'parietal',
    tag: 'Builds the coordinate systems the rest of the brain acts in — body, space, number and, at its inferior margin, symbols.',
    anatomy: [
      'Between the central sulcus and the parieto-occipital sulcus; the <b>postcentral gyrus</b> (BA 3,1,2) is separated from the <b>superior parietal lobule</b> (BA 5, 7) by the postcentral sulcus, and from the <b>inferior parietal lobule</b> (supramarginal BA 40, angular BA 39) by the intraparietal sulcus.',
      'Medial surface: <b>precuneus</b> (BA 7m) — a default-mode hub, and one of the most metabolically active regions at rest.',
      'The intraparietal sulcus contains multiple functional maps (AIP, VIP, LIP, hIP1–3) for grasping, near-space, saccades and numerosity.'
    ],
    cyto: [
      'BA 3b is <b>koniocortex</b>: dense, granular layer IV with thalamic VPL input — the parietal analogue of V1.',
      'Progression from koniocortex → unimodal (BA 1, 2) → heteromodal association cortex (BA 5, 7, 39, 40) is Mesulam’s classic hierarchy; the inferior parietal lobule is the most recently evolved and most delayed-myelinating cortex in humans.'
    ],
    circuit: [
      { dir: 'Afferent', txt: 'Thalamic VPL/VPM (somatosensory), visual dorsal stream from V3/MT, vestibular nuclei, auditory association cortex; reciprocal DLPFC and FEF connections.' },
      { dir: 'Efferent', txt: 'Premotor and motor cortex (visuomotor transformation), superior colliculus, pontine nuclei → cerebellum, hippocampal formation via cingulum and retrosplenial cortex, and the dorsal language stream via arcuate/SLF.' }
    ],
    fn: [
      '<b>Dorsal "how" stream:</b> vision for action — reach, grasp, saccade planning in eye-, head- and body-centred frames (Goodale & Milner).',
      '<b>Spatial attention:</b> right-hemisphere dominant; the superior parietal lobule serves top-down orienting, the temporoparietal junction bottom-up reorienting (Corbetta & Shulman).',
      '<b>Number and magnitude:</b> horizontal IPS hosts an approximate-magnitude code — the "number sense" underlying distance and size effects (Dehaene’s triple-code model).',
      '<b>Body schema and self-location:</b> multisensory integration of proprioception, vision and vestibular signals.'
    ],
    chem: ['Cholinergic modulation of attentional orienting; parietal cortex shows early amyloid deposition and the temporo-parietal hypometabolism pattern that characterises Alzheimer’s disease on FDG-PET.'],
    clinic: [
      '<b>Right parietal:</b> hemispatial neglect (personal, peripersonal, representational), anosognosia, dressing and constructional apraxia, anosodiaphoria.',
      '<b>Left parietal:</b> Gerstmann syndrome (acalculia, agraphia, finger agnosia, left–right disorientation), ideomotor apraxia, conduction aphasia with supramarginal involvement.',
      '<b>Bilateral parieto-occipital:</b> Balint syndrome — simultanagnosia, optic ataxia, ocular apraxia; posterior cortical atrophy presents this way with preserved memory.',
      'Parietal lesion shows what standard batteries most often miss: neglect patients may score normally on verbal tests and fail catastrophically in the world.'
    ],
    tests: [
      ['Line bisection, star/letter cancellation, BIT', 'Neglect severity; score deviation in mm — a continuous measure suited to change scores.'],
      ['Judgment of Line Orientation (Benton)', 'Right parietal visuospatial processing with minimal motor demand.'],
      ['Block Design, WAIS-IV Visual Puzzles, RCFT copy', 'Constructional praxis; copy vs recall dissociates encoding from construction.'],
      ['Finger localisation, right–left orientation, graphaesthesia', 'Classic left-parietal signs — cheap, fast, and rarely administered.'],
      ['Number comparison distance effect, subitising span', 'Quantitative IPS magnitude-code probes; the distance effect slope is an individual-difference measure.'],
      ['Gesture-to-command / imitation (apraxia batteries)', 'Ideomotor praxis; separate transitive from intransitive gestures.']
    ],
    caution: 'Visuospatial indices are among the most confounded by peripheral factors — visual acuity, hemianopia, tremor, hand dominance and speed. Pair every construction task with a low-motor analogue (JLO, matrix reasoning) before attributing failure to parietal cortex, and report whether visual fields and acuity were screened.',
    nums: [
      ['≈ 2 mm²', 'cortex per fingertip mm²', 'Extreme magnification factor for the digits in BA 3b.'],
      ['1.5–2 %', 'of glucose use at rest', 'Precuneus is among the highest resting-metabolism regions — a default-mode signature.']
    ],
    refs: [
      'Corbetta M & Shulman GL (2002). Control of goal-directed and stimulus-driven attention in the brain. <em>Nat Rev Neurosci</em>.',
      'Goodale MA & Milner AD (1992). Separate visual pathways for perception and action. <em>Trends Neurosci</em>.',
      'Dehaene S, Piazza M, Pinel P & Cohen L (2003). Three parietal circuits for number processing. <em>Cogn Neuropsychol</em>.'
    ]
  });

  add({
    id: 's1', name: 'Primary somatosensory cortex (S1)', latin: 'Gyrus postcentralis', group: 'Cortex',
    ba: 'BA 3a, 3b, 1, 2', parent: 'parietal', mesh: 'parietal', marker: [0.66, 0.6, -0.02],
    tag: 'Four adjacent maps of the body, each asking a different question of the same skin.',
    anatomy: ['Four strips in mediolateral sequence within the postcentral gyrus: 3a (muscle spindle), 3b (cutaneous, the principal map), 1 (texture), 2 (deep pressure, joint position, shape).'],
    cyto: ['BA 3b is koniocortical with a dense granular layer IV; areas 1 and 2 are progressively less granular and receive from 3b rather than directly from thalamus.'],
    circuit: [
      { dir: 'Afferent', txt: 'VPL (body) and VPM (face) of the thalamus, carrying the dorsal column–medial lemniscal (discriminative) and spinothalamic (pain/temperature, largely to posterior insula and S2) pathways.' },
      { dir: 'Efferent', txt: 'S2, posterior parietal areas 5 and 7, M1 (sensorimotor loop), and corticofugal projections to dorsal column nuclei that gate one’s own incoming touch.' }
    ],
    fn: ['Somatotopic representation of tactile discrimination, proprioception and stereognosis; plasticity is rapid and use-dependent (Merzenich) — the basis of phantom-limb reorganisation and of sensory-retraining therapy.'],
    chem: ['GABAergic surround inhibition sharpens two-point discrimination; reduced inhibition is one account of tactile hypersensitivity and of dystonic sensory map blurring.'],
    clinic: [
      'Lesion: loss of fine touch, two-point discrimination, position sense and stereognosis contralaterally; crude pain and temperature may persist (insula/S2 route).',
      '<b>Cortical sensory syndrome:</b> astereognosis, agraphaesthesia, loss of two-point discrimination with preserved primary modalities — a localising sign rather than a peripheral pattern.'
    ],
    tests: [
      ['Two-point discrimination, graphaesthesia, stereognosis', 'Cortical sensory function; normative thresholds differ tenfold between fingertip (2–4 mm) and back (>40 mm).'],
      ['Tactile Form Perception, Sensory-Perceptual Exam (HRB)', 'Standardised cortical sensory measures with lateralisation data.']
    ],
    nums: [['2–4 mm', 'fingertip two-point threshold', 'Compare with 40–50 mm on the back — receptor density plus cortical magnification.']],
    refs: ['Kaas JH (1983). What, if anything, is SI? <em>Physiol Rev</em>.']
  });

  add({
    id: 'ipl', name: 'Inferior parietal lobule (angular + supramarginal)', latin: 'Lobulus parietalis inferior', group: 'Cortex',
    ba: 'BA 39 (angular), BA 40 (supramarginal)', parent: 'parietal', mesh: 'parietal', marker: [0.74, 0.34, -0.42],
    tag: 'The cortex where sound, sight and meaning converge — and the reason reading is possible at all.',
    anatomy: [
      'Angular gyrus (BA 39) wraps the end of the superior temporal sulcus; supramarginal gyrus (BA 40) caps the posterior end of the Sylvian fissure.',
      'Geschwind’s "association area of association areas": heteromodal cortex with visual, auditory and somatosensory convergence, strongly leftward asymmetric and late-myelinating.',
      'Angular gyrus is a core default-mode node; its connectivity with anterior temporal and inferior frontal cortex forms the semantic network.'
    ],
    cyto: ['Heteromodal granular cortex, high dendritic complexity; layer III pyramidal cells here have among the largest basal dendritic trees in human cortex (Jacobs & Scheibel).'],
    circuit: [
      { dir: 'Afferent', txt: 'Posterior STS/STG (auditory-language), occipitotemporal visual word form area, S2/area 5, and prefrontal cortex; arcuate fasciculus and SLF III terminate in BA 40.' },
      { dir: 'Efferent', txt: 'Inferior frontal gyrus (dorsal language stream), hippocampal formation via cingulum, anterior temporal lobe via middle longitudinal fasciculus, and premotor cortex.' }
    ],
    fn: [
      '<b>Supramarginal gyrus:</b> phonological short-term store — the neural correlate of the phonological loop’s buffer, and the site whose damage yields conduction aphasia.',
      '<b>Angular gyrus:</b> semantic integration and combinatorial meaning, cross-modal mapping (grapheme→phoneme), arithmetic fact retrieval, and event/conceptual integration.',
      '<b>TPJ (posterior BA 40 / 39 border):</b> ventral attention reorienting and theory-of-mind computations; also multisensory self-location — stimulation here can induce out-of-body experience (Blanke).'
    ],
    chem: ['A region of early tau and amyloid burden; left angular hypometabolism correlates with semantic-memory decline in Alzheimer’s disease.'],
    clinic: [
      '<b>Conduction aphasia:</b> fluent speech, good comprehension, disproportionately impaired repetition with phonemic paraphasias — a working-memory buffer lesion, not a language loss.',
      '<b>Alexia with agraphia</b> (Dejerine) from left angular lesion; <b>alexia without agraphia</b> from left occipital + splenial lesion — the dissociation that founded disconnection neurology.',
      '<b>Gerstmann syndrome</b> localises to the left angular/parietal junction.',
      'Right TPJ damage: extinction, defective reorienting, and impaired mentalising.'
    ],
    tests: [
      ['Nonword repetition, digit span (auditory)', 'Phonological loop capacity — the psycholinguistic workhorse; nonword repetition is the purest buffer measure and is minimally affected by lexical knowledge.'],
      ['Reading aloud: regular vs irregular vs nonwords', 'Dual-route reading model — surface vs phonological dyslexia patterns fall out of this 3-way comparison.'],
      ['Pyramids and Palm Trees, semantic association', 'Semantic integration with low verbal output demand.'],
      ['Arithmetic fact retrieval vs calculation', 'Angular gyrus retrieval vs IPS magnitude computation (Dehaene’s dissociation).'],
      ['N400 amplitude to semantic incongruity', 'Electrophysiological index of semantic integration; peaks ~400 ms, larger for implausible completions — left temporoparietal generators.'],
      ['False-belief / Strange Stories, RMET', 'Theory of mind at right TPJ; watch verbal-ability confounds in RMET.']
    ],
    caution: 'For psycholinguistic work, note that the <b>N400</b> indexes ease of semantic access, not "meaning detection", and its amplitude is sensitive to cloze probability, word frequency, repetition and concreteness — all of which must be matched or covaried. Parametric cloze-probability designs with mixed-effects models (crossed random effects for participants <em>and</em> items, Baayen/Barr) are now the methodological standard; analysing item means with ANOVA inflates Type I error.',
    nums: [
      ['≈ 400 ms', 'N400 peak latency', 'Centro-parietal negativity; amplitude scales inversely with cloze probability.'],
      ['≈ 600 ms', 'P600 peak latency', 'Syntactic reanalysis/repair component; dissociable from N400.'],
      ['2 s', 'phonological loop decay', 'Baddeley’s estimate of unrehearsed trace duration.']
    ],
    refs: [
      'Geschwind N (1965). Disconnexion syndromes in animals and man. <em>Brain</em>.',
      'Kutas M & Federmeier KD (2011). Thirty years and counting: finding meaning in the N400 component. <em>Annu Rev Psychol</em>.',
      'Seghier ML (2013). The angular gyrus: multiple functions and multiple subdivisions. <em>Neuroscientist</em>.'
    ]
  });

  add({
    id: 'precuneus', name: 'Precuneus & retrosplenial cortex', latin: 'Precuneus, cortex retrosplenialis', group: 'Cortex',
    ba: 'BA 7m, 23, 29, 30, 31', parent: 'parietal', mesh: 'cingulate', marker: [0.06, 0.5, -0.72],
    tag: 'The posterior hub of self-projection: remembering, imagining the future, and navigating from a first-person point of view.',
    anatomy: ['Medial parietal cortex between the marginal branch of the cingulate sulcus and the parieto-occipital sulcus; retrosplenial cortex (BA 29/30) curves behind the corpus callosum splenium.'],
    cyto: ['Precuneus is granular heteromodal; retrosplenial cortex is agranular/periallocortical and is functionally part of the hippocampal–diencephalic memory system.'],
    circuit: [
      { dir: 'Afferent', txt: 'Hippocampal formation and parahippocampal cortex via the cingulum, anterior thalamic nuclei, superior parietal cortex, visual areas.' },
      { dir: 'Efferent', txt: 'Anterior thalamus, mammillary bodies (via cingulum), hippocampal formation, medial prefrontal cortex — the posterior arm of the extended limbic circuit.' }
    ],
    fn: [
      '<b>Scene construction and autobiographical retrieval</b>; the retrosplenial cortex translates between egocentric (viewpoint) and allocentric (map) reference frames.',
      'Core node of the <b>default-mode network</b> with highest degree centrality in most graph analyses — the structural reason DMN disruption is such an early marker of Alzheimer’s disease.',
      'Involved in consciousness level: precuneus/posterior cingulate is among the first regions to deactivate in propofol anaesthesia, slow-wave sleep and vegetative states.'
    ],
    chem: ['Very high resting glucose metabolism; the earliest site of amyloid-β deposition and of FDG hypometabolism in preclinical Alzheimer’s disease.'],
    clinic: [
      '<b>Retrosplenial amnesia</b> and topographical disorientation: patients can describe landmarks but cannot derive heading direction.',
      'Posterior cingulate/precuneus hypometabolism is the classic early AD pattern on FDG-PET; DMN connectivity loss precedes symptoms.',
      'Depersonalisation and out-of-body phenomena involve precuneus/TPJ self-location processing.'
    ],
    tests: [
      ['Autobiographical Interview (Levine), AMI', 'Episodic richness scored separately from semantic detail — the right instrument for self-projection deficits.'],
      ['Route learning / map drawing, Four Mountains Test', 'Allocentric scene memory; Four Mountains is sensitive in preclinical AD.'],
      ['RBANS/ACE-III delayed recall, FCSRT', 'Cued-recall (FCSRT) separates encoding failure from retrieval failure — critical in early AD screening.']
    ],
    nums: [['≈ 35 %', 'above mean cortical metabolism', 'Precuneus/PCC resting glucose use.']],
    refs: [
      'Raichle ME et al. (2001). A default mode of brain function. <em>PNAS</em>.',
      'Vann SD, Aggleton JP & Maguire EA (2009). What does the retrosplenial cortex do? <em>Nat Rev Neurosci</em>.'
    ]
  });

  /* ── Temporal ───────────────────────────────────────────────────── */
  add({
    id: 'temporal', name: 'Temporal lobe', latin: 'Lobus temporalis', group: 'Cortex',
    ba: 'BA 20–22, 27, 28, 34–38, 41, 42', mesh: 'temporal',
    tag: 'Hearing, language comprehension, object identity and memory — four functions on one lobe, arranged along two axes.',
    anatomy: [
      'Three lateral gyri (superior, middle, inferior) plus the fusiform and parahippocampal gyri on the ventral surface; the temporal pole (BA 38) is its rostral tip.',
      '<b>Heschl’s gyrus</b> (BA 41/42) lies on the supratemporal plane inside the Sylvian fissure; behind it the <b>planum temporale</b> is markedly larger on the left in ~65 % of brains (Geschwind & Levitsky, 1968) — the first anatomical asymmetry linked to language.',
      'Two processing axes: <b>dorsal→ventral</b> (auditory → multimodal → visual-object) and <b>posterior→anterior</b> (features → increasingly abstract, invariant representations).'
    ],
    cyto: [
      'BA 41 is koniocortical primary auditory cortex; BA 22 unimodal association; BA 20/21/37 heteromodal; entorhinal (28) and perirhinal (35/36) are periallocortex funnelling into the hippocampus.',
      'Tonotopic gradients run mediolaterally across Heschl’s gyrus (high→low frequency).'
    ],
    circuit: [
      { dir: 'Afferent', txt: 'Medial geniculate nucleus → A1; V2/V4 → inferior temporal cortex; amygdala and hippocampus; cholinergic basal forebrain; pulvinar.' },
      { dir: 'Efferent', txt: 'Dorsal stream to inferior frontal cortex via arcuate fasciculus; ventral stream via extreme capsule/uncinate to OFC; entorhinal → hippocampus via perforant path; inferior temporal → amygdala and striatum.' }
    ],
    fn: [
      '<b>Auditory analysis</b> from spectrotemporal features (A1) to speech sounds (mid-STG/STS) and voice identity (anterior STS).',
      '<b>Language comprehension:</b> posterior STG/STS maps sound onto lexical representations; anterior temporal cortex supports combinatorial semantics.',
      '<b>Ventral "what" stream:</b> progressively invariant object, face and word-form representations — the fusiform and occipitotemporal cortex.',
      '<b>Declarative memory:</b> the medial temporal lobe binds cortical representations into retrievable events (see Hippocampal formation).'
    ],
    chem: ['Lowest seizure threshold in the brain — mesial temporal structures generate the commonest focal epilepsy; glutamatergic perforant-path excitation with selective interneuron loss underlies hippocampal sclerosis.'],
    clinic: [
      '<b>Wernicke’s aphasia</b> (posterior left STG): fluent, paraphasic, empty speech with impaired comprehension and repetition, and — clinically important — <em>anosognosia for the deficit</em>.',
      '<b>Semantic dementia</b> (left anterior temporal atrophy): progressive loss of word meaning and object knowledge with fluent speech; <b>right</b> anterior temporal variant presents with prosopagnosia and socio-emotional change.',
      '<b>Temporal lobe epilepsy:</b> auras of fear, déjà vu, epigastric rising, olfactory hallucinations; interictal personality features and post-ictal psychosis.',
      '<b>Bilateral medial temporal damage:</b> dense anterograde amnesia (patient H.M.); <b>bilateral anterior temporal</b>: Klüver–Bucy features.'
    ],
    tests: [
      ['Boston Naming Test, category fluency', 'Lexical-semantic access; naming errors classified as semantic/phonemic/circumlocutory are more diagnostic than the raw score.'],
      ['Token Test, sentence comprehension batteries', 'Receptive syntax, low output demand.'],
      ['RAVLT / CVLT-II / WMS-IV Logical Memory', 'Verbal declarative memory — left temporal; report learning slope, recognition and interference indices, not just total recall.'],
      ['RCFT / WMS-IV Visual Reproduction, Doors test', 'Non-verbal memory — right temporal; these tests are psychometrically weaker, so never diagnose right-temporal dysfunction from one of them.'],
      ['Dichotic listening (REA)', 'Lateralised auditory language processing; right-ear advantage ~70–80 % in right-handers.'],
      ['Camel & Cactus, PPT, word–picture matching', 'Semantic store degradation in SD, separable from retrieval failure.']
    ],
    caution: 'Verbal memory tests are strongly education- and language-dependent, a critical issue for multilingual testing in India: administering an English list-learning task to a Bengali- or Hindi-dominant participant measures language proficiency as much as memory. Use validated adaptations (e.g. the NIMHANS neuropsychology battery, AIIMS/ACE-III translations), report the language of administration and dominance, and treat Western norms as inapplicable without local standardisation.',
    nums: [
      ['≈ 65 %', 'left-larger planum temporale', 'Geschwind & Levitsky (1968); present in the neonate, so it precedes language use.'],
      ['20 Hz–20 kHz', 'A1 tonotopic range', 'Mapped mediolaterally across Heschl’s gyrus.'],
      ['≈ 100 ms', 'speech-sound discrimination (MMN)', 'Mismatch negativity — a pre-attentive auditory index requiring no task.']
    ],
    refs: [
      'Geschwind N & Levitsky W (1968). Human brain: left–right asymmetries in temporal speech region. <em>Science</em>.',
      'Hickok G & Poeppel D (2007). The cortical organization of speech processing. <em>Nat Rev Neurosci</em>.',
      'Patterson K, Nestor PJ & Rogers TT (2007). Where do you know what you know? <em>Nat Rev Neurosci</em>.'
    ]
  });

  add({
    id: 'a1', name: 'Primary auditory cortex & planum temporale', latin: "Gyrus temporalis transversus (Heschl)", group: 'Cortex',
    ba: 'BA 41, 42, 22 (planum)', parent: 'temporal', mesh: 'temporal', marker: [0.82, 0.1, -0.06],
    tag: 'A tonotopic map with millisecond temporal resolution, asymmetric from birth for speech-rate information.',
    anatomy: ['Transverse temporal gyrus on the supratemporal plane; core (A1), belt and parabelt organisation with the planum temporale posteriorly and planum polare anteriorly.'],
    cyto: ['Koniocortex with dense layer IV and heavy MGN input; the left hemisphere has larger, more widely spaced layer III pyramids and thicker myelinated fibres — a microstructural correlate of faster temporal sampling.'],
    circuit: [
      { dir: 'Afferent', txt: 'Medial geniculate nucleus (ventral division → A1) via the auditory radiation; the pathway from cochlea includes cochlear nuclei, superior olivary complex (binaural), inferior colliculus.' },
      { dir: 'Efferent', txt: 'Belt/parabelt → STS/STG, planum temporale → parietal and frontal targets; descending corticofugal control to inferior colliculus and even to the cochlea (olivocochlear) — attention reaching the receptor.' }
    ],
    fn: [
      'Spectrotemporal decomposition; <b>asymmetric sampling in time</b> — left auditory cortex favours short (20–50 ms, phonemic) windows, right favours long (150–250 ms, prosodic/spectral) windows (Poeppel’s AST).',
      'Planum temporale performs "computational hub" spectrotemporal matching and supports auditory–motor mapping for speech and music.'
    ],
    chem: ['MMN generation is NMDA-dependent: ketamine reduces MMN amplitude, which is why MMN is used as a translational biomarker of NMDA hypofunction in schizophrenia research.'],
    clinic: [
      'Unilateral lesion: minimal deficit (bilateral ascending representation); <b>bilateral</b> lesions cause cortical deafness or auditory agnosia.',
      '<b>Pure word deafness:</b> inability to understand speech with intact reading, writing and non-speech sound recognition.',
      'Auditory verbal hallucinations in schizophrenia are associated with reduced left STG volume and with aberrant activation of A1 during hallucination — plus reduced MMN amplitude as a stable trait marker.'
    ],
    tests: [
      ['Mismatch negativity (MMN)', 'Pre-attentive change detection; reduced amplitude is one of the largest and most replicated effect sizes in schizophrenia research (d ≈ 0.9–1.0) and is stable across state.'],
      ['P50 sensory gating (paired-click)', 'Suppression ratio S2/S1; an endophenotype candidate, though reliability is modest — report test–retest before using clinically.'],
      ['Dichotic listening, gap detection, temporal order judgement', 'Temporal-resolution measures relevant to dyslexia and SLI research.'],
      ['Pure-tone audiometry (always first)', 'Peripheral hearing must be screened before any auditory or verbal-memory inference.']
    ],
    caution: 'For ERP work: amplitude measures are highly sensitive to reference choice, filter settings and baseline window. Preregister the component window, use the same montage across groups, and report split-half or intraclass reliability — unreliable components cannot show group differences no matter the sample size.',
    nums: [
      ['d ≈ 0.9', 'MMN reduction in schizophrenia', 'Among the largest, most replicated electrophysiological effect sizes in psychiatry.'],
      ['20–50 ms / 150–250 ms', 'left / right sampling windows', 'Asymmetric sampling in time (Poeppel, 2003).']
    ],
    refs: ['Poeppel D (2003). The analysis of speech in different temporal integration windows. <em>Speech Commun</em>.', 'Näätänen R et al. (2012). The mismatch negativity as an index of cognitive decline. <em>Clin Neurophysiol</em>.']
  });

  add({
    id: 'wernicke', name: "Wernicke's area & posterior STS", latin: 'Area Wernicke, sulcus temporalis superior', group: 'Cortex',
    ba: 'BA 22p, 39/40 border, STS', parent: 'temporal', mesh: 'temporal', marker: [0.8, 0.18, -0.38],
    tag: 'The sound-to-meaning interface — and the point at which the dual-stream model replaces the classical box diagram.',
    anatomy: [
      'Posterior third of the left superior temporal gyrus and the superior temporal sulcus; boundaries differ between authors, which is exactly why lesion–deficit correlations here are inconsistent.',
      'Hickok & Poeppel place the <b>lexical interface</b> in posterior middle/inferior temporal cortex and the <b>sensorimotor interface</b> (Spt) in the Sylvian parieto-temporal region.'
    ],
    cyto: ['Unimodal-to-heteromodal auditory association cortex; leftward asymmetric in cell-packing and in intracortical myelin.'],
    circuit: [
      { dir: 'Afferent', txt: 'A1/belt areas, contralateral temporal cortex via the posterior corpus callosum, prefrontal top-down predictions.' },
      { dir: 'Efferent', txt: 'Dorsal stream: arcuate fasciculus/SLF to inferior frontal and premotor cortex (auditory-motor mapping). Ventral stream: middle/inferior temporal to anterior temporal and inferior frontal cortex (sound-to-meaning).' }
    ],
    fn: [
      '<b>Phonological word-form recognition</b> and mapping onto lexical entries; STS is the site of audiovisual speech integration (the McGurk effect).',
      'Predictive coding: top-down expectations from frontal cortex reduce STG responses to predictable words — the substrate of cloze-probability effects seen in N400 amplitude.',
      'Also supports voice identity, biological motion and — in the right hemisphere — prosody.'
    ],
    chem: ['Reduced left STG grey matter is one of the most consistent structural findings in schizophrenia with auditory hallucinations; low-frequency (inhibitory) rTMS to left TPJ has been trialled for hallucination reduction.'],
    clinic: [
      '<b>Wernicke’s aphasia:</b> fluent paraphasic speech, impaired comprehension and repetition, neologisms, press of speech, and poor awareness — frequently misdiagnosed as psychosis or delirium in emergency settings.',
      '<b>Transcortical sensory aphasia:</b> like Wernicke’s but with preserved repetition (spared dorsal stream, damaged access to semantics).',
      '<b>Logopenic variant PPA:</b> impaired sentence repetition and phonological errors from left temporoparietal atrophy — often an atypical Alzheimer’s pathology.'
    ],
    tests: [
      ['Auditory comprehension subtests (BDAE/WAB), Token Test', 'Comprehension gradient from single word to complex command.'],
      ['Sentence repetition (long, low-probability)', 'The key discriminator of logopenic PPA and conduction aphasia.'],
      ['Lexical decision with priming (semantic vs phonological)', 'Automatic access measured by reaction-time facilitation; separate automatic from strategic effects by varying SOA (<250 ms vs >500 ms) and relatedness proportion.'],
      ['Cross-modal priming, McGurk susceptibility', 'Audiovisual integration at STS; McGurk rates vary hugely by language and by talker — always report stimulus provenance.'],
      ['N400 / P600 to semantic vs syntactic violations', 'The standard dissociation in psycholinguistic ERP designs; use mixed-effects models over items and participants.']
    ],
    caution: 'Reaction-time priming studies need attention to the <b>proportion of related pairs</b> and to <b>nonword ratio</b>: both shift participants from automatic access to strategic prediction, changing the construct being measured. Report SOA, relatedness proportion, and the trimming/transformation rule for RTs (or model them with generalised mixed models on the raw scale — log-transforming to force normality distorts interaction tests, Lo & Andrews, 2015).',
    nums: [
      ['≈ 98 %', 'sensitivity of repetition failure', 'For conduction-type deficits when combined with fluent output.'],
      ['1874', 'Wernicke’s <em>Der aphasische Symptomencomplex</em>', 'Published at age 26; the model is still the scaffold for clinical aphasiology.']
    ],
    refs: [
      'Wernicke C (1874). <em>Der aphasische Symptomencomplex</em>.',
      'Hickok G & Poeppel D (2004, 2007). Dual-stream model of speech processing.',
      'Binder JR (2015). The Wernicke area: modern evidence and a reinterpretation. <em>Neurology</em>.'
    ]
  });

  add({
    id: 'fusiform', name: 'Fusiform & occipitotemporal cortex', latin: 'Gyrus fusiformis (occipitotemporalis lateralis)', group: 'Cortex',
    ba: 'BA 37, 20 (FFA, VWFA, PPA nearby)', parent: 'temporal', mesh: 'temporal', marker: [0.5, -0.5, -0.28],
    tag: 'Category-selective vision: faces on the right, written words on the left, places medially — all built by experience.',
    anatomy: [
      'Between the inferior temporal and collateral sulci; hosts the <b>fusiform face area</b> (mid-fusiform, right-lateralised), the <b>visual word form area</b> (left occipitotemporal sulcus, ~y = −56), and adjacent parahippocampal place area medially.',
      'Positions are remarkably consistent across individuals and across scripts — the "neuronal recycling" argument (Dehaene & Cohen).'
    ],
    cyto: ['Higher-order visual association cortex; large receptive fields, position and size invariance, sensitive to configural rather than featural information.'],
    circuit: [
      { dir: 'Afferent', txt: 'V4 and lateral occipital complex, pulvinar, amygdala (fast emotional modulation of face processing), prefrontal top-down.' },
      { dir: 'Efferent', txt: 'Anterior temporal cortex (identity), amygdala (face affect), perirhinal cortex → hippocampus (memory), and left VWFA → temporoparietal language cortex.' }
    ],
    fn: [
      '<b>FFA:</b> configural face processing — the domain-specific (Kanwisher) vs expertise (Gauthier) debate is still the cleanest case study in cognitive neuroscience methodology.',
      '<b>VWFA:</b> abstract, case- and font-invariant letter-string representation; activation magnitude tracks reading fluency and emerges with literacy.',
      'Category selectivity is graded, not modular: the same voxels carry distributed information decodable by MVPA even for "non-preferred" categories.'
    ],
    chem: ['Not a monoaminergic target of note; clinically relevant as the site of ischaemic damage in posterior cerebral artery territory.'],
    clinic: [
      '<b>Prosopagnosia:</b> right or bilateral fusiform damage (acquired) or developmental variant (~2 % prevalence); covert recognition can persist (autonomic response without report).',
      '<b>Pure alexia (alexia without agraphia):</b> left occipitotemporal/VWFA or splenial disconnection — patients write fluently then cannot read their own writing.',
      '<b>Developmental dyslexia:</b> reduced left occipitotemporal activation and disrupted arcuate/ILF microstructure; the phonological-deficit account still has the strongest evidence base.'
    ],
    tests: [
      ['Benton Facial Recognition, CFMT, CFPT', 'CFMT is the psychometrically best face-memory test (good reliability, published norms) — use it rather than the older Benton, which allows feature matching.'],
      ['Famous faces, Warrington Recognition Memory Test', 'Identity vs perceptual matching dissociation.'],
      ['Word/nonword reading, TOWRE, rapid automatised naming', 'Reading fluency; RAN is the strongest single predictor of reading rate across languages.'],
      ['Visual word N170/N1 (left-lateralised print tuning)', 'Electrophysiological index of orthographic expertise; emerges with literacy and is reduced in dyslexia.'],
      ['Bengali/Devanagari vs Latin script comparisons', 'Script-specific tuning: akshara-based orthographies shift VWFA response profiles — an open research area for Indian-language reading.']
    ],
    caution: 'Face and object tests are strongly affected by <b>own-race/own-group bias</b> and stimulus familiarity; norms built on Caucasian face sets will under-estimate performance in Indian samples. Similarly, reading measures cannot be transported across orthographic depth — English norms are meaningless for a transparent orthography such as Bengali or Hindi.',
    nums: [
      ['≈ 170 ms', 'N170 face/print component', 'Right-lateralised for faces, left for words.'],
      ['≈ 2 %', 'developmental prosopagnosia prevalence', 'Often familial; rarely detected without explicit testing.']
    ],
    refs: [
      'Kanwisher N, McDermott J & Chun MM (1997). The fusiform face area. <em>J Neurosci</em>.',
      'Dehaene S & Cohen L (2011). The unique role of the visual word form area in reading. <em>Trends Cogn Sci</em>.',
      'Duchaine B & Nakayama K (2006). The Cambridge Face Memory Test. <em>Neuropsychologia</em>.'
    ]
  });

  add({
    id: 'atl', name: 'Anterior temporal lobe & temporal pole', latin: 'Polus temporalis', group: 'Cortex',
    ba: 'BA 38, 20/21a, 36', parent: 'temporal', mesh: 'temporal', marker: [0.52, -0.3, 0.72],
    tag: 'The semantic hub: a modality-invariant store where words, objects, faces and sounds converge on concepts.',
    anatomy: ['Rostral temporal cortex including the pole (BA 38), perirhinal cortex (35/36) and ventral ATL; connected to OFC by the uncinate fasciculus and to occipital cortex by the ILF.'],
    cyto: ['Transitional paralimbic cortex; high convergence of unimodal inputs, which is the anatomical argument for a graded amodal hub (Lambon Ralph’s hub-and-spoke model).'],
    circuit: [
      { dir: 'Afferent', txt: 'All sensory association cortices (graded: auditory dorsally, visual ventrally), amygdala, OFC via uncinate.' },
      { dir: 'Efferent', txt: 'Amygdala, OFC, entorhinal/perirhinal → hippocampus, inferior frontal gyrus via uncinate and extreme capsule.' }
    ],
    fn: [
      '<b>Amodal semantic representation</b>: degrades in semantic dementia across all modalities and both directions (comprehension and production), which is the key evidence for a shared hub.',
      '<b>Combinatorial semantics</b> in sentence comprehension; left-lateralised for verbal, right for person-specific and socio-emotional knowledge.',
      'Perirhinal cortex adds item-level familiarity/recognition memory (separable from hippocampal recollection).'
    ],
    chem: ['Common site of TDP-43 (semantic variant PPA) and of epileptogenic tissue; anterior temporal lobectomy is the classic epilepsy surgery with predictable naming and memory costs.'],
    clinic: [
      '<b>Semantic variant PPA / semantic dementia:</b> anomia, impaired word comprehension, surface dysgraphia, object-use errors, with fluent grammatical speech and preserved day-to-day memory.',
      'Right ATL atrophy: prosopagnosia for familiar people, loss of empathy, rigid behaviour — frequently misread as a primary psychiatric presentation.',
      'Post-lobectomy: dysnomia (dominant side) and material-specific memory decline — the reason pre-surgical Wada or fMRI language mapping exists.'
    ],
    tests: [
      ['Word–picture matching, synonym judgement', 'Receptive semantics with minimal output demand.'],
      ['Camel and Cactus Test, Pyramids and Palm Trees', 'Non-verbal semantic association — essential for distinguishing semantic loss from anomia.'],
      ['Category-specific naming and generation', 'Living/non-living dissociations; watch for frequency and familiarity confounds — always match on log frequency, familiarity, AoA and visual complexity.'],
      ['Semantic priming with degraded targets', 'Graded degradation of concepts shows as reduced priming for low-typicality items.'],
      ['Famous-face and famous-name recognition', 'Right vs left ATL asymmetry.']
    ],
    caution: 'Naming tests are ferociously sensitive to <b>word frequency, age of acquisition and cultural familiarity</b>. The Boston Naming Test contains items with low familiarity in South Asia (e.g. beaver, pretzel, trellis), so raw scores systematically under-estimate ability — use locally validated or adapted item sets and report which.',
    nums: [
      ['≈ 60 000', 'words in an adult vocabulary', 'Educated adult receptive estimate; naming tests sample ~60 of these.'],
      ['ILF / uncinate', 'principal ATL tracts', 'Both show reduced FA in semantic variant PPA.']
    ],
    refs: [
      'Patterson K, Nestor PJ & Rogers TT (2007). Where do you know what you know? <em>Nat Rev Neurosci</em>.',
      'Lambon Ralph MA et al. (2017). The neural and computational bases of semantic cognition. <em>Nat Rev Neurosci</em>.'
    ]
  });

  /* ── Occipital ──────────────────────────────────────────────────── */
  add({
    id: 'occipital', name: 'Occipital lobe', latin: 'Lobus occipitalis', group: 'Cortex',
    ba: 'BA 17, 18, 19', mesh: 'occipital',
    tag: 'The most precisely mapped cortex in the brain: a retinotopic cascade from oriented edges to motion and colour.',
    anatomy: [
      'Posterior to the parieto-occipital sulcus; the <b>calcarine sulcus</b> divides cuneus from lingual gyrus and contains most of V1 — the upper visual field maps below the calcarine and vice versa.',
      'Retinotopic hierarchy: V1 (BA 17) → V2/V3 (18) → V4 colour/form and V5/MT motion (19), continuing into dorsal (parietal) and ventral (temporal) streams.',
      'The <b>macular representation</b> occupies the occipital pole and receives dual MCA/PCA supply — hence macular sparing in PCA infarction.'
    ],
    cyto: [
      'V1 is <b>striate cortex</b>: layer IV splits into IVa, IVb (stria of Gennari — visible to the naked eye), IVcα (magnocellular) and IVcβ (parvocellular).',
      'Ocular dominance columns, orientation pinwheels and cytochrome-oxidase blobs make V1 the canonical demonstration of columnar organisation (Hubel & Wiesel).'
    ],
    circuit: [
      { dir: 'Afferent', txt: 'Lateral geniculate nucleus via the optic radiation (Meyer’s loop carrying inferior retina through the temporal lobe), plus pulvinar and claustral input and strong top-down feedback.' },
      { dir: 'Efferent', txt: 'V2 → dorsal stream (V3/MT → parietal) and ventral stream (V4 → inferior temporal); feedback to LGN outnumbers feedforward input roughly 10:1.' }
    ],
    fn: [
      'V1 neurons code oriented edges, spatial frequency, binocular disparity and direction; the population is a local filter bank, not a picture.',
      '<b>MT/V5:</b> global motion; microstimulation biases motion judgements — one of the strongest single-neuron-to-percept links in neuroscience.',
      'Predictive processing: most V1 activity is explained by expectation and context rather than retinal input, which is why visual illusions and hallucinations are intrinsic to normal function.'
    ],
    chem: ['Serotonergic 5-HT2A agonists (psilocybin, LSD) desynchronise visual cortex and produce geometric hallucinations whose form constants follow V1 retinotopic geometry (Klüver; Bressloff).'],
    clinic: [
      '<b>Homonymous hemianopia</b> with macular sparing (PCA infarct); quadrantanopia from optic radiation lesions ("pie in the sky" = temporal/Meyer’s loop).',
      '<b>Cortical blindness</b> with denial (Anton syndrome); <b>blindsight</b> — above-chance responding without awareness via the superior colliculus/pulvinar route.',
      '<b>Akinetopsia</b> (MT lesion), <b>achromatopsia</b> (V4 lesion), visual agnosia from ventral stream damage.',
      '<b>Charles Bonnet syndrome:</b> formed hallucinations with insight after visual loss — release phenomena, not psychosis.'
    ],
    tests: [
      ['Confrontation and automated perimetry', 'Field mapping must precede all visual cognitive testing.'],
      ['Visual Object and Space Perception battery (VOSP)', 'Separates shape detection, silhouettes, object decision and space perception.'],
      ['Contrast sensitivity, motion coherence thresholds', 'Psychophysical, interval-scale measures with excellent reliability; motion coherence is used in dyslexia and schizophrenia research.'],
      ['Visual evoked potentials (pattern-reversal P100)', 'Objective conduction measure independent of report.'],
      ['Binocular rivalry rate', 'A heritable perceptual trait; slowed rivalry alternation is reported in bipolar disorder.']
    ],
    caution: 'Psychophysical thresholds are the most metrologically sound measures in psychology — they have a physical scale, a known psychometric function, and estimable slope and threshold. If your work is quantitative, prefer them: a 2-down-1-up adaptive staircase yields far better precision per minute of testing than any questionnaire, and the fitted slope is itself an individual-difference variable.',
    nums: [
      ['≈ 140 million', 'V1 neurons per hemisphere', 'Highest neuronal density in the neocortex.'],
      ['≈ 2 400 mm²', 'V1 surface area', 'Varies up to twofold between healthy individuals — and predicts acuity and illusion magnitude.'],
      ['10:1', 'feedback : feedforward', 'Cortico-geniculate feedback dominates the connection count.']
    ],
    refs: [
      'Hubel DH & Wiesel TN (1962, 1968). Receptive fields and functional architecture of visual cortex. <em>J Physiol</em>.',
      'Newsome WT & Paré EB (1988). A selective impairment of motion perception following lesions of MT. <em>J Neurosci</em>.'
    ]
  });

  add({
    id: 'v1', name: 'Primary visual cortex (V1)', latin: 'Cortex striatus', group: 'Cortex',
    ba: 'BA 17', parent: 'occipital', mesh: 'occipital', marker: [0.12, 0.0, -1.05],
    tag: 'The stria of Gennari — cortical columns, retinotopy, and the cortical magnification factor that distorts the visual world into usefulness.',
    anatomy: ['Lines the calcarine sulcus; ~2/3 is buried in the sulcus. Cortical magnification: the central 2° of vision occupies ~10 % of V1 surface.'],
    cyto: ['Striate cortex; quadripartite layer IV; ocular dominance columns ~0.5–1 mm wide, orientation pinwheels ~0.5 mm, one hypercolumn per ~1 mm².'],
    circuit: [
      { dir: 'Afferent', txt: 'LGN layers: magnocellular → IVcα (motion, low contrast), parvocellular → IVcβ (form, colour), koniocellular → layers II/III blobs.' },
      { dir: 'Efferent', txt: 'IVb → MT (motion), II/III → V2/V4, V → superior colliculus and pulvinar, VI → LGN feedback.' }
    ],
    fn: ['Orientation, spatial frequency, ocular dominance, disparity and contrast normalisation — the substrate for the oblique effect, tilt illusions and surround suppression measured psychophysically.'],
    chem: ['GABAergic surround suppression indexes cortical inhibition; MRS-measured occipital GABA correlates with orientation-discrimination performance — a rare direct neurochemistry–psychophysics link.'],
    clinic: ['Focal lesions produce corresponding scotomata that respect retinotopy precisely; occipital epilepsy yields elementary visual hallucinations (coloured circles) unlike the formed images of temporal origin.'],
    tests: [
      ['Orientation discrimination, tilt after-effect', 'Direct read-out of V1 tuning bandwidth.'],
      ['Surround suppression paradigms', 'Inhibitory function; reduced suppression is reported in schizophrenia and autism research.'],
      ['Pattern-reversal VEP P100 latency', 'Standardised, highly reliable; delayed in demyelination.']
    ],
    nums: [['≈ 10 %', 'of V1 for central 2°', 'Cortical magnification factor.'], ['0.5–1 mm', 'ocular dominance column width', 'One hypercolumn ≈ 1 mm².']],
    refs: ['Hubel & Wiesel (1977). Functional architecture of macaque monkey visual cortex. <em>Proc R Soc B</em>.']
  });

  /* ── Insula ─────────────────────────────────────────────────────── */
  add({
    id: 'insula', name: 'Insular cortex', latin: 'Insula (lobus insularis)', group: 'Cortex',
    ba: 'BA 13, 14, 16, 43, 52', mesh: 'insula',
    tag: 'The interoceptive cortex: where the physiological state of the body becomes a feeling, a salience signal, and a decision weight.',
    anatomy: [
      'Buried in the depth of the Sylvian fissure, covered by frontal, parietal and temporal opercula; divided by the central insular sulcus into a <b>posterior</b> (granular) and <b>anterior</b> (agranular) sector with three to five gyri.',
      'A posterior-to-anterior processing gradient: primary interoceptive representation posteriorly → re-representation in mid-insula → subjective feeling and integration in the anterior insula (Craig).',
      'The anterior insula and anterior cingulate share <b>von Economo neurons</b> — large bipolar projection cells present only in great apes, cetaceans and elephants, and selectively lost in behavioural-variant FTD.'
    ],
    cyto: ['Granular posteriorly → dysgranular mid → agranular anteriorly; anterior agranular insula is paralimbic cortex continuous with orbitofrontal cortex.'],
    circuit: [
      { dir: 'Afferent', txt: 'Lamina I spinothalamic → VMpo thalamus → posterior insula (pain, temperature, itch, sensual touch, muscle burn); vagal/NTS → parabrachial → VMb thalamus → mid-insula (visceral); gustatory from VPMpc; amygdala, ACC, OFC.' },
      { dir: 'Efferent', txt: 'Anterior cingulate (the other salience node), amygdala, hypothalamus, brainstem autonomic nuclei, ventral striatum, and lateral prefrontal cortex.' },
      { dir: 'Loop', txt: 'Anterior insula ↔ dorsal ACC forms the <b>salience network</b>, which switches the brain between default-mode and frontoparietal control states — the mechanistic account of attentional capture by bodily and emotional events.' }
    ],
    fn: [
      '<b>Interoception:</b> heartbeat, respiration, gastric, thermal and nociceptive state — the "material me" (Craig, 2009).',
      '<b>Salience detection and network switching</b> (Menon & Uddin): tags stimuli as behaviourally relevant and reallocates control resources.',
      '<b>Risk, uncertainty and aversive anticipation:</b> anterior insula activity predicts risk aversion and loss anticipation better than any other region.',
      '<b>Disgust, empathy for pain, craving and urge</b>; also taste, and — in the left anterior insula — a contribution to speech articulation.'
    ],
    chem: ['Densely innervated by serotonin and noradrenaline; anterior insula is implicated in the mechanism of interoceptive-exposure-based treatments for panic, and in nicotine craving (insular-damage smokers lose addiction more readily — Naqvi et al., 2007).'],
    clinic: [
      '<b>Anxiety and panic:</b> insula hyperreactivity to interoceptive threat — the "alarm" reading of benign bodily sensation (Paulus & Stein’s model).',
      '<b>Anorexia nervosa:</b> altered insular taste and interoceptive processing; <b>somatic symptom disorders</b> and alexithymia show reduced insular differentiation.',
      '<b>Stroke:</b> right insular infarct causes cardiac arrhythmia and blunted autonomic responses; left insula damage contributes to apraxia of speech.',
      '<b>bvFTD:</b> early von Economo neuron loss in anterior insula/ACC with loss of empathy and social awareness.'
    ],
    tests: [
      ['Heartbeat counting & heartbeat discrimination', 'Interoceptive accuracy; note that counting tasks are contaminated by beliefs about heart rate — use discrimination or the HEP (heartbeat-evoked potential) for stronger inference.'],
      ['MAIA-2, BPQ, TAS-20', 'Interoceptive sensibility and alexithymia — self-report, and only weakly correlated with accuracy (the "interoceptive trait prediction error" literature).'],
      ['Balloon Analogue Risk Task, Cambridge Gamble', 'Risk-taking with an explicit probability structure; insula activity tracks risk aversion.'],
      ['Disgust sensitivity scales, urge-to-smoke ratings', 'Domain-specific insular functions.'],
      ['CO₂ / hyperventilation interoceptive challenge', 'Panic provocation used in mechanistic trials.']
    ],
    caution: 'Interoception is a textbook case of <b>construct fractionation</b>: accuracy, sensibility, awareness (metacognitive) and prediction error are separable dimensions with near-zero intercorrelation. Reporting "interoception" as one score is a measurement error, not a shorthand — specify the dimension and the task.',
    nums: [
      ['VMpo', 'lamina I thalamic relay', 'The primate-specific interoceptive pathway that makes distinct feelings possible.'],
      ['von Economo', 'neurons shared with ACC', 'Large bipolar projection cells; selectively depleted in bvFTD.']
    ],
    refs: [
      'Craig AD (2009). How do you feel — now? The anterior insula and human awareness. <em>Nat Rev Neurosci</em>.',
      'Menon V & Uddin LQ (2010). Saliency, switching, attention and control: a network model of insula function. <em>Brain Struct Funct</em>.',
      'Garfinkel SN et al. (2015). Knowing your own heart: distinguishing interoceptive accuracy from interoceptive awareness. <em>Biol Psychol</em>.'
    ]
  });

  /* ── Cingulate ──────────────────────────────────────────────────── */
  add({
    id: 'cingulate', name: 'Cingulate cortex', latin: 'Gyrus cinguli', group: 'Cortex',
    ba: 'BA 24, 25, 32, 33 (ant), 23, 31 (post)', mesh: 'cingulate',
    tag: 'A four-region belt around the corpus callosum: affect and autonomic control anteriorly, action monitoring in the middle, self and memory posteriorly.',
    anatomy: [
      'Vogt’s four-region model: <b>ACC</b> (subgenual 25 + pregenual 24/32, affective), <b>MCC</b> (anterior and posterior midcingulate, action and skeletomotor), <b>PCC</b> (23/31, self-referential and memory), <b>RSC</b> (29/30, navigation).',
      'Wrapped by the <b>cingulum bundle</b>, which connects prefrontal, parietal and medial temporal cortex — the longest association tract accompanying a single gyrus.'
    ],
    cyto: ['Agranular/dysgranular limbic cortex; ACC layer V contains von Economo neurons, as in anterior insula; high density of opioid and oxytocin receptors.'],
    circuit: [
      { dir: 'Afferent', txt: 'Amygdala, anterior and midline thalamic nuclei, orbital and dorsolateral prefrontal cortex, insula, brainstem monoamines, hypothalamus.' },
      { dir: 'Efferent', txt: 'Dorsal striatum and nucleus accumbens (ACC loop), PAG and autonomic brainstem, motor and premotor cortex (MCC), hippocampal formation via the cingulum.' },
      { dir: 'Loop', txt: 'Anterior cingulate CSTC loop: ACC → ventral striatum → GPi/SNr → thalamus (VA/MD) → ACC. Its dysfunction produces apathy at one extreme and compulsive doubt at the other.' }
    ],
    fn: [
      '<b>dACC/aMCC:</b> conflict monitoring, error detection (generator of the ERN/Ne), effort and cost–benefit computation, pain affect.',
      '<b>Subgenual ACC (BA 25):</b> autonomic and neuroendocrine regulation of sadness; a DBS target in treatment-resistant depression.',
      '<b>Pregenual ACC:</b> emotional appraisal and self-relevant valuation; predicts antidepressant and placebo response.',
      '<b>PCC:</b> default-mode hub for self-referential thought and autobiographical retrieval; its deactivation indexes task engagement.'
    ],
    chem: ['Very high mu-opioid receptor density (placebo analgesia and social pain); glutamate/GABA ratios measured here by MRS predict conflict-task performance; pregenual ACC glutamate is a candidate ketamine-response biomarker.'],
    clinic: [
      '<b>Akinetic mutism and abulia</b> after bilateral ACC infarct (ACA territory) — preserved capacity without initiation.',
      '<b>Depression:</b> elevated BA 25 metabolism normalising with treatment; rostral ACC theta predicts antidepressant response (a genuine prognostic EEG biomarker).',
      '<b>OCD:</b> hyperactive dACC error signalling — subjectively, the "something is wrong" feeling; enhanced ERN is a candidate endophenotype.',
      'Historical: cingulotomy for intractable pain and OCD — still performed in a handful of centres.'
    ],
    tests: [
      ['Error-related negativity (ERN/Ne) and Pe', 'dACC error monitoring; ERN is enhanced in OCD and anxiety, blunted in externalising disorders — one of the best-validated ERP markers in psychopathology.'],
      ['Flanker, Simon, Stroop conflict effects', 'Conflict adaptation and post-error slowing as within-subject indices — far more reliable than between-group mean differences.'],
      ['Effort-based decision tasks (EEfRT)', 'Motivation/apathy quantified as an effort-discounting parameter — better than apathy scales alone.'],
      ['Apathy Evaluation Scale, LARS, AES-I', 'Clinical apathy quantification; separate cognitive, behavioural and emotional subscales.'],
      ['Rostral ACC theta (EEG) at baseline', 'Predicts SSRI response in several replications; still not clinically deployed.']
    ],
    caution: 'The <b>reliability paradox</b> bites hardest here: Stroop and flanker <em>effects</em> (difference scores) show robust experimental effects but poor test–retest reliability (ICC often < 0.5), because difference scores subtract shared reliable variance. Use trial-level mixed models, drift-diffusion parameters or hierarchical Bayesian estimates rather than raw difference scores if you want individual-difference inference (Hedge, Powell & Sumner, 2018).',
    nums: [
      ['≈ 80–100 ms', 'ERN latency post-response', 'Negative deflection at FCz; source-localises to dACC.'],
      ['ICC < 0.5', 'reliability of many conflict effects', 'The reliability paradox — good experiments, poor individual-difference measures.']
    ],
    refs: [
      'Vogt BA (2005). Pain and emotion interactions in subregions of the cingulate gyrus. <em>Nat Rev Neurosci</em>.',
      'Botvinick MM et al. (2001). Conflict monitoring and cognitive control. <em>Psychol Rev</em>.',
      'Hedge C, Powell G & Sumner P (2018). The reliability paradox. <em>Behav Res Methods</em>.'
    ]
  });

})(window.ATLAS);
