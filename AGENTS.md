# Versatile Arm Group (VAG) Project Guidelines

## Project Context
This is the Versatile Arm Group (VAG) website.
- **Tech Stack:** React 19, TypeScript, Vite 6, Tailwind CSS v4, Motion v12, React Router v7.
- **Fonts:** Playfair Display, DM Sans, DM Mono (loaded in `index.html`).

## Critical CSS Rules (Tailwind v4)
Tailwind v4 has specific behaviors that MUST be respected to avoid layout breakage:

1.  **No `--spacing-*` variables in `@theme`:**
    -   Defining `--spacing-sm`, `--spacing-md`, etc. in `@theme` pollutes the `max-w-{name}` utilities because TW v4 uses the spacing scale as a fallback for the container scale.
    -   **Rule:** Never define `--spacing-{name}` in `@theme`. Use `--size-{name}` for internal tokens or `--container-{name}` for max-width definitions.

2.  **Container Override:**
    -   The `.container` class is a custom design-system wrapper. To ensure it wins the cascade over Tailwind's built-in responsive container utility, it MUST be defined in `@layer utilities` at the bottom of `src/index.css`.

3.  **No CSS `@import` for Fonts:**
    -   Google Fonts are loaded in `index.html`. Do NOT add `@import url()` to `index.css` as it violates the CSS spec (appearing after `@import "tailwindcss"`) and causes double-loading.

4.  **Tailwind Configuration:**
    -   All theme customization goes in `@theme {}` in `src/index.css`. Never create `tailwind.config.ts` or `postcss.config.js`.

5.  **Motion Imports:**
    -   Always import from `motion/react`, NOT `framer-motion`.

## Verifying Layout Integrity
If the layout appears broken (e.g., containers are too narrow):
1.  Check `dist/assets/*.css` for `max-w-*` values. If `max-w-2xl` is ~48px, the `--spacing-*` collision bug has returned.
2.  Inspect `src/index.css` for any variables starting with `--spacing-`.

## Implementation Patterns
-   **New Pages:** Register in `src/App.tsx` and add links to `src/components/Layout.tsx`.
-   **Sections:** Use `className="section"` and `className="container no-prose"`.
-   **Typography:** Use classes like `text-hero`, `text-display`, `text-title`, `text-body-lg`, `text-body`, `text-small`, `text-label`.
-   **Buttons:** `btn-primary`, `btn-ghost`, `btn-cta`.
-   **Animations:** Use `whileInView` with `viewport={{ once: true }}` from `motion/react`.
