# AGENTS.md

## Project overview

This repository contains a small Dutch-language marketing website for Marijn van der Lende, built with the Next.js App Router, React, and TypeScript. The site presents mindfulness services, training detail pages, and a contact/training inquiry form.

Keep the site calm, accessible, lightweight, and easy for a non-technical owner to maintain. User-facing copy is Dutch; code identifiers and technical documentation may be English.

## Project tooling

- Application code lives in `src/`; static assets live in `public/`.
- Install dependencies with `npm install`; keep `package-lock.json` committed for reproducible local and Vercel builds.
- Use the scripts in `package.json`: `npm run dev`, `npm run typecheck`, `npm run lint`, and `npm run build`.
- No automated test suite is currently configured. Do not claim tests pass unless one is added and actually run.
- Do not edit or commit `node_modules/`.

## Architecture and important files

- `src/app/layout.tsx`: root layout, shared metadata, header, and footer.
- `src/app/page.tsx`: homepage.
- `src/app/over-marijn/page.tsx`: about page.
- `src/app/contact/page.tsx`: contact page.
- `src/app/trainingen/page.tsx`: training overview.
- `src/app/trainingen/[slug]/page.tsx`: statically generated training detail pages.
- `src/components/`: shared presentational components and the inquiry form.
- `src/data/site.ts`: canonical source for business details and training content.
- `src/app/globals.css`: global tokens, layout, components, and responsive styling.
- `public/logo.png`: brand logo used by the header and homepage.

The `@/` import alias is intended to resolve to `src/`. Preserve that convention when project configuration is added or repaired.

## Implementation conventions

- Use React function components and TypeScript types; avoid `any`.
- Prefer Server Components. Add `'use client'` only when browser state, effects, event handlers, or client-only APIs are genuinely required.
- Use `next/link` for internal navigation and `next/image` for images.
- Keep reusable UI in `src/components/` and page-specific composition in `src/app/**/page.tsx`.
- Keep business/contact details and training records in `src/data/site.ts`; do not duplicate them in pages.
- When adding a training, provide every field in the `Training` type and use a unique, URL-safe slug. The detail route is generated from this data by `generateStaticParams()`.
- Preserve semantic HTML, visible labels, useful alt text, keyboard usability, and logical heading order.
- Do not introduce a CMS, UI framework, state library, form provider, analytics service, or other external dependency unless the task requires it.

## Design and content conventions

- Preserve the visual language defined by the CSS custom properties in `:root`: warm neutrals, peach accents, sage tones, rounded cards, subtle shadows, and generous whitespace.
- Reuse existing layout classes and CSS variables before adding one-off styles.
- Maintain responsive behavior at the existing `960px` and `640px` breakpoints unless a broader redesign is requested.
- Keep public copy in natural Dutch and match the calm, practical, professional tone.
- Treat the current domain email, phone number, business text, prices, dates, and some biography copy as placeholders until the owner supplies final content.
- The inquiry form currently uses `mailto:` and has no server-side submission, persistence, spam protection, or success/error UI. Do not describe it as a production form backend.

## Working safely

- Inspect the working tree before editing and preserve unrelated user changes.
- Make the smallest coherent change that satisfies the request.
- Never modify generated dependencies or add secrets to the repository.
- For changes to contact information or training content, update `src/data/site.ts` first and verify every rendered use.
- For new routes, ensure Header and Footer navigation remain intentional; do not automatically add every route to both.
- If a change introduces client-side behavior, keep the client boundary as small as possible.

## Validation

Use the scripts defined in the root `package.json`. For code changes, run the relevant checks:

1. `npm run typecheck`.
2. `npm run lint`.
3. Tests, if a test suite is configured later.
4. `npm run build` for routing, rendering, metadata, configuration, or dependency changes.

Also verify manually that:

- `/`, `/over-marijn`, `/trainingen`, `/contact`, and every training slug render.
- Internal links resolve and the logo loads without distortion.
- Layouts remain usable on narrow and wide viewports.
- Form fields retain labels, required constraints, and a valid default selection.
- New Dutch copy has no obvious spelling errors or leftover placeholder text.

Report exactly which checks were run, their outcome, and any checks that could not be run.
