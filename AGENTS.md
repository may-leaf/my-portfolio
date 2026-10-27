# AGENTS.md — Tuna Site (my-portfolio)

Instructions for AI coding agents working in this repo. Read this file, `HANDS-OFF.md`, `TASTE.md` and `DESIGN.md` before making any change.

> **Highest priority: `HANDS-OFF.md`.** Tuna edits files by hand (text, sizes, colors, copy). Never change anything Tuna has made or edited without explicit, specific permission. `HANDS-OFF.md` overrides every instruction in this file, `TASTE.md` and `DESIGN.md`.

## Project overview

A portfolio and commission-info website for **Tuna (まぐろ寿司)**, an anime/manga illustrator from Indonesia. It replaces/extends two Carrd sites: the portfolio at https://magurosushi.carrd.co/ and the commissions at https://commissionmagurosushi.carrd.co/. The artist's display name on the site is "Tuna (まぐろ寿司)".

Pages:
1. **Home**: profile picture, short bio, link buttons, social icons
2. **Artworks**: image gallery with lightbox
3. **Commission Info**: price cards (Surprise Me! and Character Sheet tiers) and add-on fees
4. **Terms of Service**: works interest, work process, commercial use

## Source of truth

- **Protection of Tuna's own edits:** `HANDS-OFF.md`. Wins over everything else. The design docs apply to NEW work only; they are not permission to rewrite, restyle or "fix" existing content.
- **Personality and anti-slop rules:** `TASTE.md`. Run its pre-ship check (section 7) before finishing any UI task. If a generic habit conflicts with it, `TASTE.md` wins.
- **Look and feel:** `DESIGN.md` (colors, fonts, components, spacing, motion). Follow it exactly. Palette is black, grey and acid yellow (`#DFFF00`), dark-first, in a tactical HUD style.
- **Content (prices, terms, copy):** section 10 of `DESIGN.md` and the live Carrd site. Do not invent prices, policies or bio text. If content is missing, use a clearly marked placeholder like `TODO: confirm with artist`.
- If `DESIGN.md` and a request conflict, ask before deviating.

## Tech stack

This is an **existing Next.js project**. Do not re-scaffold it and do not add Vite, Create React App or any other framework or bundler.

- **Next.js, App Router** (routes live in the `app/` directory, or `src/app/` if the project uses `src/`; match what already exists)
- **JavaScript** (the project uses `jsconfig.json`). Do not convert files to TypeScript or add `tsconfig.json` unless asked.
- **Tailwind CSS**: use whichever version is already in `package.json`. Do not upgrade or switch versions. If Tailwind v4, put theme tokens in the global CSS with `@theme`; if v3, use `tailwind.config`.
- **Supabase** (`@supabase/supabase-js`) for backend/data, already added to the project
- **Icons:** `lucide-react`
- **Animation:** Anime.js v4 (named imports from `animejs`, `ease` option; client components only; `createScope` in `useEffect` with `scope.revert()` cleanup; respect `prefers-reduced-motion`)
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

- Background `#08080A`, surfaces `#111113` / `#19191C`, borders `#2E2E33`.
- Acid yellow `#DFFF00` is the **only** accent (red only for errors/closed). Black text on yellow, never white or grey. Yellow covers under about 10% of any screen.
- Fonts: Chakra Petch (headings), Space Mono (HUD labels), Inter (body), Noto Sans JP (Japanese text).
- Shapes: chamfered corners via `clip-path` (8-16px), 1px hairlines, corner brackets. No pill buttons or rounded cards; only the avatar and status dots are round.
- Artwork is never tinted, filtered, cropped to uniform squares or overlaid (except a black bottom gradient on hover).
- Every interactive element has a visible yellow focus state.
- Avoid the generic "AI look": see the slop checklist in `TASTE.md`. No gradient text, glass cards, icon-in-circle feature grids or marketing copy.
- The artist's name appears as **Tuna (まぐろ寿司)**: `TUNA` in the display font with まぐろ寿司 beside or stacked.

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

1. Read `HANDS-OFF.md`, `TASTE.md`, `DESIGN.md` and this file first. Check `git status` and `git diff` for Tuna's uncommitted edits before touching any file.
2. Plan briefly, then make the smallest change that solves the task. Prefer adding new files over editing existing ones. If an existing, hand-edited line would need to change, stop and ask first.
3. Reuse existing components before creating new ones.
4. Do not install new dependencies without a clear reason; mention any you add.
5. Do not edit `DESIGN.md`, `TASTE.md`, `HANDS-OFF.md` or `AGENTS.md` unless asked.
6. After changes, run the build and lint, then summarize what changed and anything left to confirm.
7. If something is ambiguous (missing content, unclear stack, conflicting rules), ask instead of guessing.

## Example tasks

- "Set up the theme tokens and fonts from DESIGN.md in globals.css and layout.js."
- "Build the Home page: profile header, bio, three pill link buttons, social icon row."
- "Create `PriceCard` and the Commission page using the data in `data/pricing.js`."
- "Build the Artworks gallery with a keyboard-accessible lightbox using placeholder images."