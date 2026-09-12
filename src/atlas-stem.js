/* Brainstem, ascending modulatory systems, cerebellum, neuroendocrine & CSF. */
(function (A) {
  const add = A.add;

  add({
    id: 'midbrain', name: 'Midbrain', latin: 'Mesencephalon', group: 'Stem',
    ba: '—', mesh: 'midbrain',
    tag: 'Two centimetres carrying eye movement, orienting, pain modulation, dopamine and the gateway to consciousness.',
    anatomy: [
      '<b>Tectum</b> (superior and inferior colliculi), <b>tegmentum</b> (red nucleus, PAG, reticular formation, cranial nerve III/IV nuclei), and the <b>crus cerebri</b> carrying descending corticofugal fibres, separated by the substantia nigra.',
      'The cerebral aqueduct runs through it surrounded by the <b>periaqueductal grey</b>; obstruction here causes non-communicating hydrocephalus.'
    ],
    cyto: ['Superior colliculus is laminated with a superficial visual map over deeper multisensory/motor maps in register — the canonical example of aligned sensorimotor mapping.'],
    circuit: [
      { dir: 'Afferent', txt: 'Retina and visual cortex → superior colliculus; auditory pathway → inferior colliculus; cortex → PAG and reticular formation; cerebellum and cortex → red nucleus.' },
      { dir: 'Efferent', txt: 'Tectospinal and tectoreticular (orienting), rubrospinal, descending PAG → rostral ventromedial medulla (the descending analgesia pathway), oculomotor nuclei, and the ascending reticular activating system to thalamus and basal forebrain.' }
    ],
    fn: [
      '<b>Orienting and saccade generation</b> (superior colliculus — the structure that mediates blindsight and reflexive attention capture).',
      '<b>Descending pain modulation:</b> PAG → RVM → spinal dorsal horn, opioid-mediated; the neuroanatomy of placebo analgesia and of stress-induced analgesia.',
      '<b>Defensive behaviour:</b> dorsal PAG stimulation produces panic-like flight in humans and animals — the basis of the "panic = defence system" model (Deakin & Graeff).',
      '<b>Arousal:</b> the ascending reticular activating system from midbrain reticular formation determines level of consciousness.'
    ],
    chem: ['Dense mu-opioid receptors in PAG (analgesia, and the site of opioid-induced respiratory-independent analgesic action); dopamine from SNc/VTA; GABAergic SNr output.'],
    clinic: [
      '<b>Parinaud (dorsal midbrain) syndrome:</b> upgaze palsy, convergence-retraction nystagmus, light-near dissociation — pineal tumours in adolescents.',
      '<b>Weber syndrome:</b> ventral midbrain infarct → ipsilateral CN III palsy with contralateral hemiparesis.',
      '<b>Coma:</b> midbrain reticular lesions cause coma with preserved brainstem reflexes below; the rostral brainstem is the arousal bottleneck.',
      'PAG stimulation in humans elicits intense fear and autonomic arousal indistinguishable from a panic attack — evidence that panic is a brainstem defence program, not a cognitive event.'
    ],
    tests: [
      ['Pupillary responses, eye-movement examination', 'Direct midbrain assessment; light-near dissociation is a localising sign.'],
      ['Antisaccade / prosaccade with collicular interpretation', 'Cortical suppression of collicular reflexes.'],
      ['Conditioned pain modulation, pain thresholds', 'Descending PAG–RVM function; quantitative sensory testing gives interval-scale thresholds.'],
      ['CO₂ challenge / hyperventilation provocation', 'Defence-system reactivity in panic research.']
    ],
    nums: [['≈ 2 cm', 'rostro-caudal length', 'Contains the arousal bottleneck for consciousness.'], ['7 layers', 'superior colliculus', 'Visual map over motor map, in spatial register.']],
    refs: ['Fields HL (2004). State-dependent opioid control of pain. <em>Nat Rev Neurosci</em>.', 'Deakin JFW & Graeff FG (1991). 5-HT and mechanisms of defence. <em>J Psychopharmacol</em>.']
  });

  add({
    id: 'dopamine', name: 'Substantia nigra & ventral tegmental area', latin: 'Substantia nigra, area tegmentalis ventralis', group: 'Stem',
    ba: '—', mesh: 'sn',
    tag: 'Four hundred thousand neurons broadcasting a single scalar — reward prediction error — and reshaping behaviour with it.',
    anatomy: [
      '<b>SN pars compacta</b> (dopaminergic, neuromelanin-pigmented) and <b>pars reticulata</b> (GABAergic basal-ganglia output) in the ventral midbrain; the <b>VTA</b> sits medially.',
      'Four classical pathways: <b>nigrostriatal</b> (SNc → dorsal striatum: movement), <b>mesolimbic</b> (VTA → accumbens/amygdala: motivation), <b>mesocortical</b> (VTA → PFC: cognition), <b>tuberoinfundibular</b> (arcuate → median eminence: prolactin inhibition).'
    ],
    cyto: ['Large pigmented TH-positive neurons with enormous, highly branched axonal arbours (a single human SNc neuron may support > 1 million synapses) — the metabolic burden underlying their selective vulnerability.'],
    circuit: [
      { dir: 'Afferent', txt: 'Striatal and pallidal GABAergic feedback, PFC glutamate, pedunculopontine cholinergic, lateral habenula (negative-value signalling that inhibits dopamine cells), lateral hypothalamic orexin.' },
      { dir: 'Efferent', txt: 'Dorsal and ventral striatum, prefrontal and cingulate cortex, amygdala, hippocampus; SNr → thalamus and superior colliculus.' }
    ],
    fn: [
      '<b>Reward prediction error:</b> phasic burst when outcome exceeds prediction, dip when it falls short, silence when fully predicted (Schultz, 1997) — a biological implementation of temporal-difference learning.',
      '<b>Incentive salience and vigour:</b> tonic dopamine sets response rate and willingness to exert effort.',
      '<b>Movement initiation:</b> nigrostriatal loss produces bradykinesia; <b>salience and novelty</b>: dopamine neurons also respond to unexpected salient events irrespective of valence.',
      '<b>Aberrant salience</b> (Kapur, 2003): inappropriate dopamine-mediated salience attribution to neutral percepts is the leading mechanistic account of how delusions form and why antipsychotics relieve them.'
    ],
    chem: ['Dopamine at D1-like (D1, D5 — Gs) and D2-like (D2, D3, D4 — Gi) receptors; synthesised from tyrosine via TH (rate-limiting) and DOPA decarboxylase; cleared by DAT (striatum) and COMT (cortex, where DAT is sparse — hence COMT genotype matters mainly for prefrontal dopamine).'],
    clinic: [
      '<b>Parkinson’s disease:</b> motor signs appear after ~50–60 % SNc neuron loss and ~70–80 % striatal dopamine loss — the long preclinical window that makes prodromal markers (REM sleep behaviour disorder, hyposmia, constipation) so valuable.',
      '<b>Schizophrenia:</b> elevated presynaptic dopamine synthesis and release capacity in associative striatum; all effective antipsychotics are D2 antagonists or partial agonists, and occupancy > 80 % predicts EPS and dysphoria.',
      '<b>Addiction:</b> all drugs of abuse increase accumbens dopamine acutely; chronic use reduces D2 availability and blunts responses to natural reinforcers.',
      '<b>Dopamine dysregulation syndrome</b> and impulse-control disorders (pathological gambling, hypersexuality) in ~14 % of patients on dopamine agonists — a psychiatric harm caused by neurological treatment.',
      '<b>Hyperprolactinaemia</b> from tuberoinfundibular blockade: amenorrhoea, galactorrhoea, sexual dysfunction, reduced bone density — one of the most under-asked-about side-effect clusters.'
    ],
    tests: [
      ['Reinforcement-learning tasks with RPE modelling', 'Fit learning rates separately for positive and negative prediction errors (D1 "go" vs D2 "no-go" learning, Frank’s model) — the parameters dissociate under dopaminergic drugs.'],
      ['Probabilistic selection task, reversal learning', 'Approach/avoid learning asymmetry.'],
      ['Progressive-ratio and effort tasks', 'Tonic dopamine / vigour.'],
      ['Delay discounting (k)', 'Impulsive choice; sensitive to dopaminergic manipulation.'],
      ['Smell identification (UPSIT/Sniffin’ Sticks), RBD questionnaire', 'Prodromal Parkinson’s markers — cheap, quantitative, and years earlier than motor signs.'],
      ['Aberrant Salience Inventory, salience attribution test', 'Operationalises aberrant salience for psychosis research.']
    ],
    caution: 'When comparing medicated patients with controls on any reward or learning task, dopaminergic medication is not a nuisance variable — it is a direct manipulation of the construct. Report chlorpromazine/olanzapine equivalents and levodopa equivalent daily dose, and treat drug-naive or ON/OFF within-subject designs as the only strong inference.',
    nums: [
      ['≈ 200 000–450 000', 'SNc dopamine neurons per side', 'Human estimates; VTA adds a comparable number.'],
      ['50–60 %', 'SNc loss before motor signs', 'Striatal dopamine loss ~70–80 % at that point.'],
      ['≈ 14 %', 'ICD on dopamine agonists', 'Higher with pramipexole/ropinirole and in younger, male patients.'],
      ['> 1 × 10⁶', 'synapses per SNc axon', 'Extraordinary arborisation, extraordinary metabolic cost.']
    ],
    refs: [
      'Schultz W (1998). Predictive reward signal of dopamine neurons. <em>J Neurophysiol</em>.',
      'Kapur S (2003). Psychosis as a state of aberrant salience. <em>Am J Psychiatry</em>.',
      'Frank MJ (2005). Dynamic dopamine modulation in the basal ganglia. <em>J Cogn Neurosci</em>.',
      'Howes OD et al. (2012). The nature of dopamine dysfunction in schizophrenia. <em>Arch Gen Psychiatry</em>.'
    ]
  });

  add({
    id: 'raphe', name: 'Raphe nuclei — serotonergic system', latin: 'Nuclei raphes', group: 'Stem',
    ba: '—', mesh: 'raphe',
    tag: 'A quarter of a million neurons along the brainstem midline, modulating mood, patience, aggression thresholds and sleep architecture.',
    anatomy: ['Midline nuclei from midbrain to medulla: <b>dorsal</b> and <b>median raphe</b> project rostrally to forebrain; caudal raphe (magnus, obscurus, pallidus) project to spinal cord for pain and autonomic control.'],
    cyto: ['Tryptophan-hydroxylase-2-positive neurons with slow, regular pacemaker firing; 5-HT1A somatodendritic autoreceptors provide negative feedback, and their desensitisation over 2–4 weeks is the leading explanation for the antidepressant response delay.'],
    circuit: [
      { dir: 'Afferent', txt: 'Prefrontal cortex (direct cortical control of raphe firing), lateral habenula, hypothalamus, amygdala, PAG.' },
      { dir: 'Efferent', txt: 'Near-global forebrain innervation: cortex, hippocampus, amygdala, striatum, thalamus, hypothalamus, plus descending projections to the spinal dorsal horn.' }
    ],
    fn: [
      '<b>Patience and temporal discounting:</b> serotonergic activity supports waiting for delayed rewards — depletion increases impulsive choice.',
      '<b>Aversive processing and behavioural inhibition</b> (Deakin–Graeff: dorsal raphe → amygdala mediates anticipatory anxiety; → PAG inhibits panic).',
      '<b>Aggression threshold:</b> low 5-HIAA in CSF is one of the oldest and most replicated biological correlates in psychiatry — associated with impulsive aggression and with suicide by violent means (Åsberg, 1976).',
      '<b>Sleep architecture, appetite, nociception, thermoregulation</b>; also REM suppression (serotonergic neurons are REM-off cells).'
    ],
    chem: ['14+ receptor subtypes: 5-HT1A (autoreceptor and postsynaptic anxiolytic target), 5-HT1B, 5-HT2A (psychedelics, atypical antipsychotics), 5-HT2C (appetite), 5-HT3 (nausea), 5-HT4, 5-HT6, 5-HT7; transporter SERT is the SSRI target, with the 5-HTTLPR polymorphism modulating expression.'],
    clinic: [
      '<b>Depression:</b> the simple "serotonin deficiency" account is not supported (tryptophan depletion does not lower mood in never-depressed people but does in remitted patients on SSRIs) — the better framing is altered emotional-processing bias corrected early in treatment, with mood following (Harmer’s cognitive-neuropsychological model).',
      '<b>OCD, panic, PTSD, bulimia</b> respond to SSRIs at doses and latencies differing from depression — evidence for distinct mechanisms.',
      '<b>Serotonin syndrome:</b> the clinical triad of mental-status change, autonomic hyperactivity and neuromuscular excitability (clonus, hyperreflexia) — a genuine emergency, differentiated from neuroleptic malignant syndrome by hyperreflexia/clonus vs lead-pipe rigidity and by onset in hours vs days.',
      '<b>Psychedelic 5-HT2A agonism</b> desynchronises cortical activity and increases network entropy; the current therapeutic trials rest on this mechanism plus a plasticity window.'
    ],
    tests: [
      ['Acute tryptophan depletion', 'Causal manipulation of 5-HT; effects are moderated by personal and family history — an important gene × environment demonstration.'],
      ['Probabilistic reversal learning, punishment-induced inhibition', 'Serotonergic aversive processing.'],
      ['Delay discounting and go/no-go with reward/punishment', 'Patience and behavioural inhibition.'],
      ['Emotional face-processing bias (facial-expression recognition, dot probe)', 'Harmer’s early-treatment marker: bias shifts within days, before mood change.'],
      ['Buss–Perry Aggression Questionnaire, laboratory aggression (PSAP, TAP)', 'Trait and state aggression; pair with CSF/peripheral markers only with explicit caveats.']
    ],
    caution: 'The 5-HTTLPR × life-stress literature is the standard teaching example of candidate-gene fragility: an influential 2003 finding, a decade of mixed replications, and near-null large-scale meta-analytic and GWAS support. The methodological lesson is about statistical power, publication bias and flexible moderator definitions — apply it to any single-gene or single-biomarker moderator you encounter.',
    nums: [
      ['≈ 250 000–300 000', 'serotonergic neurons', 'For the entire human brain.'],
      ['2–4 weeks', '5-HT1A autoreceptor desensitisation', 'Matches the antidepressant latency.'],
      ['5-HIAA ↓', 'CSF marker of impulsive aggression', 'Åsberg et al. (1976); among the most replicated biological findings in psychiatry.']
    ],
    refs: [
      'Åsberg M et al. (1976). 5-HIAA in the cerebrospinal fluid: a biochemical suicide predictor? <em>Arch Gen Psychiatry</em>.',
      'Harmer CJ, Goodwin GM & Cowen PJ (2009). Why do antidepressants take so long to work? <em>Br J Psychiatry</em>.',
      'Cools R, Roberts AC & Robbins TW (2008). Serotoninergic regulation of emotional and behavioural control. <em>Trends Cogn Sci</em>.'
    ]
  });

  add({
    id: 'lc', name: 'Locus coeruleus — noradrenergic system', latin: 'Locus coeruleus', group: 'Stem',
    ba: '—', mesh: 'lc',
    tag: 'Fifteen thousand neurons per side that set arousal, gain and the trade-off between exploiting a task and exploring alternatives.',
    anatomy: ['A pigmented nucleus in the rostral pons at the floor of the fourth ventricle; the sole source of noradrenaline for cortex, hippocampus and cerebellum, with the A1/A2 medullary groups supplying hypothalamus and the lateral tegmental system supplying brainstem.'],
    cyto: ['Tightly packed TH/DBH-positive neurons with unmyelinated, extensively collateralised axons; electrotonic coupling supports synchronised population firing. Among the earliest sites of tau pathology in Alzheimer’s disease (Braak stage 0/a, before entorhinal cortex).'],
    circuit: [
      { dir: 'Afferent', txt: 'Nucleus paragigantocellularis and prepositus hypoglossi (major), plus PFC and amygdala/CRH input (the stress route); orexinergic hypothalamic drive.' },
      { dir: 'Efferent', txt: 'Global cortical, hippocampal, amygdalar, cerebellar and spinal innervation; no basal ganglia projection to speak of.' }
    ],
    fn: [
      '<b>Adaptive gain theory</b> (Aston-Jones & Cohen, 2005): phasic LC bursts to task-relevant events improve focused performance; a shift to high tonic firing degrades task focus and promotes exploration/disengagement — the neural economics of attention lapses and of distractibility.',
      '<b>Arousal and the sleep–wake switch:</b> LC is silent in REM sleep, active in waking, and its firing predicts pupil diameter — hence pupillometry as an LC proxy.',
      '<b>Emotional memory consolidation</b> via β-adrenergic action in the amygdala; <b>stress response</b> via reciprocal CRH–NA loops with the PVN and amygdala.',
      '<b>Network reset</b> and P300 generation: the P3b is thought to reflect phasic LC-NA activity following salient events.'
    ],
    chem: ['Noradrenaline at α1 (post-synaptic, high-affinity at high levels — stress impairment), α2A (post-synaptic prefrontal — guanfacine target; pre-synaptic autoreceptor — clonidine), β1/β2 (amygdala consolidation — propranolol target). Reuptake by NET is the target of atomoxetine, reboxetine and the noradrenergic component of SNRIs and tricyclics.'],
    clinic: [
      '<b>PTSD:</b> noradrenergic hyperactivity — nightmares and hyperarousal respond to prazosin (α1 antagonist); yohimbine provokes flashbacks in PTSD patients.',
      '<b>ADHD:</b> prefrontal α2A mechanisms underlie guanfacine and atomoxetine efficacy; the LC-NA account explains why both under- and over-arousal impair performance.',
      '<b>Panic disorder:</b> LC stimulation produces panic-like states; <b>opioid withdrawal</b> is largely LC hyperactivity (hence clonidine).',
      '<b>Alzheimer’s and Parkinson’s disease:</b> substantial LC neuron loss — and LC integrity (measurable on neuromelanin-sensitive MRI) correlates with cognitive reserve.'
    ],
    tests: [
      ['Pupillometry (tonic diameter, task-evoked dilation)', 'The most practical LC-NA proxy; baseline diameter tracks tonic arousal, phasic dilation tracks effort and surprise. Requires luminance control and a fixed-distance eye tracker.'],
      ['P300 (P3b) amplitude and latency', 'Salience/orienting index tied to phasic NA; amplitude reduced in schizophrenia, latency prolonged in dementia.'],
      ['Reaction-time variability, attention lapses (SART, CPT RT-SD)', 'RT variability is the behavioural signature of tonic/phasic imbalance and is more sensitive than mean RT in ADHD.'],
      ['Exploration–exploitation bandit tasks', 'Directly operationalises adaptive-gain theory; fit an exploration parameter.'],
      ['Yohimbine / propranolol challenge (research)', 'Causal noradrenergic manipulation; propranolol reconsolidation-blockade paradigms for traumatic memory.']
    ],
    caution: 'Pupillometry is attractive but methodologically demanding: pupil size depends on luminance, accommodation, gaze angle, caffeine, medication (anticholinergics, opioids) and age. Preregister a baseline window and a luminance-matched stimulus set, and report pre-processing (blink interpolation, deconvolution) — otherwise "arousal" effects are optical artefacts.',
    nums: [
      ['≈ 15 000', 'neurons per side', 'Innervating essentially the entire cortex.'],
      ['1–3 Hz', 'tonic firing in quiet waking', 'Phasic bursts to 8–10 Hz; silent in REM.'],
      ['Braak 0/a', 'earliest tau site', 'LC pathology precedes entorhinal involvement in Alzheimer’s disease.']
    ],
    refs: [
      'Aston-Jones G & Cohen JD (2005). An integrative theory of locus coeruleus–norepinephrine function. <em>Annu Rev Neurosci</em>.',
      'Sara SJ (2009). The locus coeruleus and noradrenergic modulation of cognition. <em>Nat Rev Neurosci</em>.',
      'Arnsten AFT (2011). Catecholamine influences on dorsolateral prefrontal cortical networks. <em>Biol Psychiatry</em>.'
    ]
  });

  add({
    id: 'pons', name: 'Pons', latin: 'Pons', group: 'Stem',
    ba: '—', mesh: 'pons',
    tag: 'A relay station for the cerebellum, the generator of REM sleep, and the anatomical home of the most extreme dissociation between mind and movement.',
    anatomy: ['Basis pontis (corticospinal/corticopontine fibres and pontine nuclei) with the tegmentum dorsally containing CN V–VIII nuclei, the PPRF for horizontal gaze, the parabrachial complex, the pedunculopontine and laterodorsal tegmental cholinergic nuclei, and the locus coeruleus.'],
    cyto: ['Pontine nuclei are the largest precerebellar relay — ~20 million neurons taking cortical input to the contralateral cerebellar hemisphere via the middle cerebellar peduncle.'],
    circuit: [
      { dir: 'Afferent', txt: 'Corticopontine fibres from the whole cortex (motor, prefrontal, parietal and temporal), plus spinal and vestibular input.' },
      { dir: 'Efferent', txt: 'Pontocerebellar mossy fibres → cerebellar cortex; PPRF → abducens for horizontal saccades; cholinergic PPT/LDT → thalamus (REM and arousal); parabrachial → hypothalamus and amygdala (visceral).' }
    ],
    fn: [
      '<b>Cortico-ponto-cerebellar relay:</b> the route by which cerebellum receives cortical intentions — and the reason cerebellar lesions produce cognitive as well as motor deficits.',
      '<b>REM sleep generation:</b> cholinergic PPT/LDT REM-on cells with monoaminergic REM-off cells form the flip-flop that creates REM, with sublaterodorsal nucleus driving muscle atonia.',
      '<b>Horizontal gaze</b> (PPRF, abducens, MLF) and the vestibulo-ocular reflex; <b>visceral relay</b> (parabrachial) for taste, breathlessness and nausea.'
    ],
    chem: ['Cholinergic (PPT/LDT), noradrenergic (LC), and the source of the pontine wave (PGO) activity of REM dreaming.'],
    clinic: [
      '<b>Locked-in syndrome:</b> ventral pontine infarct → quadriplegia and aphonia with preserved consciousness and vertical eye movement. The critical clinical point is that awareness is intact: communication must be established (vertical gaze, blink coding, BCI) before any capacity or prognosis judgement — and reported quality of life in chronic locked-in state is far higher than clinicians predict.',
      '<b>REM sleep behaviour disorder:</b> loss of REM atonia from sublaterodorsal degeneration — a prodrome converting to Parkinson’s disease or dementia with Lewy bodies in the majority within 10–15 years.',
      '<b>One-and-a-half syndrome, internuclear ophthalmoplegia</b> (MLF — bilateral INO in young adults suggests multiple sclerosis).',
      '<b>Central pontine myelinolysis</b> from over-rapid sodium correction.'
    ],
    tests: [
      ['Polysomnography with REM atonia quantification', 'RBD diagnosis requires PSG-documented REM without atonia; the RBD1Q screening question has good sensitivity.'],
      ['Vertical-gaze-based communication protocols, BCI spellers', 'Assessment in locked-in state; standard bedside cognitive tests are invalid without an adapted response channel.'],
      ['Brainstem auditory evoked potentials, vestibulo-ocular reflex testing', 'Objective pontine function.']
    ],
    caution: 'Never infer absent cognition from absent motor output. Covert awareness has been demonstrated in a meaningful minority of patients with disorders of consciousness using fMRI and EEG command-following paradigms (Owen et al., 2006; Claassen et al., 2019) — a finding with direct implications for assessment ethics.',
    nums: [
      ['≈ 20 × 10⁶', 'pontine nuclei neurons', 'The largest relay in the brain, feeding the cerebellum.'],
      ['90 min', 'REM cycle period', 'Generated by pontine cholinergic–monoaminergic interaction.'],
      ['≈ 75 %', 'RBD → neurodegeneration', 'Phenoconversion over 10–15 years.']
    ],
    refs: ['Owen AM et al. (2006). Detecting awareness in the vegetative state. <em>Science</em>.', 'Schenck CH & Mahowald MW (2002). REM sleep behaviour disorder. <em>Sleep</em>.']
  });

  add({
    id: 'medulla', name: 'Medulla oblongata', latin: 'Medulla oblongata', group: 'Stem',
    ba: '—', mesh: 'medulla',
    tag: 'The autonomic engine room: breathing, blood pressure, swallowing, vomiting and the interoceptive front door.',
    anatomy: ['Pyramids and their decussation ventrally; the olivary complex laterally; dorsally the <b>nucleus tractus solitarius</b> (visceral afferent), dorsal motor nucleus of the vagus, nucleus ambiguus, hypoglossal nucleus, the dorsal column nuclei, and the area postrema (a circumventricular chemosensor outside the blood–brain barrier).'],
    cyto: ['Reticular formation with pre-Bötzinger complex (respiratory rhythm generator), rostral ventrolateral medulla (sympathetic premotor, blood-pressure set-point), and the caudal raphe.'],
    circuit: [
      { dir: 'Afferent', txt: 'Vagal and glossopharyngeal afferents (baroreceptor, chemoreceptor, gastrointestinal, cardiac) → NTS; spinal and trigeminal input; descending hypothalamic and PAG control.' },
      { dir: 'Efferent', txt: 'NTS → parabrachial → thalamus VMb → insula (the interoceptive pathway); dorsal vagal motor and nucleus ambiguus → parasympathetic outflow; RVLM → spinal sympathetic preganglionics.' }
    ],
    fn: [
      '<b>Respiratory rhythmogenesis</b> and chemoreflex CO₂ sensing; <b>baroreflex</b> blood-pressure regulation; swallowing, coughing, vomiting (area postrema is the chemoreceptor trigger zone — the 5-HT3 antagonist target).',
      '<b>Vagal afferent gateway:</b> ~80 % of vagal fibres are afferent, making the medulla the brain’s principal interoceptive input stage and the anatomical basis of the gut–brain axis and of heart-rate-variability measures.'
    ],
    chem: ['Rich in opioid receptors (respiratory depression in overdose occurs here), 5-HT3 (emesis), and the site of action of the α2 agonists on sympathetic outflow.'],
    clinic: [
      '<b>Lateral medullary (Wallenberg) syndrome:</b> crossed sensory loss, Horner syndrome, ataxia, dysphagia, vertigo — the classic anatomical teaching lesion.',
      '<b>Opioid overdose:</b> death from pre-Bötzinger/medullary respiratory depression; <b>brain death</b> is defined by irreversible loss of medullary respiratory drive (apnoea test) plus brainstem reflexes.',
      '<b>Low heart-rate variability</b> — an index of vagal tone — is associated with depression, PTSD, and all-cause mortality; it is the most accessible autonomic measure in psychological research.'
    ],
    tests: [
      ['Heart-rate variability (RMSSD, HF power, RSA)', 'Vagal tone; respiration rate must be controlled or reported, since HF-HRV is confounded by breathing rate — use paced breathing or report respiration as a covariate.'],
      ['Baroreflex sensitivity, orthostatic testing', 'Autonomic regulation quantified in ms/mmHg.'],
      ['Respiratory sinus arrhythmia during emotion tasks', 'Porges’ polyvagal framework is widely used in psychology, but note that its evolutionary claims are contested — the measures are sound, the theory is not settled.'],
      ['Swallow and gag assessment, cranial nerve exam', 'Direct medullary function.']
    ],
    nums: [
      ['≈ 80 %', 'of vagal fibres are afferent', 'The interoceptive superhighway.'],
      ['pre-Bötzinger', 'respiratory pacemaker', 'A few hundred neurons generating the breathing rhythm.'],
      ['20–50 ms', 'RMSSD normal adult range', 'Highly age-dependent; always age-normalise.']
    ],
    refs: ['Feldman JL & Del Negro CA (2006). Looking for inspiration: new perspectives on respiratory rhythm. <em>Nat Rev Neurosci</em>.', 'Thayer JF & Lane RD (2009). Claude Bernard and the heart–brain connection. <em>Neurosci Biobehav Rev</em>.']
  });

  add({
    id: 'cerebellum', name: 'Cerebellum', latin: 'Cerebellum', group: 'Cerebellum',
    ba: '—', mesh: 'cerebellum',
    tag: 'Eighty per cent of the brain’s neurons in ten per cent of its volume — a forward model for movement, and for thought.',
    anatomy: [
      'Two hemispheres plus the midline <b>vermis</b>; three lobes (anterior, posterior, flocculonodular) and ten lobules (I–X, Larsell). Functional divisions: <b>vestibulocerebellum</b> (flocculonodular — balance, VOR), <b>spinocerebellum</b> (vermis/paravermis — posture, gait, limb coordination), <b>cerebrocerebellum</b> (lateral hemispheres — planning, timing, cognition).',
      'Deep nuclei: dentate (lateral, cognitive/cerebrocerebellar), interposed (emboliform + globose), fastigial (vermal); all output leaves through them.',
      'Three peduncles: middle (cortical input via pons), inferior (spinal/vestibular/olivary), superior (output to thalamus and red nucleus).',
      'A topographic double representation: the anterior lobe and lobule VIII hold sensorimotor maps, while lobules VI, VII (Crus I/II) and IX/X carry prefrontal, language, working-memory and default-mode representations (Buckner’s functional parcellation).'
    ],
    cyto: [
      'A crystalline three-layer cortex repeated identically everywhere: granule cells (the most numerous neuron in the brain) → parallel fibres → <b>Purkinje cells</b> (the sole output of cerebellar cortex, GABAergic) with climbing-fibre input from the inferior olive, plus Golgi, stellate, basket and unipolar brush interneurons.',
      'Each Purkinje cell receives ~200 000 parallel-fibre synapses and exactly <b>one</b> climbing fibre — the architecture behind Marr–Albus–Ito supervised-learning models, with climbing-fibre-driven LTD as the error signal.'
    ],
    circuit: [
      { dir: 'Afferent', txt: 'Cortex → pontine nuclei → contralateral cerebellar cortex (mossy fibres); inferior olive → climbing fibres (error/teaching signal); spinocerebellar and vestibular afferents.' },
      { dir: 'Efferent', txt: 'Purkinje → deep nuclei → superior cerebellar peduncle → contralateral thalamus (VL/VPLo, and MD/VA for cognitive loops) → cortex; also to red nucleus and vestibular nuclei. The double crossing means cerebellar signs are <em>ipsilateral</em> to the lesion.' },
      { dir: 'Loop', txt: 'Closed-loop cerebro-cerebellar circuits: prefrontal cortex ↔ lobule VII via dentate and thalamus, mapping the same parallel-loop principle found in the basal ganglia — the anatomy that makes a "cognitive cerebellum" possible.' }
    ],
    fn: [
      '<b>Internal forward models:</b> predicts the sensory consequences of action, enabling feedforward correction faster than sensory feedback allows; also cancels self-generated sensation (why you cannot tickle yourself — and a model for how corollary-discharge failure could produce passivity phenomena in schizophrenia).',
      '<b>Timing:</b> sub-second interval timing and rhythm; eyeblink conditioning is the best-characterised mammalian learning paradigm and is cerebellum-dependent.',
      '<b>Motor learning:</b> adaptation (prism, force-field, saccade gain) with climbing-fibre error signals — implicit, fast and cerebellum-specific.',
      '<b>Cognitive and affective function:</b> Schmahmann’s dysmetria-of-thought hypothesis — the cerebellum modulates cognition the way it modulates movement, smoothing and calibrating rather than generating.'
    ],
    chem: ['Glutamatergic granule/mossy/climbing input with GABAergic Purkinje output; parallel-fibre LTD is mGluR- and PKC-dependent. Alcohol is selectively toxic to anterior-vermal Purkinje cells — hence alcoholic cerebellar degeneration with a wide-based gait and relatively spared arms.'],
    clinic: [
      '<b>Motor syndrome:</b> ipsilateral dysmetria, intention tremor, dysdiadochokinesia, scanning dysarthria, gaze-evoked nystagmus, hypotonia, wide-based gait. Vermal lesions → truncal ataxia; hemispheric → limb ataxia.',
      '<b>Cerebellar cognitive affective syndrome</b> (Schmahmann & Sherman, 1998): executive dysfunction, impaired visuospatial organisation, linguistic difficulties (agrammatism, dysprosodia) and blunted or disinhibited affect — from posterior lobe and vermal lesions, and routinely mistaken for a primary psychiatric disorder.',
      '<b>Posterior fossa syndrome / cerebellar mutism</b> after paediatric tumour resection: transient mutism then dysarthria, with lasting cognitive and affective sequelae.',
      'Cerebellar abnormalities are reported in autism (Purkinje cell loss is the most consistent neuropathological finding in ASD), schizophrenia (cognitive dysmetria — Andreasen’s cortico-cerebellar-thalamic-cortical circuit model) and dyslexia (contested).'
    ],
    tests: [
      ['Finger-to-nose, heel-shin, rapid alternating movements, ICARS/SARA', 'Standardised ataxia rating scales give quantitative severity for change measurement.'],
      ['Eyeblink conditioning', 'Cerebellum-dependent associative learning; measurable with EMG, no verbal demand — usable across ages and species.'],
      ['Prism adaptation / force-field adaptation', 'Implicit motor learning rate as a continuous parameter.'],
      ['Sub-second interval timing, rhythm reproduction, tapping variability', 'Cerebellar clock function; tapping variability decomposes into clock vs motor-implementation variance (Wing–Kristofferson) — an elegant psychometric decomposition.'],
      ['CCAS Scale (Schmahmann syndrome scale)', 'A purpose-built bedside battery for cerebellar cognitive-affective syndrome, with published cut-offs — use it rather than a generic screener.']
    ],
    caution: 'Cerebellar patients are frequently referred to psychiatry first. If a patient presents with new executive difficulty, flattened or labile affect and dysprosodic speech, examine gait, eye movements and rapid alternating movements before concluding a primary mood disorder — the CCAS Scale takes ten minutes.',
    nums: [
      ['≈ 69 × 10⁹', 'neurons', '~80 % of all brain neurons (Herculano-Houzel) — in ~10 % of brain volume.'],
      ['≈ 200 000', 'parallel-fibre synapses per Purkinje cell', 'Against exactly one climbing fibre.'],
      ['≈ 15 × 10⁶', 'Purkinje cells', 'The sole output neurons of the cerebellar cortex.'],
      ['1998', 'CCAS first described', 'Schmahmann & Sherman, <em>Brain</em> — 20 patients who changed the field.']
    ],
    refs: [
      'Schmahmann JD & Sherman JC (1998). The cerebellar cognitive affective syndrome. <em>Brain</em>.',
      'Ito M (2008). Control of mental activities by internal models in the cerebellum. <em>Nat Rev Neurosci</em>.',
      'Buckner RL et al. (2011). The organization of the human cerebellum estimated by intrinsic functional connectivity. <em>J Neurophysiol</em>.',
      'Herculano-Houzel S (2009). The human brain in numbers. <em>Front Hum Neurosci</em>.'
    ]
  });

  add({
    id: 'pituitary', name: 'Pituitary gland & pineal', latin: 'Hypophysis, corpus pineale', group: 'Neuroendocrine',
    ba: '—', mesh: 'pituitary',
    tag: 'Two small glands translating neural activity into hormones — one governing the endocrine system, the other keeping the clock.',
    anatomy: [
      '<b>Pituitary:</b> anterior lobe (adenohypophysis — epithelial, from Rathke’s pouch, controlled by hypothalamic releasing hormones through the portal system) and posterior lobe (neurohypophysis — axon terminals of supraoptic and paraventricular magnocellular neurons), sitting in the sella turcica below the optic chiasm.',
      '<b>Pineal:</b> in the quadrigeminal cistern behind the third ventricle; innervated indirectly from the SCN via the paraventricular nucleus → superior cervical ganglion → sympathetic input, so melatonin secretion is a sympathetic read-out of the circadian clock.'
    ],
    cyto: ['Anterior pituitary: somatotrophs, lactotrophs, corticotrophs, thyrotrophs, gonadotrophs. Pineal: melatonin-synthesising pinealocytes (AANAT is the rate-limiting, light-suppressed enzyme); calcification is common with age and is a radiological landmark.'],
    circuit: [
      { dir: 'Afferent', txt: 'Hypothalamic releasing hormones (CRH, TRH, GnRH, GHRH, somatostatin, dopamine) via the hypophysial portal vessels; magnocellular axons for the posterior lobe; sympathetic input to the pineal.' },
      { dir: 'Efferent', txt: 'ACTH, TSH, LH/FSH, GH, prolactin into the systemic circulation; oxytocin and vasopressin from the posterior lobe; melatonin from the pineal, acting on MT1/MT2 receptors including in the SCN itself (feedback).' }
    ],
    fn: [
      'Final common pathway of the <b>HPA, HPT and HPG axes</b>: the point where psychological stress becomes measurable endocrinology.',
      'Melatonin is the <b>circadian phase marker</b> ("hormone of darkness"): dim-light melatonin onset is the gold-standard phase measure, and evening light — especially short-wavelength screen light — suppresses it and delays phase.',
      'Prolactin is unique in being tonically <em>inhibited</em> by hypothalamic dopamine, which is why D2 blockade raises it.'
    ],
    chem: ['Peptide hormones plus the indoleamine melatonin; MT1/MT2 agonism is the mechanism of ramelteon and of agomelatine (combined with 5-HT2C antagonism).'],
    clinic: [
      '<b>Antipsychotic-induced hyperprolactinaemia</b> (risperidone, amisulpride, first-generation agents): amenorrhoea, galactorrhoea, gynaecomastia, sexual dysfunction, reduced bone mineral density — ask, measure, and consider aripiprazole (a partial agonist that lowers prolactin).',
      '<b>Cushing syndrome:</b> psychiatric presentation in the majority — depression, irritability, psychosis, cognitive impairment with hippocampal volume loss that partially reverses after cure. A demonstration that cortisol excess causes psychiatric illness, not merely accompanies it.',
      '<b>Hypothyroidism:</b> depression, slowing, poor concentration — TSH should be checked in every first presentation of depression or cognitive complaint.',
      '<b>Pineal region tumours:</b> Parinaud syndrome, precocious or delayed puberty, hydrocephalus.',
      '<b>Delayed sleep–wake phase disorder</b> in adolescents: physiological phase delay plus light exposure; treat with timed low-dose melatonin (0.5 mg, 4–6 h before DLMO) and morning light, not hypnotics.'
    ],
    tests: [
      ['Dim-light melatonin onset (DLMO), salivary melatonin series', 'Gold-standard circadian phase; requires < 30 lux and controlled sampling.'],
      ['Prolactin, TSH/free T4, morning cortisol, HbA1c', 'Baseline endocrine screen that changes psychiatric management more often than any neuroimaging.'],
      ['Overnight dexamethasone suppression, 24-h urinary free cortisol, late-night salivary cortisol', 'Cushing screening — remember depression itself causes mild non-suppression (pseudo-Cushing).'],
      ['Actigraphy + sleep diary (≥ 7 days), MEQ', 'Phase and regularity; compute social jetlag and sleep regularity index as continuous variables.']
    ],
    caution: 'Endocrine confounds are the most common reversible cause of an apparently psychiatric or cognitive presentation. Before interpreting a neuropsychological profile, document thyroid status, B12/folate, vitamin D, glucose, and current medication — a point of professional practice as much as neuroscience.',
    nums: [
      ['≈ 0.5 g', 'pituitary mass', 'Sella turcica; adjacent optic chiasm means bitemporal hemianopia with expansion.'],
      ['0.5–3 mg', 'chronobiotic melatonin dose', 'Timing matters far more than dose; high doses act as hypnotics, not phase-shifters.'],
      ['< 30 lux', 'DLMO sampling requirement', 'Ordinary room light suppresses melatonin.']
    ],
    refs: [
      'Lewy AJ et al. (1980). Light suppresses melatonin secretion in humans. <em>Science</em>.',
      'Starkman MN et al. (1999). Decrease in cortisol reverses human hippocampal atrophy following treatment of Cushing’s disease. <em>Biol Psychiatry</em>.'
    ]
  });

  add({
    id: 'ventricles', name: 'Ventricular system & CSF', latin: 'Systema ventriculare, liquor cerebrospinalis', group: 'Neuroendocrine',
    ba: '—', mesh: 'ventricles',
    tag: 'A 150 ml fluid compartment that buoys the brain, clears its waste overnight, and whose enlargement was psychiatry’s first hard structural finding.',
    anatomy: ['Lateral ventricles (frontal horn, body, atrium, occipital and temporal horns) → foramina of Monro → third ventricle → cerebral aqueduct → fourth ventricle → foramina of Luschka and Magendie → subarachnoid space; absorbed at arachnoid granulations and along perivascular and lymphatic routes.'],
    cyto: ['Choroid plexus (modified ependyma with tight junctions — the blood–CSF barrier) produces ~500 ml/day against a standing volume of ~150 ml, i.e. roughly three to four turnovers daily. Ependymal cilia direct flow; the subventricular zone is a neurogenic niche.'],
    circuit: [
      { dir: 'Loop', txt: '<b>Glymphatic clearance:</b> CSF enters along periarterial spaces, exchanges with interstitial fluid via aquaporin-4 on astrocyte endfeet, and exits perivenously. Clearance increases markedly during slow-wave sleep, when the interstitial space expands — the mechanistic link between sleep loss and amyloid accumulation (Xie et al., 2013).' }
    ],
    fn: [
      'Mechanical buoyancy (effective brain weight falls from ~1 400 g to ~50 g), volume buffering, immune surveillance, and metabolite clearance including amyloid-β and tau.',
      'CSF is the biomarker medium: Aβ42/Aβ40 ratio, p-tau181/217 and total tau now define Alzheimer’s disease biologically (the amyloid/tau/neurodegeneration framework), and plasma p-tau217 is rapidly replacing lumbar puncture.'
    ],
    chem: ['Low protein, low potassium, glucose ~60 % of plasma; contains monoamine metabolites (5-HIAA, HVA, MHPG) used in the classical psychiatric CSF studies.'],
    clinic: [
      '<b>Ventricular enlargement in schizophrenia</b> (Johnstone et al., 1976 — the first CT study) opened biological psychiatry; the effect is real but small (d ≈ 0.4–0.7), non-specific, and partly progressive, with antipsychotic exposure contributing.',
      '<b>Normal-pressure hydrocephalus:</b> the triad of gait apraxia, urinary incontinence and subcortical cognitive slowing ("wet, wacky, wobbly") — potentially reversible with shunting, and regularly missed as "dementia with depression".',
      '<b>Obstructive hydrocephalus</b> from aqueductal stenosis or posterior fossa mass; <b>idiopathic intracranial hypertension</b> with papilloedema.',
      '<b>Ex vacuo</b> enlargement reflects atrophy, not pressure — a distinction that must be made before shunting.'
    ],
    tests: [
      ['Ventricle-to-brain ratio, Evans index (< 0.3 normal)', 'Simple, reliable structural indices; VBR was the classic quantitative measure in schizophrenia research.'],
      ['Gait analysis before/after CSF tap test (30–50 ml)', 'The best predictor of shunt response in NPH; quantify with timed walk and step length, not clinical impression.'],
      ['CSF/plasma biomarker panel (Aβ42/40, p-tau217, NfL)', 'Biological staging of neurodegeneration; NfL is a non-specific axonal-damage marker useful for ruling out neurodegeneration in psychiatric differentials.'],
      ['Sleep quality/duration as a covariate in biomarker studies', 'Glymphatic clearance depends on slow-wave sleep — an often-ignored confound.']
    ],
    nums: [
      ['≈ 150 ml', 'total CSF volume', 'With ~500 ml produced per day.'],
      ['≈ 50 g', 'effective brain weight in CSF', 'Down from ~1 400 g by buoyancy.'],
      ['+60 %', 'interstitial space in sleep', 'The glymphatic mechanism of overnight clearance.'],
      ['d ≈ 0.4–0.7', 'ventricular enlargement in schizophrenia', 'Real, replicated, non-specific — a lesson in effect sizes.']
    ],
    refs: [
      'Johnstone EC et al. (1976). Cerebral ventricular size and cognitive impairment in chronic schizophrenia. <em>Lancet</em>.',
      'Xie L et al. (2013). Sleep drives metabolite clearance from the adult brain. <em>Science</em>.',
      'Iliff JJ et al. (2012). A paravascular pathway facilitates CSF flow. <em>Sci Transl Med</em>.'
    ]
  });

})(window.ATLAS);
