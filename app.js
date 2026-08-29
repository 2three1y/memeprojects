(() => {
  "use strict";
  const roasts = {
    standard: ["Your alibi has the structural integrity of wet toast.", "Innocent-ish. The jury is checking your search history.", "You are not a cheater; you are simply suspiciously well-organized.", "Verdict: emotionally buffering."],
    spicy: ["Your story has more plot holes than a bad late-night text.", "Not guilty, but your vibes have requested legal representation.", "The evidence is spicy and your explanation is undercooked.", "You are innocent until the group chat votes otherwise.", "Your alibi walked in, saw the evidence, and immediately asked for a snack."],
    "extra-spicy": ["Your alibi is a flaming dumpster wearing a fake mustache, and somehow it still thinks it is convincing.", "The court finds you guilty of weaponized nonsense, catastrophic flirting, and making everyone read the receipts.", "Your red flags formed a union, hired a lawyer, and filed a complaint about your personality.", "This is not an alibi; it is a cry for help typed with both thumbs at 2:17 AM.", "Your excuses are doing parkour across the truth and landing directly in the evidence locker.", "The vibes are so unhinged that even the lie detector requested hazard pay."]
  };
  const praises = ["Counterpoint: you may simply be a lovable disaster.", "Good news: your chaos has excellent comedic timing.", "Your honesty is suspiciously refreshing."];
  const questions = ["Have you ever replied ‘lol’ while experiencing no joy?", "Did you say ‘I’m five minutes away’ from a location that was not five minutes away?", "Have you ever hidden a snack from your own future self?", "Do you maintain a backup excuse for your primary excuse?"];
  const form = document.querySelector("#verdict-form"), verdict = document.querySelector("#verdict"), questionPanel = document.querySelector("#question-panel"), questionText = document.querySelector("#question-text"), verdictButton = document.querySelector("#verdict-button"), swear = document.querySelector("#swear-toggle"), extraSwear = document.querySelector("#extra-swear-toggle");
  const pick = (items) => items[Math.floor(Math.random() * items.length)];
  const settings = () => ({ mode: form.elements.mode.value, pace: form.elements.pace.value });
  function announce() { const s = settings(); let result = pick(roasts[s.mode]); if (swear.checked && s.mode === "standard") result += " " + pick(praises); if (extraSwear.checked && s.mode !== "standard") result += " Damn, the vibes are complicated."; verdict.textContent = result; verdict.focus(); }
  function updateMode() { const questionsMode = form.elements.pace.value === "questions"; questionPanel.hidden = !questionsMode; verdictButton.textContent = questionsMode ? "Skip to verdict" : "Reveal my verdict"; if (questionsMode) questionText.textContent = pick(questions); }
  form.addEventListener("submit", (event) => { event.preventDefault(); announce(); }); form.elements.pace.forEach((radio) => radio.addEventListener("change", updateMode));
  document.querySelector("#yes-button").addEventListener("click", () => { questionText.textContent = pick(questions); announce(); }); document.querySelector("#no-button").addEventListener("click", () => { questionText.textContent = pick(questions); announce(); });
  swear.addEventListener("change", () => { extraSwear.disabled = !swear.checked; if (!swear.checked) extraSwear.checked = false; }); extraSwear.disabled = true;
})();
