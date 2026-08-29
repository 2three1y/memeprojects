(() => {
  "use strict";

  const fallbackRoasts = {
    standard: ["Your alibi has the structural integrity of wet toast.", "Innocent-ish. The jury is checking your search history."],
    spicy: ["Your story has more plot holes than a bad late-night text and somehow fewer facts.", "Not guilty, but your vibes have requested legal representation and a glass of water."],
    "extra-spicy": ["Your alibi is a flaming dumpster wearing a fake mustache, and somehow it still thinks it is convincing.", "The court finds you guilty of weaponized nonsense and making everyone read the receipts."]
  };
  const fallbackClosers = {
    spicy: ["The jury is leaning spicy, but it has not yet located your common sense."],
    "extra-spicy": ["The verdict is feral enough to require a waiver, a helmet, and one deeply concerned chaperone."]
  };
  let roastPools = fallbackRoasts;
  let modeClosers = fallbackClosers;
  let praises = ["Counterpoint: you may simply be a lovable disaster.", "Good news: your chaos has excellent comedic timing."];
  let extraSpicyVerdicts = ["The courtroom has been replaced by a tiny circus tent, and you are both the headline act and the evidence."];
  const evaluatorResults = { boy: ["Good Boy confirmed. The council awards you a gold star and one extremely crunchy treat."], girl: ["Good Girl confirmed. The crown is secure and the vibes are immaculate."] };
  const questions = ["Have you ever replied ‘lol’ while experiencing no joy?", "Did you say ‘I’m five minutes away’ from a location that was not five minutes away?", "Have you ever hidden a snack from your own future self?", "Do you maintain a backup excuse for your primary excuse?"];
  const form = document.querySelector("#verdict-form"), verdict = document.querySelector("#verdict"), questionPanel = document.querySelector("#question-panel"), questionText = document.querySelector("#question-text"), verdictButton = document.querySelector("#verdict-button"), swear = document.querySelector("#swear-toggle"), extraSwear = document.querySelector("#extra-swear-toggle"), evaluationResult = document.querySelector("#evaluation-result"), cheaterPanel = document.querySelector("#cheater-panel"), evaluatorPanel = document.querySelector("#evaluator-panel");
  const recent = [];
  const pickFresh = (items, excluded = []) => { const list = Array.isArray(items) && items.length ? items : ["No verdict available yet."]; const available = list.filter((item) => !excluded.includes(item)); return (available.length ? available : list)[Math.floor(Math.random() * (available.length ? available.length : list.length))]; };
  const remember = (text) => { recent.push(text); if (recent.length > 6) recent.shift(); };
  const focusResult = (node) => { node.focus({ preventScroll: true }); node.scrollIntoView({ block: "nearest" }); };
  function announce(answer = "") {
    const mode = form.elements.mode.value, pace = form.elements.pace.value;
    const parts = [pickFresh(roastPools[mode], recent)];
    if (swear.checked) parts.push(pickFresh(praises, recent));
    if (modeClosers[mode]) parts.push(pickFresh(modeClosers[mode], recent));
    if (mode === "extra-spicy" && extraSwear.checked) parts.push(pickFresh(extraSpicyVerdicts, recent));
    if (pace === "questions") parts.push(answer === "yes" ? "The witness has confessed to questionable vibes." : "The witness denies everything with suspicious confidence.");
    const result = parts.join(" "); remember(result); verdict.textContent = result; focusResult(verdict);
  }
  function updateMode({ moveFocus = false } = {}) {
    const questionsMode = form.elements.pace.value === "questions";
    questionPanel.hidden = !questionsMode; questionPanel.setAttribute("aria-hidden", String(!questionsMode));
    verdictButton.textContent = questionsMode ? "Evaluate my answer" : "Reveal my verdict";
    if (questionsMode) questionText.textContent = pickFresh(questions, [questionText.textContent]);
    if (moveFocus && questionsMode) document.querySelector("#yes-button").focus();
  }
  function evaluate() { const title = form.closest("main").querySelector('input[name="good-title"]:checked').value; evaluationResult.textContent = pickFresh(evaluatorResults[title]); focusResult(evaluationResult); }
  function switchPrimaryMode(event) {
    const evaluator = event.target.value === "evaluator"; cheaterPanel.hidden = evaluator; evaluatorPanel.hidden = !evaluator;
    cheaterPanel.setAttribute("aria-hidden", String(evaluator)); evaluatorPanel.setAttribute("aria-hidden", String(!evaluator));
    const target = evaluator ? evaluatorPanel.querySelector("input") : form.querySelector("input");
    if (target) target.focus();
  }
  form.addEventListener("submit", (event) => { event.preventDefault(); announce( form.elements.pace.value === "questions" ? (form.querySelector('input[name="question-answer"]:checked')?.value || "") : ""); });
  document.querySelectorAll('input[name="pace"]').forEach((radio) => radio.addEventListener("change", () => updateMode({ moveFocus: true })));
  const answer = (value) => { let input = form.querySelector('input[name="question-answer"]'); if (!input) { input = document.createElement("input"); input.type = "hidden"; input.name = "question-answer"; form.append(input); } input.value = value; questionText.textContent = pickFresh(questions, [questionText.textContent]); announce(value); };
  document.querySelector("#yes-button").addEventListener("click", () => answer("yes"));
  document.querySelector("#no-button").addEventListener("click", () => answer("no"));
  document.querySelector("#evaluate-button").addEventListener("click", evaluate);
  swear.addEventListener("change", () => { extraSwear.disabled = !swear.checked; if (!swear.checked) extraSwear.checked = false; });
  extraSwear.disabled = !swear.checked;
  document.querySelectorAll('input[name="primary-mode"]').forEach((radio) => radio.addEventListener("change", switchPrimaryMode));
  updateMode();
  fetch("roasts.json", { cache: "no-cache" }).then((response) => response.ok ? response.json() : Promise.reject(new Error("roasts unavailable"))).then((data) => {
    roastPools = { standard: data.standard || fallbackRoasts.standard, spicy: data.spicy || fallbackRoasts.spicy, "extra-spicy": data["extra-spicy"] || fallbackRoasts["extra-spicy"] };
    modeClosers = { spicy: data.spicyVerdicts || fallbackClosers.spicy, "extra-spicy": data.extraSpicyVerdicts || fallbackClosers["extra-spicy"] };
    praises = data.praises || praises; extraSpicyVerdicts = data.extraSpicyVerdicts || extraSpicyVerdicts;
  }).catch(() => { /* Keep the small bundled fallback available offline. */ });
})();
