# MemeProjects

Welcome to MemeProjects: the hub for cursed, charming, zero-tracking web experiments that should probably have been a group chat message.

We make tiny sites with big opinions, questionable premises, and absolutely no interest in following you around the internet. The flagship exhibit is **RU a Cheater**, a playful browser experience that investigates your romantic alibis with the scientific rigor of a friend squinting at your text messages.

## The vibe

MemeProjects is a playground for experiments that are:

- Fun first, but not careless.
- Weird enough to earn a second look.
- Small, fast, and easy to understand.
- Zero-tracking by design: no analytics, ad pixels, fingerprinting, or secret dossier.
- Built to run in the browser without demanding an account or a blood oath.

## Featured project: RU a Cheater

RU a Cheater is a tongue-in-cheek verdict machine for the eternally suspicious and the enthusiastically innocent. It is satire, not surveillance, relationship counseling, or admissible evidence. If the result says you are guilty, please remember that a JavaScript button has no legal standing.

### Modes

- **Quick Verdict** — Get the fast, dramatic ruling with minimal ceremony.
- **Interrogation** — Answer a longer set of ridiculous questions and let the suspicion engine overthink everything.
- **Chaos Mode** — Embrace maximum randomness, theatrical accusations, and the possibility that your phone charger is somehow involved.
- **Truth-or-Roast** — Receive a playful roast alongside the verdict. The roast is aimed at the situation, not at anyone's identity or worth.

Mode names and behavior may evolve as the experiment grows. The only constant is that the stakes are imaginary and the delivery is unnecessarily confident.

## Privacy

The projects in this hub aim to work entirely client-side. We do not intentionally collect personal data, sell attention, or install a tiny detective in your browser. Check each project's local documentation for its exact behavior, and do not enter sensitive information into any web experiment, even one wearing a funny hat.

## Accessibility notes

Accessibility is part of the joke and part of the job. Contributions should strive to include:

- Semantic HTML and a logical heading structure.
- Keyboard access for every interactive control.
- Visible, high-contrast focus states.
- Labels and instructions that work with screen readers.
- Status and verdict updates announced appropriately without trapping focus.
- Reduced-motion support using `prefers-reduced-motion`.
- Responsive layouts that remain usable with zoom and on small screens.
- Humor that does not depend only on color, animation, sound, or slang.

If an interaction is hilarious but impossible to operate, it is not finished. It is merely heckling the user.

## Project structure

A typical experiment keeps its chaos legible:

```text
index.html    entry point and semantic structure
styles/       CSS and responsive presentation
script/       client-side behavior
roasts/       reusable jokes, verdicts, and copy
README.md     what this thing is and why it exists
```

## Contributing

Ideas, bug reports, accessibility fixes, copy edits, and tasteful nonsense are welcome.

1. Open an issue describing the experiment, improvement, or bug.
2. Keep changes focused and explain the user-facing effect.
3. Test with a keyboard, a narrow viewport, and reduced motion enabled.
4. Do not add tracking, ad-tech, unnecessary dependencies, or surprise data collection.
5. Keep jokes playful, avoid punching down, and do not turn real people into targets.
6. Open a pull request with a clear summary and testing notes.

A contribution does not need to be polished comedy on day one. It does need to be kind, accessible, and less cursed than the code it replaces.

## License

Unless a project says otherwise, treat the contents as an invitation to learn from, remix, and improve the experiments. Preserve attribution and check the individual project notes before shipping a remix.

Made with HTML, CSS, JavaScript, and the dangerous confidence of someone who just discovered `Math.random()`.
