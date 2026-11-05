# Implementation Guidelines

- Prefer using the existing style tokens in `src/lib/styles.ts`.
- Use shared typography components from `src/lib/styles.ts` for all text instead of raw HTML text elements. Follow `src/components/Accordion.tsx` as an example; structural wrappers may handle layout and interaction.
- Ensure changes are responsive and use the shared responsive tokens in `src/lib/responsive.ts`.
- Always implement changes with the least amount of code changes.
