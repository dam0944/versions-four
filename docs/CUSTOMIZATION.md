# Customization guide

All paths below are relative to `version-five/`. Run `npm run dev` while editing to see updates.

## Content map

| Change                                 | File                                       |
| -------------------------------------- | ------------------------------------------ |
| Homepage section order                 | `src/views/HomeView.vue`                   |
| Homepage banner wording                | `src/components/home/HeroSection.vue`      |
| About banner and section order         | `src/views/AboutView.vue`                  |
| About overview copy and image defaults | `src/components/about/AboutOverview.vue`   |
| Services banner and page layout        | `src/views/ServiceView.vue`                |
| Services cards                         | `src/data/services.js`                     |
| Skill labels and percentages           | `src/data/skills.js`                       |
| Team names, photos, and social links   | `src/data/team.js`                         |
| Testimonials                           | `src/data/testimonials.js`                 |
| Homepage practice-area cards           | `src/data/practiceAreas.js`                |
| Contact form service choices           | `src/data/contactServices.js`              |
| Contact details shown above the form   | `src/views/ContactView.vue`                |
| Shared form copy and office block      | `src/components/shared/ContactSection.vue` |
| Map embed and location text            | `src/components/shared/MapSection.vue`     |
| Navigation and logo                    | `src/components/layout/SiteHeader.vue`     |
| Footer content                         | `src/components/layout/SiteFooter.vue`     |
| FAQ questions and answers              | `src/components/home/FaqSection.vue`       |

Content arrays use the existing `en`/`km` fields, or `descriptionEn`/`descriptionKm` where applicable. Keep object keys intact. Service card numbers must be unique. Team members reference `socialLinks` by default; replace each member's `socials` if they need individual accounts. Homepage service links, Services-page cards, and form choices are separate lists with different wording; update each relevant file.

## Colors

Edit `src/assets/styles/theme.css`. Main tokens include:

| Token                                   | Purpose                                  |
| --------------------------------------- | ---------------------------------------- |
| `--color-primary`                       | Main navy text/background color          |
| `--color-accent`                        | Gold accents and selected borders        |
| `--color-accent-light`                  | Light gold headings, counters, and bars  |
| `--color-button`, `--color-button-text` | Pale blue primary buttons and their text |
| `--gold`, `--champ`                     | Additional shared gold/champagne accents |
| `--cream`, `--cream2`                   | Shared light section backgrounds         |
| `--ink`, `--muted`, `--line`            | Shared text, muted text, and dividers    |
| `--content-max-width`                   | Shared content width, initially 1520px   |

Example:

```css
:root {
  --color-primary: #143c35;
  --color-accent: #b28c4a;
  --color-accent-light: #e3c98c;
  --gold: #b28c4a;
  --champ: #e3c98c;
}
```

Edit the existing declarations rather than adding repeated overrides. Theme tokens cover the main palette. Some section-specific neutral shades, SVG fills, and translucent gradients retain explicit colors to preserve the design. Search the relevant component's scoped style for `linear-gradient`, `rgb`, or a hex color to customize those details too. Review foreground/background contrast after changing the palette.

The shipped design forces light mode using `data-theme="light"` in `index.html`. Legacy dark-color tokens exist, but some sections intentionally stay light; a complete alternate dark design requires reviewing those component styles.

## Fonts

1. Update the Google Fonts stylesheet link in `index.html` to load your selected families and weights.
2. Update the matching font variables in `src/assets/styles/theme.css`.
3. Check both languages and narrow screens for wrapping changes.

`--font-body` controls body text, `--font-heading` the sans-serif headings, `--font-display` serif headings, and `--font-navigation` navigation. Khmer uses `--font-khmer`, `--font-khmer-heading`, `--font-khmer-brand`, `--font-khmer-title`, and `--font-khmer-decorative`. Other tokens cover quotations, Latin-only text, and system fallbacks. Preserve a Khmer-capable fallback for translated text.

To self-host a licensed font, put its WOFF2 file in `public/fonts/`, add an `@font-face` rule to `theme.css`, and use that family in the font variables. Remove unused Google Fonts links after all required families are self-hosted.

```css
@font-face {
  font-family: 'Brand Sans';
  src: url('/fonts/brand-sans-regular.woff2') format('woff2');
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}
```

## Images and banners

Put replacement files in `public/images/`. Either retain the existing filename or update every reference. Filenames are case-sensitive on many hosts.

- Homepage hero: `--hero-img` in `src/assets/styles/site.css`, currently `/images/website-1.png`.
- About, Services, and Contact hero: background URLs in their view's scoped CSS, currently `/images/image.png`. Update desktop and mobile declarations together.
- About photos: `AboutOverview.vue` image prop defaults, `ExpertiseSection.vue`, and `data/team.js`.
- Loader illustration: `public/lawyer-loader.svg`.

Use wide images for heroes and check `background-position` at mobile widths. Keep meaningful image `alt` text. The hero background is decorative; the heading provides its accessible text. Do not edit generated files in `dist/`.

## Language and branding

Set `defaultLanguage` to `'en'` or `'km'` in `src/config/site.js`, and match the initial `<html lang>` in `index.html`. The language selection is held in memory and resets on a full reload. `useLanguage` updates the document language after switching.

Most static copy uses paired `<span class="en">` and `<span class="km">` elements. Keep both when editing. Change the browser-tab title in `index.html`, the logo/header in `SiteHeader.vue`, and branding text in the footer and page templates. Save files as UTF-8 to preserve Khmer.

## Contact form and map

Set the receiving email in `src/config/office.js`:

```js
export const office = { email: 'hello@your-domain.com' };
```

This setting controls the form recipient only. Update visible email addresses, telephone numbers, address, opening hours, and Telegram details in the Contact view, shared Contact section, Map section, and footer wherever shown.

`useContactForm.js` opens the visitor's mail application with the form content. Sending and delivery happen outside the website. For server-side delivery, replace that submission function with your backend request and error/success handling; never put private API keys in client code.

Replace the Google Maps iframe `src` in `MapSection.vue` with the embed URL for the actual office, and update its title and accompanying address.

## Animations

`src/config/motion.js` controls ScrollSmoother's desktop/touch smoothing, image/card reveal timing, and skill counter timing. GSAP values are seconds. Set both `smooth` and `smoothTouch` to `0` to remove smoothing while retaining ScrollTrigger effects.

- About images: `useImageReveals(page)` in `AboutView.vue`.
- Services cards: `useImageReveals(page, '.service-card')` in `ServiceView.vue`.
- Skills: `animate-counters` on the About page's Expertise section; percentages come from `data/skills.js` and animate to their individual values.
- Homepage section entrances: `useScrollAnimations.js`; hero effects live in `components/home/HeroSection.vue`.
- Hero text on inner pages: `inner-hero-text-enter` in `assets/styles/site.css`.
- Intro loader: `site.loader.enabled` and `site.loader.duration` in `config/site.js`; it is a decorative timed intro, not a measured download indicator.

The animation system honors the visitor's reduced-motion preference. Disabling an effect should leave all content visible. For example, remove an image-reveal composable call to leave its images static; do not add CSS that permanently hides them.
