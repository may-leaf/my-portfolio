# AGENTS.md — MaguroSushi Site (my-portfolio)

Instructions for AI coding agents working in this repo. Read this file and `DESIGN.md` before making any change.

## Project overview

A portfolio and commission-info website for **MaguroSushi (まぐろ寿司)**, an anime/manga illustrator from Indonesia. It replaces/extends the Carrd site at https://magurosushi.carrd.co/.

Pages:
1. **Home**: profile picture, short bio, link buttons, social icons
2. **Artworks**: image gallery with lightbox
3. **Commission Info**: price cards (Simple, Complex, Character Sheet) and add-on fees
4. **Terms of Service**: works interest, work process, commercial use

## Source of truth

- **Look and feel:** `DESIGN.md` (colors, fonts, components, spacing). Follow it exactly. Palette is black, grey and acid yellow (`#DFFF00`), dark-first.
- **Content (prices, terms, copy):** section 9 of `DESIGN.md` and the live Carrd site. Do not invent prices, policies or bio text. If content is missing, use a clearly marked placeholder like `TODO: confirm with artist`.
- If `DESIGN.md` and a request conflict, ask before deviating.

## Tech stack

This is an **existing Next.js project**. Do not re-scaffold it and do not add Vite, Create React App or any other framework or bundler.

- **Next.js, App Router** (routes live in the `app/` directory, or `src/app/` if the project uses `src/`; match what already exists)
- **JavaScript** (the project uses `jsconfig.json`). Do not convert files to TypeScript or add `tsconfig.json` unless asked.
- **Tailwind CSS**: use whichever version is already in `package.json`. Do not upgrade or switch versions. If Tailwind v4, put theme tokens in the global CSS with `@theme`; if v3, use `tailwind.config`.
- **Supabase** (`@supabase/supabase-js`) for backend/data, already added to the project
- **Icons:** `lucide-react`
- **Package manager:** npm

Before adding anything, check `package.json` and the existing folder structure, and follow what's there.

## Commands

Run all commands from the project folder (the one containing `package.json`).

```bash
npm install        # install dependencies
npm run dev        # start dev server (http://localhost:3000)
npm run build      # production build
npm run lint       # lint
```

Always run `npm run build` and `npm run lint` before finishing a task, and fix any errors you introduced.

## Project structure (match what exists)

```
app/                    # routes (App Router)
├── layout.js           # root layout: fonts, global styles, metadata
├── page.js             # Home
├── artworks/page.js
├── commission/page.js
├── terms/page.js
└── globals.css         # Tailwind + theme tokens from DESIGN.md
components/             # reusable UI (Button, PriceCard, Gallery, Lightbox, ...)
data/                   # content as plain JS objects (pricing, add-ons, terms, artworks)
lib/                    # helpers, Supabase client
public/                 # static images and icons
DESIGN.md
AGENTS.md
```

If the project uses `src/`, put these folders inside `src/`.

## Next.js conventions

- Use **Server Components by default**. Add `"use client"` only for components that need state, effects or browser APIs (e.g. the lightbox, interactive gallery).
- Use `next/link` for navigation and `next/image` for images (set `width`/`height` or `fill` with `sizes`, plus meaningful `alt`).
- Load fonts with `next/font/google`: Space Grotesk (headings), Inter (body), Noto Sans JP (Japanese text). Expose them as CSS variables and map them in the theme.
- Set page `metadata` (title, description, Open Graph) per route.
- Keep route files thin. Put UI in `components/` and content in `data/`.

## Supabase rules

- Create the Supabase client in one place (`lib/supabase.js`) and import it everywhere.
- Keys and URLs come from environment variables in `.env.local`. **Never commit `.env.local` or any secret.** Keep `.env.example` updated with variable names only (no values).
- Only variables prefixed `NEXT_PUBLIC_` may reach the browser, and only the anon key, never a service-role key.
- Assume Row Level Security is on. Do not write code that depends on bypassing it.
- Don't change the database schema or existing Supabase code unless asked.

## Coding conventions

- Function components with hooks. One component per file, PascalCase filenames.
- Keep content out of JSX: put prices, add-ons, terms and artwork lists in `data/` and render them.
- Styling: Tailwind utility classes using theme tokens (`bg-bg`, `text-muted`, `bg-primary`, etc.). Do not hard-code hex values in components.
- Define design tokens once (global CSS `@theme` or Tailwind config), mapped from the palette in `DESIGN.md`.
- Keep components small and reusable. Prefer composition over copy-paste.
- No unused imports, dead code or `console.log` in committed code.

## Design rules (quick checklist)

- Background `#0B0B0C`, surfaces `#141416` / `#1C1C1F`, borders `#2F2F35`.
- Acid yellow `#DFFF00` is the **only** accent. Black text on yellow, never white or grey.
- Radius: 16px cards, 12px images, pill buttons, circular avatar.
- Artwork is never tinted, filtered or overlaid.
- Every interactive element has a visible yellow focus state.

## Accessibility & quality

- Semantic HTML (`header`, `nav`, `main`, `section`, `footer`). One `h1` per page.
- All images have meaningful `alt` text. Icon-only buttons have `aria-label`.
- Full keyboard support, including the lightbox (Esc to close, arrow keys to navigate).
- Touch targets at least 44×44px. Base font at least 16px on mobile.
- Mobile-first. Test at 375px, 768px and 1280px widths.
- Respect `prefers-reduced-motion`: disable hover scaling and transitions when set.

## Privacy & content boundaries

- **Never hard-code the artist's email address** in source or markup. Read it from an environment variable (e.g. `NEXT_PUBLIC_CONTACT_URL`) or a config value the owner provides, and link to a contact method.
- Social links (Twitter/X, Instagram, Facebook) come from a single config file, not scattered across components.
- Do not add placeholder artwork that conflicts with the artist's stated limits (no R18+, no heavy gore, no fetish content).
- Do not add tracking scripts, analytics or third-party embeds without being asked.

## Git hygiene

- Never commit `.env.local`, `node_modules`, or `.next` (build output). Make sure they are in `.gitignore`.
- Make small, focused commits. Do not rewrite history, force-push or run `git clean` / `git reset --hard` without being asked.

## Workflow rules for agents

1. Read `DESIGN.md` and this file first.
2. Plan briefly, then make the smallest change that solves the task.
3. Reuse existing components before creating new ones.
4. Do not install new dependencies without a clear reason; mention any you add.
5. Do not edit `DESIGN.md` or `AGENTS.md` unless asked.
6. After changes, run the build and lint, then summarize what changed and anything left to confirm.
7. If something is ambiguous (missing content, unclear stack, conflicting rules), ask instead of guessing.

## Example tasks

- "Set up the theme tokens and fonts from DESIGN.md in globals.css and layout.js."
- "Build the Home page: profile header, bio, three pill link buttons, social icon row."
- "Create `PriceCard` and the Commission page using the data in `data/pricing.js`."
- "Build the Artworks gallery with a keyboard-accessible lightbox using placeholder images."