(() => {
  "use strict";
  const roastPools = {
    standard: ["Your alibi has the structural integrity of wet toast.", "Innocent-ish. The jury is checking your search history.", "You are not a cheater; you are simply suspiciously well-organized.", "Verdict: emotionally buffering."],
    spicy: ["Your story has more plot holes than a bad late-night text.", "Not guilty, but your vibes have requested legal representation.", "The evidence is spicy and your explanation is undercooked.", "You are innocent until the group chat votes otherwise."],
    "extra-spicy": ["The verdict is feral: your alibi just got escorted out by its own red flags.", "Absolutely questionable. Even your excuses need an excuse and a witness.", "Your red flags formed a committee, elected a chairperson, and subpoenaed your group chat.", "Guilty of making this dramatically messier than it needed to be. The courtroom is exhausted."]
  };
  const praises = ["Counterpoint: you may simply be a lovable disaster.", "Good news: your chaos has excellent comedic timing.", "Your honesty is suspiciously refreshing."];
  const questions = ["Have you ever replied ‘lol’ while experiencing no joy?", "Did you say ‘I’m five minutes away’ from a location that was not five minutes away?", "Have you ever hidden a snack from your own future self?", "Do you maintain a backup excuse for your primary excuse?"];
  const form = document.querySelector("#verdict-form"), verdict = document.querySelector("#verdict"), questionPanel = document.querySelector("#question-panel"), questionText = document.querySelector("#question-text"), verdictButton = document.querySelector("#verdict-button"), swear = document.querySelector("#swear-toggle"), extraSwear = document.querySelector("#extra-swear-toggle");
  const pick = (items) => items[Math.floor(Math.random() * items.length)];
  const settings = () => ({ mode: form.elements.mode.value, pace: form.elements.pace.value });
  function announce() { const s = settings(); const pool = roastPools[s.mode]; const result = pick(pool) + (swear.checked ? " " + pick(praises) : "") + (extraSwear.checked ? " No further questions, your honor." : ""); verdict.textContent = result; verdict.focus(); }
  function updateMode() { const questionsMode = form.elements.pace.value === "questions"; questionPanel.hidden = !questionsMode; verdictButton.textContent = questionsMode ? "Skip to verdict" : "Reveal my verdict"; if (questionsMode) questionText.textContent = pick(questions); }
  form.addEventListener("submit", (event) => { event.preventDefault(); announce(); });
  form.elements.pace.forEach((radio) => radio.addEventListener("change", updateMode));
  document.querySelector("#yes-button").addEventListener("click", () => { questionText.textContent = pick(questions); announce(); });
  document.querySelector("#no-button").addEventListener("click", () => { questionText.textContent = pick(questions); announce(); });
  swear.addEventListener("change", () => { extraSwear.disabled = !swear.checked; if (!swear.checked) extraSwear.checked = false; });
  extraSwear.disabled = true;
})();
