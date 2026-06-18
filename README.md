# Kabir Collection — Ecommerce Retail

React storefront for [Kabir Collection](https://www.shopkabir.com/), built with Vite and powered by Shopify product data.

## Live site

https://kaushar-ghanchi.github.io/Ecommerce-retail/

Deployed automatically to GitHub Pages on every push to `main`.

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

1. Push to `main` — the deploy workflow builds and publishes the site.
2. In the repo on GitHub: **Settings → Pages → Build and deployment → Source** → choose **GitHub Actions**.

The site is served from the `/Ecommerce-retail/` base path.
