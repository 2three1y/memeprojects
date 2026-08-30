# MemeProjects

MemeProjects is a zero-tracking, browser-first collection of playful experiments. The flagship experience, RU a Cheater & Persona Evaluator, turns suspicious questions and personality judgments into deliberately unscientific, theatrical fun. Results are satire, not evidence, counseling, or surveillance.

## RU a Cheater & Persona Evaluator

The app has two switchable modes: RU a Cheater for instant verdicts or question-based interrogation, and Persona Evaluator for playful Good Boy, Good Girl, Bad Boy, and Bad Girl evaluations. Shared chaos levels (Standard, Spicy, and Extra Spicy) control the tone. Every interaction runs client-side and avoids accounts, analytics, ad pixels, fingerprinting, and hidden tracking.

## Internationalization architecture

The interface supports 80+ language choices through the language selector. Translatable content is marked with data-i18n keys and applied dynamically to the DOM whenever the language changes. Runtime-generated content—including questions, verdicts, evaluation results, mode-switch announcements, button labels, and status text—comes from the active translation pack rather than hardcoded English.

The active translation also updates document.documentElement.lang, the language selector's accessible label, and document.title. Titles are localized on every language switch and remain synchronized with the selected mode when mode-specific titles are used. ARIA live-region announcements are emitted in the active language, so switching modes does not leak English into a translated experience.

## Accessibility and screen readers

MemeProjects is designed for VoiceOver, JAWS, and NVDA with:

- Semantic header, main, footer, nav, form, section, fieldset, and legend landmarks.
- A skip link to the main content.
- Explicit labels, descriptions, headings, and control relationships.
- Keyboard-operable radio groups, buttons, and language switching.
- ARIA-hidden state synchronized with panel visibility.
- Polite, atomic ARIA-live status regions for verdicts, evaluations, and mode changes.
- Focus returned to the newly updated result when appropriate.
- Visible focus styling, responsive layouts, zoom-friendly sizing, and reduced-motion support.

## Visual design

The UI uses high-contrast visual styling and a cyberpunk presentation: dark surfaces, bright neon accents, crisp borders, strong focus rings, terminal-inspired typography, and dramatic result cards. Color is supported by text, labels, structure, and status semantics so meaning is never conveyed by color alone.

## Development and contributing

Open an issue or pull request for focused bug fixes, accessibility improvements, translations, copy edits, and tasteful nonsense. Test with a keyboard, a narrow viewport, zoom, reduced motion, and at least one screen reader. Keep the project client-side, privacy-respecting, kind, and free of surprise data collection.

## Project files

`index.html` provides semantic structure and the complete language selector. `app.js` owns translation application, dynamic title updates, mode switching, questions, verdicts, and accessible announcements. `style.css` provides the responsive cyberpunk visual system.

Made with HTML, CSS, JavaScript, and dangerous confidence.