# Dharmasastra — Vue 3 website

A responsive English/Khmer notary and legal-services website built with Vue 3, Composition API (`<script setup>`), Vue Router, Vite, and GSAP. Pages: Home, About, Services, and Contact.

## Quick start

Install Node.js 20.19+ in the 20.x line, or 22.12+ (see `package.json`). Open a terminal inside **version-five**, then run:

```sh
npm ci
npm run dev
```

Open the localhost URL printed by Vite. Keep the terminal running while editing. Do not open `index.html` directly: Vue files need Vite or a production build.

```sh
npm run build        # Compile into dist/
npm run preview      # Preview the production build locally
npm run format       # Format source and documentation
npm run check        # Formatting, source validation, and build
```

`npm ci` installs the versions in `package-lock.json`. Use `npm install` when intentionally changing dependencies and include the updated lockfile. The preview command is for local review, not a production server.

## Documentation

- [Customization](docs/CUSTOMIZATION.md): content, images, colors, fonts, language, forms, and animations.
- [Architecture](docs/ARCHITECTURE.md): components, composables, state, routes, and animation lifecycle.
- [Deployment and troubleshooting](docs/DEPLOYMENT.md): hosting, direct-page refreshes, validation, and common problems.

## Project structure

```text
version-five/
├── docs/                    Buyer and developer guides
├── public/                  Images and loader artwork
├── scripts/check-source.mjs Source and content validation
├── src/
│   ├── assets/styles/       Theme tokens, shared styles, loader styles
│   ├── components/
│   │   ├── layout/          Header, footer, loading screen
│   │   ├── home/            Homepage sections
│   │   ├── about/           Expertise, overview, team
│   │   └── shared/          Contact form, map, consultation section
│   ├── composables/         Language, forms, counters, scrolling, reveals
│   ├── config/             Site, office, and animation settings
│   ├── data/               Services, skills, team, testimonials, form options
│   ├── router/             Lazy-loaded routes and scroll restoration
│   ├── utils/              Startup loader, motion, and inspection deterrent
│   ├── views/              Four route-level page compositions
│   ├── App.vue             Application layout
│   └── main.js             Application bootstrap
├── index.html               Title, document language, font loading
├── package.json             Scripts and dependencies
└── vite.config.js           Build configuration
```

## Included behavior

- English/Khmer switching, with Khmer selected by default.
- ScrollSmoother scrolling, homepage section reveals, About image reveals and skill counters, and Services card reveals.
- Subtle inner-page hero text animation and reduced-motion support.
- Responsive navigation, contact form, FAQ interactions, and map embed.
- A decorative intro on document load; route navigation does not restart it.
- A best-effort inspection deterrent blocks the context menu and common inspection shortcuts. It cannot prevent access to code delivered to the browser.

## Content and integrations

The contact form prepares a `mailto:` message in the visitor's email application. It does **not** send mail through a server or store appointments. Set the recipient in `src/config/office.js`.

Names, percentages, testimonials, social links, office details, and some answers are sample content. Replace them with approved material before publishing. Google Fonts and the Google Maps embed require internet access. Confirm redistribution rights for the assets you ship; this refactor does not grant new third-party licenses.

The source is UTF-8, including Khmer. EditorConfig and Prettier settings are included. `node_modules/` and `dist/` are generated; edit files under `src/` and `public/`.
