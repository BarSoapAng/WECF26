# Implementation Guidelines

- Prefer using the existing style tokens in `src/lib/styles.ts`.
- Render all text with shared typography components: `Header1`/`Header2` for headings, `BodyBold` for emphasized labels, and `BodyRegular1`/`BodyRegular2` for body copy. Do not use raw HTML text elements or recreate their typography styles.
- Keep layout and interaction styles on structural wrappers, with shared typography components inside them. Use the `as` prop when a different semantic HTML element is needed.
- Ensure changes are responsive and use the shared responsive tokens in `src/lib/responsive.ts`.
- Always implement changes with the least amount of code changes.
