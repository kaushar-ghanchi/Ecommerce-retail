# Kabir Collection — Ecommerce Retail

React storefront for [Kabir Collection](https://www.shopkabir.com/), built with Vite and powered by Shopify product data.

## Live site

https://kaushar-ghanchi.github.io/Ecommerce-retail/

Deployed automatically on every push to `main` via the `gh-pages` branch.

### One-time GitHub setup

1. Push to `main` (or re-run the failed workflow).
2. Open **Settings → Pages** on the repo.
3. Under **Build and deployment → Source**, choose **Deploy from a branch**.
4. Branch: `gh-pages`, folder: `/ (root)`.
5. Save — the site will be live in ~1 minute.

## Local development

```bash
yarn install
yarn dev
```

## Scripts

```bash
yarn dev            # start dev server
yarn build          # production build
yarn preview        # preview production build locally
yarn sync:products  # refresh Shopify products & collections cache
yarn lint           # run ESLint
```

## GitHub Pages setup

See the one-time setup steps under **Live site** above.

The site is served from the `/Ecommerce-retail/` base path.
