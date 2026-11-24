# Davis McCracken

Personal portfolio and project case studies built with Astro.

## Development

Use Node.js 24. From the repository root:

```sh
npm ci
npm run dev -- --background
npm run build
npm run preview
```

The development server runs at `http://localhost:4321` by default. Stop it with `npm run astro -- dev stop`. To serve the production build in `dist/` at the default port, stop the dev server before running `npm run preview`.

## Deployment

Set **Settings → Pages → Source** to **GitHub Actions**. A push to `main` builds and publishes the site at <https://davismccracken.github.io/>.

## Project layout

- `src/content/projects/*.md`: case studies (schema in `src/content.config.ts`). `impactVerified: false` shows an "unverified" badge on figures.
- `src/assets/projects/<slug>/`: case-study screenshots (optimized at build).
- `src/components/home/`: homepage sections; `src/components/work/`: case-study figures; `src/components/ui/`: shared pill/chip.
- `src/styles/global.css`: Tokyo Night tokens, fonts, `btn`/`btn-ghost`.
- `PRODUCT.md` + `.impeccable/`: design brief and critique history for the impeccable skill.

## Status (branch `astro-rebuild`)

Done: Astro rebuild, Tokyo Night palette, impeccable critique fixes, projects moved over from the old Notion portfolio (sales form revamp, call completion logging, capstone), About rewritten.

Before launch:
- [ ] `public/resume.pdf`: a résumé **without** the phone number. Résumé buttons appear automatically once the file exists.
- [ ] Role / timeframe per case study (commented `TODO(davis)` lines in each project file); confirm 2024 years.
- [ ] Optional: `PUBLIC_WEB3FORMS_KEY` (see `.env.example`) to enable the contact form; without it the site shows an email link.
- [ ] Review `TODO(copy)` comments (availability line, case-study call to action).
- [ ] Merge `astro-rebuild` into `main`, then set Pages → Source → GitHub Actions.

Next: re-run `$impeccable critique` on the content-complete site, then `$impeccable polish`.
