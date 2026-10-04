# Architecture

## Vue and routing

The project uses Vue 3 single-file components with Composition API `<script setup>`. Template-only components remain template-only when they need no JavaScript. Vue Router lazy-loads these views:

| URL        | View                        |
| ---------- | --------------------------- |
| `/`        | `src/views/HomeView.vue`    |
| `/about`   | `src/views/AboutView.vue`   |
| `/service` | `src/views/ServiceView.vue` |
| `/contact` | `src/views/ContactView.vue` |

Unknown paths redirect to Home. The services URL is singular: `/service`. Add routes in `src/router/index.js`, then update the header/footer navigation links as needed.

## Component boundaries

`App.vue` renders language controls, the header, the ScrollSmoother wrapper, the current view, and the footer. The header sits outside transformed scrolling content so its fixed position works correctly.

Views compose sections and own page-specific hero styles. `components/layout/` contains the shared shell. `components/home/` and `components/about/` contain page-focused sections. `components/shared/` contains reusable contact, map, and consultation blocks. Shared layout and typography rules remain in `assets/styles/site.css`; local component styles remain scoped.

Keep reusable UI in a component, reactive lifecycle behavior in a composable, editable repeated content in `data/`, and ordinary configuration in `config/`. Small one-off behavior can remain next to its component. Static bilingual paragraphs remain in their templates.

## Composables

| File                     | Responsibility                                                                 |
| ------------------------ | ------------------------------------------------------------------------------ |
| `useLanguage.js`         | Language state, injected switch function, keyboard controls, document language |
| `useContactForm.js`      | Form fields, localized status, prepared email link                             |
| `usePageSmoother.js`     | One ScrollSmoother instance, header spacing, refresh and cleanup               |
| `useScrollAnimations.js` | Homepage content entering the viewport                                         |
| `useImageReveals.js`     | Polygon reveals for images or a supplied selector such as `.service-card`      |
| `useSkillCounters.js`    | Skill percentages and synchronized progress bars                               |
| `useBackgroundReveal.js` | Optional background reveal for reusable sections                               |

`useLanguage()` is called once in App and provides `language` and `changeLanguage` to descendants. No global store dependency is needed. The `disablePageAnimations` injection keeps broad section animations off on inner pages; explicit image/card reveals and `animate-counters` are deliberate exceptions.

## Startup and animation lifecycle

`main.js` creates the optional introduction, resolves the initial route, and mounts the main app. The router waits for the mount signal before initial scroll restoration. `usePageSmoother` establishes its wrapper before view animations mount. Route and language changes refresh scroll measurements; image reveals also refresh after lazy images load. FAQ height changes are handled by the existing animation helpers.

GSAP `matchMedia()` restricts enhanced motion to visitors who have not requested reduced motion. Composables revert their contexts/timelines and remove listeners on unmount. Preserve that cleanup when adding new effects. Do not create another ScrollSmoother in a section: the application already owns one.

The image reveal measures a stationary parent, not the clipped element. Focus inside an animated card completes its reveal so keyboard users can see the focused link. Skill values start at their final value for the non-animated fallback and count from zero only when animation is enabled.

## Source conventions

- Use two-space indentation, semicolons, single-quoted JavaScript strings, and UTF-8.
- Use PascalCase component names and `use…` names for lifecycle composables.
- Keep relative imports explicit, including `.js` extensions.
- Preserve English and Khmer entries together when changing content.
- Run `npm run format`, then `npm run check` before delivery.

`scripts/check-source.mjs` compiles Vue templates, checks relative imports and local image references, and validates selected content invariants. It complements the production build; it does not replace browser testing.
