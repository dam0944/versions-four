# Deployment and troubleshooting

## Production build

From `version-five/`:

```sh
npm ci
npm run check
npm run preview
```

Deploy the contents of `dist/` after checking the preview. Rebuild after each source or public-asset change. Do not upload `node_modules` as the website, and do not edit `dist` as source.

## Router fallback

The project uses HTML5 history routing. Configure the host to serve `index.html` for application routes such as `/about`, `/service`, and `/contact`, while serving actual asset files normally. Without a fallback, navigation may work but refreshing an inner page can return a 404.

For a root-domain Nginx deployment, the relevant location rule is:

```nginx
location / {
    try_files $uri $uri/ /index.html;
}
```

For a host supporting a Netlify-style `_redirects` file, create `public/_redirects` before building:

```text
/* /index.html 200
```

Use the equivalent SPA rewrite setting on your host. No deployment has been performed by this source refactor.

## Hosting below a subdirectory

The supplied configuration targets the domain root. If using `/demo/`, change Vite's `base` to `/demo/` and update root-relative public asset references such as `/images/...` to include the deployment prefix. The router uses `import.meta.env.BASE_URL`; CSS backgrounds, static HTML image paths, and image paths in data also need review. Test a direct refresh on every route under the prefix before publishing.

## Validation

`npm run check` runs formatting validation, source validation, and the production build. Source validation checks Vue compilation, relative imports, local image references, skill value ranges, team photos, and unique service numbers.

Before publishing, manually review:

1. All four pages at desktop and mobile widths, including direct refreshes.
2. Both language choices, long Khmer headings, navigation, and mobile menu.
3. ScrollSmoother, About image reveals/counters, and Services card reveals.
4. Reduced motion, keyboard links, and visible focus states.
5. FAQ expansion, prepared email submission, and the actual map location.
6. Real content, social links, and rights for redistributed fonts/images.

## Common issues

| Symptom                                 | Check                                                                          |
| --------------------------------------- | ------------------------------------------------------------------------------ |
| Blank page after opening HTML from disk | Use `npm run dev` or a hosted build                                            |
| Missing hero image                      | Check `public/images`, exact filename, case, and desktop/mobile CSS URLs       |
| Refresh on an inner page returns 404    | Add the host's SPA fallback                                                    |
| Khmer text displays incorrectly         | Save as UTF-8 and load the Khmer font families                                 |
| Images do not animate                   | Check the OS reduced-motion setting and scroll the element into view           |
| Form does not send immediately          | It uses `mailto:`; configure the recipient and send from the email application |
| Google fonts or map do not load         | Check connectivity/content blockers; self-host fonts if required               |
| Changes do not appear in production     | Rebuild and redeploy `dist`, then check browser/CDN caching                    |
| Node or Vite startup error              | Check Node against the `engines` field, then run `npm ci`                      |

## Delivery package

Include `src`, `public`, `docs`, `scripts`, `index.html`, `package.json`, `package-lock.json`, Vite configuration, README, and formatting configuration. Exclude `node_modules`, local environment files, editor caches, and temporary files. A generated `dist` can be included separately as a preview build if desired. No blanket license for third-party assets is implied by the source package.
