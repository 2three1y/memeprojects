(() => {
  "use strict";

  const fallbackRoasts = {
    standard: ["Your alibi has the structural integrity of wet toast.", "Innocent-ish. The jury is checking your search history."],
    spicy: ["Your story has more plot holes than a bad late-night text and somehow fewer facts.", "Your alibi entered wearing sunglasses indoors. Not proof, but deeply unhelpful."],
    "extra-spicy": ["Your alibi is a flaming dumpster wearing a fake mustache, and it still thinks it is convincing.", "Your red flags formed a union, hired a lawyer, and filed a complaint about your personality."]
  };
  const $ = (selector, root = document) => root.querySelector(selector);
  const form = $("#verdict-form");
  const verdict = $("#verdict");
  const questionPanel = $("#question-panel");
  const questionText = $("#question-text");
  const button = $("#verdict-button");
  const result = $("#evaluation-result");
  const cheater = $("#cheater-panel");
  const evalPanel = $("#evaluator-panel");
  const recent = [];
  const dataReady = fetch("roasts.json").then(response => {
    if (!response.ok) throw new Error(`roasts.json returned ${response.status}`);
    return response.json();
  }).catch(() => fallbackRoasts);

  const pick = (items, avoid = []) => {
    const list = Array.isArray(items) && items.length ? items : ["No verdict available yet."];
    const available = list.filter(item => !avoid.includes(item));
    return (available.length ? available : list)[Math.floor(Math.random() * (available.length ? available : list).length)];
  };
  const chaosLevel = () => $("input[name=mode]:checked", form)?.value || "standard";
  const announce = async answer => {
    const data = await dataReady;
    const mode = chaosLevel();
    const parts = [pick(data[mode] || fallbackRoasts[mode], recent)];
    if (mode !== "standard") {
      const closerKey = mode === "extra-spicy" ? "extraSpicyVerdicts" : "spicyVerdicts";
      parts.push(pick(data[closerKey], recent));
    }
    if (answer) parts.push(answer === "yes" ? "The witness has confessed to questionable vibes." : "The witness denies everything with suspicious confidence.");
    const text = parts.join(" ");
    recent.push(text);
    if (recent.length > 8) recent.shift();
    verdict.textContent = text;
    verdict.focus();
  };
  const update = focus => {
    const questions = $("input[name=pace]:checked", form)?.value === "questions";
    questionPanel.hidden = !questions;
    questionPanel.setAttribute("aria-hidden", String(!questions));
    button.textContent = questions ? "Evaluate my answer" : "Reveal my verdict";
    if (questions) questionText.textContent = pick(["Have you ever replied ‘lol’ while experiencing no joy?", "Did you say ‘I’m five minutes away’ from a location that was not five minutes away?", "Have you ever hidden a snack from your own future self?", "Do you maintain a backup excuse for your primary excuse?"], [questionText.textContent]);
    if (focus && questions) $("#yes-button").focus();
  };
  const answer = value => { form.elements.questionAnswer.value = value; announce(value); };
  form.addEventListener("submit", event => { event.preventDefault(); announce($("input[name=pace]:checked", form)?.value === "questions" ? form.elements.questionAnswer.value : ""); });
  document.querySelectorAll('input[name="pace"]').forEach(input => input.addEventListener("change", () => update(true)));
  $("#yes-button").addEventListener("click", () => answer("yes"));
  $("#no-button").addEventListener("click", () => answer("no"));
  $("#evaluate-button").addEventListener("click", async () => {
    const data = await dataReady;
    const mode = chaosLevel();
    const who = $("input[name='evaluator-title']:checked")?.value || "good-boy";
    const pool = data.evaluator?.[mode]?.[who];
    result.textContent = pick(pool || data[mode] || fallbackRoasts[mode]);
    result.focus();
  });
  document.querySelectorAll('input[name="primary-mode"]').forEach(input => input.addEventListener("change", event => {
    const evaluator = event.target.value === "evaluator";
    cheater.hidden = evaluator; evalPanel.hidden = !evaluator;
    cheater.setAttribute("aria-hidden", String(evaluator)); evalPanel.setAttribute("aria-hidden", String(!evaluator));
    (evaluator ? $("#evaluate-button") : form.querySelector("input")).focus();
  }));
  update(false);
})();
