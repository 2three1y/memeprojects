(() => {
  "use strict";
  const roasts = {
    regular: ["Your alibi has the structural integrity of wet toast.", "Innocent-ish. The jury is checking your search history.", "You are not a cheater; you are simply suspiciously well-organized.", "Verdict: emotionally buffering."],
    adult: ["Your story has more plot holes than a bad late-night text.", "Not guilty, but your vibes have requested legal representation.", "The evidence is spicy and your explanation is undercooked.", "You are innocent until the group chat votes otherwise."],
    "adult-plus": ["The verdict is messy, the alibi is feral, and your confidence is doing unpaid overtime.", "Absolutely questionable. Frankly, even your excuses need an excuse.", "Your red flags have formed a committee and elected a chairperson.", "The court finds you guilty of making this unnecessarily dramatic."]
  };
  const praises = ["Counterpoint: you may simply be a lovable disaster.", "Good news: your chaos has excellent comedic timing.", "Your honesty is suspiciously refreshing."];
  const questions = ["Have you ever replied ‘lol’ while experiencing no joy?", "Did you say ‘I’m five minutes away’ from a location that was not five minutes away?", "Have you ever hidden a snack from your own future self?", "Do you maintain a backup excuse for your primary excuse?"];
  const form = document.querySelector("#verdict-form"), verdict = document.querySelector("#verdict"), questionPanel = document.querySelector("#question-panel"), questionText = document.querySelector("#question-text"), verdictButton = document.querySelector("#verdict-button");
  const pick = (items) => items[Math.floor(Math.random() * items.length)];
  const settings = () => ({ mode: form.elements.mode.value, pace: form.elements.pace.value, spicy: document.querySelector("#swear-toggle").checked, extra: document.querySelector("#extra-swear-toggle").checked });
  function announce() { const s = settings(); let pool = roasts[s.mode] || roasts.regular; let result = pick(pool); if (s.spicy) result += " " + pick(praises); if (s.extra && s.mode !== "regular") result += " Damn, the vibes are complicated."; verdict.textContent = result; verdict.focus(); }
  function updateMode() { const questionsMode = form.elements.pace.value === "questions"; questionPanel.hidden = !questionsMode; verdictButton.textContent = questionsMode ? "Skip to verdict" : "Reveal my verdict"; if (questionsMode) questionText.textContent = pick(questions); }
  form.addEventListener("submit", (event) => { event.preventDefault(); announce(); });
  form.elements.pace.forEach((radio) => radio.addEventListener("change", updateMode));
  document.querySelector("#yes-button").addEventListener("click", () => { questionText.textContent = pick(questions); announce(); });
  document.querySelector("#no-button").addEventListener("click", () => { questionText.textContent = pick(questions); announce(); });
  document.querySelector("#swear-toggle").addEventListener("change", () => { document.querySelector("#extra-swear-toggle").disabled = !document.querySelector("#swear-toggle").checked; });
  document.querySelector("#extra-swear-toggle").disabled = true;
})();
