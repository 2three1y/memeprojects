(() => {
  "use strict";
  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
  const select = $("#language-select");
  const form = $("#verdict-form");
  const panel = $("#question-panel");
  const question = $("#question-text");
  const verdict = $("#verdict");
  const result = $("#evaluation-result");
  const live = document.createElement("div");
  live.className = "sr-only";
  live.setAttribute("role", "status");
  live.setAttribute("aria-live", "polite");
  live.setAttribute("aria-atomic", "true");
  document.body.appendChild(live);

  const fallback = {
    title: "MemeProjects — Your Chaos Tool Suite", language: "Language", choose: "Choose language",
    mode: "Choose an app mode", modeHelp: "Switch between modes.", cheater: "RU a Cheater?",
    persona: "Persona Evaluator", chaos: "Choose your chaos level", chaosHelp: "This setting controls intensity and language.",
    standard: "Standard", spicy: "Spicy", extra: "Extra Spicy", style: "Verdict style", instant: "Instant Verdict",
    questions: "Question Mode", questionMode: "Question Mode", yes: "Yes, obviously", no: "No, I am pure",
    reveal: "Reveal my verdict", official: "The official unofficial verdict", who: "Who are we evaluating?",
    goodBoy: "Good Boy", goodGirl: "Good Girl", badBoy: "Bad Boy", badGirl: "Bad Girl", evaluate: "Evaluate persona",
    awaiting: "Awaiting evidence...", evaluation: "Awaiting evaluation...",
    q: "Have you ever replied ‘lol’ while experiencing absolutely no joy?",
    roast: "Verdict recorded: chaotic, suspicious, and inconclusive.", skip: "Skip to main content",
    eyebrow: "A highly unscientific investigation suite", tagline: "Explore RU a Cheater?, Persona Evaluator, and chaos modes for every verdict, evaluation, and questionable decision.",
    footerTitle: "Inspect the Crime Scene", footerText: "The intern shipped the vibes, the tests are emotionally unavailable, and the open-source chaos is proudly accepting witnesses.", github: "View the chaos on GitHub",
    switchedCheater: "Switched to RU a Cheater mode", switchedPersona: "Switched to Persona Evaluator mode"
  };
  const packs = {
    es: { title: "MemeProjects — ¿Eres un infiel? y Evaluador de Persona", language: "Idioma", choose: "Elegir idioma", mode: "Elige un modo", modeHelp: "Cambia entre el detector de infidelidad y el evaluador de personalidad.", cheater: "¿Eres un infiel?", persona: "Evaluador de Persona", chaos: "Elige tu nivel de caos", chaosHelp: "Esta opción controla la intensidad y el idioma.", standard: "Estándar", spicy: "Picante", extra: "Extra picante", style: "Estilo del veredicto", instant: "Veredicto instantáneo", questions: "Modo preguntas", questionMode: "Modo preguntas", yes: "Sí, obviamente", no: "No, soy puro/a", reveal: "Revelar mi veredicto", official: "El veredicto oficial no oficial", who: "¿A quién evaluamos?", goodBoy: "Buen chico", goodGirl: "Buena chica", badBoy: "Mal chico", badGirl: "Mala chica", evaluate: "Evaluar personalidad", awaiting: "Esperando pruebas...", evaluation: "Esperando evaluación...", q: "¿Alguna vez respondiste «jaja» sin sentir alegría?", roast: "Veredicto registrado: caótico, sospechoso e inconcluso.", skip: "Saltar al contenido principal", eyebrow: "Una investigación muy poco científica", tagline: "Explora ¿Eres un infiel?, el Evaluador de Persona y modos de caos para cada veredicto.", footerTitle: "Inspecciona la escena del crimen", switchedCheater: "Cambiado al modo ¿Eres un infiel?", switchedPersona: "Cambiado al modo Evaluador de Persona" },
    fr: { title: "MemeProjects — Infidèle ? et évaluateur de personnalité", language: "Langue", choose: "Choisir la langue", mode: "Choisir un mode", cheater: "Infidèle ?", persona: "Évaluateur de personnalité", chaos: "Choisissez votre niveau de chaos", standard: "Classique", spicy: "Piquant", extra: "Très piquant", style: "Style du verdict", instant: "Verdict instantané", questions: "Mode questions", questionMode: "Mode questions", yes: "Oui, évidemment", no: "Non, je suis pur(e)", reveal: "Révéler mon verdict", official: "Le verdict officiel non officiel", who: "Qui évaluons-nous ?", evaluate: "Évaluer la personnalité", awaiting: "En attente de preuves…", evaluation: "En attente de l’évaluation…", q: "Avez-vous déjà répondu « lol » sans joie ?", roast: "Verdict enregistré : chaotique, suspect et inconclusif.", switchedCheater: "Mode Infidèle activé", switchedPersona: "Mode évaluateur de personnalité activé" }
  };
  let currentLang = "en", currentQuestion = "";
  const options = [...select.options].map(o => [o.value, o.textContent]);
  const tr = () => ({ ...fallback, ...(packs[currentLang] || {}) });
  function relabelOptions() { const keep = currentLang; select.replaceChildren(...options.map(([code, label]) => { const o = document.createElement("option"); o.value = code; o.textContent = `${label} — ${code}`; o.selected = code === keep; return o; })); select.value = keep; }
  function apply(code) {
    currentLang = options.some(([value]) => value === code) ? code : "en";
    document.documentElement.lang = currentLang;
    const x = tr();
    document.title = x.title;
    $$('[data-i18n]').forEach(e => { if (x[e.dataset.i18n]) e.textContent = x[e.dataset.i18n]; });
    relabelOptions(); select.setAttribute("aria-label", x.choose);
    question.textContent = currentQuestion || x.q; verdict.textContent = x.awaiting; result.textContent = x.evaluation; update();
  }
  function update() { const q = $("input[name=pace]:checked", form)?.value === "questions"; panel.hidden = !q; panel.setAttribute("aria-hidden", String(!q)); $("#verdict-button").textContent = q ? tr().questions : tr().reveal; if (q && !currentQuestion) { currentQuestion = tr().q; question.textContent = currentQuestion; } }
  function output() { verdict.textContent = tr().roast; verdict.focus(); }
  select.addEventListener("change", e => apply(e.target.value)); form.addEventListener("submit", e => { e.preventDefault(); output(); }); $("#yes-button").addEventListener("click", output); $("#no-button").addEventListener("click", output); $("#evaluate-button").addEventListener("click", () => { result.textContent = tr().roast; result.focus(); });
  $$('input[name="pace"]').forEach(i => i.addEventListener("change", update));
  $$('input[name="primary-mode"]').forEach(i => i.addEventListener("change", e => { const persona = e.target.value === "evaluator"; $("#cheater-panel").hidden = persona; $("#evaluator-panel").hidden = !persona; $("#cheater-panel").setAttribute("aria-hidden", String(persona)); $("#evaluator-panel").setAttribute("aria-hidden", String(!persona)); live.textContent = persona ? tr().switchedPersona : tr().switchedCheater; }));
  apply("en");
})();