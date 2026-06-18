# Kabir Collection — Ecommerce Retail

React storefront for [Kabir Collection](https://www.shopkabir.com/), built with Vite and powered by Shopify product data.

## Live site

https://kaushar-ghanchi.github.io/Ecommerce-retail/

Deployed automatically on every push to `main` via the `gh-pages` branch.

### One-time GitHub setup

Your deploy workflow already pushed the site to the **`gh-pages` branch**. You only need to turn on Pages:

1. Open **Settings → Pages**: https://github.com/kaushar-ghanchi/Ecommerce-retail/settings/pages
2. Under **Build and deployment → Source**, choose **Deploy from a branch** (not “GitHub Actions”).
3. **Branch:** `gh-pages` → folder **`/ (root)`**
4. Click **Save**
5. Wait 1–2 minutes, then open https://kaushar-ghanchi.github.io/Ecommerce-retail/

If you still see a 404, confirm the `gh-pages` branch exists under **Code** (branch dropdown) and that Pages source is `gh-pages / (root)`, not `main`.

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
