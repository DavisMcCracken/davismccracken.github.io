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
