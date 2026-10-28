<script setup>
import { services } from "../data/services.js";
import { provide, ref } from "vue";
import { useI18n } from "vue-i18n";
import { useImageReveals } from "../composables/useImageReveals.js";
import { RouterLink } from "vue-router";
import ConsultationSection from "../components/shared/ConsultationSection.vue";
const { t, locale } = useI18n();
provide("disablePageAnimations", true);
const page = ref(null);
useImageReveals(page, ".service-card");
</script>

<template>
  <div ref="page" class="services-page">
    <section class="services-hero">
      <div class="hero-container">
        <h1>{{ t("servicePage.title") }}</h1>
        <p class="hero-lead">{{ t("servicePage.lead") }}</p>
      </div>
      <div class="bottom-round-bg" aria-hidden="true"></div>
    </section>
    <section class="service-intro">
      <div class="services-container service-intro-grid">
        <div class="service-intro-content">
          <p class="eyebrow">{{ t("servicePage.introEyebrow") }}</p>
          <h2>{{ t("servicePage.introTitle") }}</h2>
          <blockquote>{{ t("servicePage.quote") }}</blockquote>
          <p class="service-intro-description">{{ t("servicePage.introDescription") }}</p>
        </div>
        <div class="reveal-trigger">
          <div class="service-intro-visual">
            <img
              decoding="async"
              src="/images/team-1.png"
              :alt="t('servicePage.portraitAlt')"
              loading="lazy"
            />

            <div class="service-intro-ribbon">
              {{ t("servicePage.ribbon") }}
            </div>
          </div>
        </div>
      </div>
    </section>
    <ConsultationSection />
    <section class="services-section">
      <div class="services-container">
        <header class="section-heading">
          <p class="eyebrow">{{ t("servicePage.listEyebrow") }}</p>
          <h2>{{ t("servicePage.listTitle") }}</h2>
          <p class="section-description">{{ t("servicePage.listDescription") }}</p>
        </header>
        <div class="services-grid">
          <div v-for="service in services" :key="service.number" class="reveal-trigger">
            <article class="service-card">
              <span class="service-number" aria-hidden="true">
                {{ service.number }}
              </span>
              <h3>
                {{ locale === "km" ? service.km : service.en }}
              </h3>
              <p>
                {{ locale === "km" ? service.descriptionKm : service.descriptionEn }}
              </p>
              <RouterLink class="service-link" to="/contact">
                {{ t("servicePage.enquire") }}
                <span aria-hidden="true">→</span>
              </RouterLink>
            </article>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.services-page {
  color: var(--color-primary);
}

.reveal-trigger {
  display: grid;
  min-width: 0;
}

.service-card:focus-within {
  clip-path: none;
  animation: none;
}

.services-hero {
  position: relative;
  isolation: isolate;
  overflow: hidden;
  box-sizing: border-box;
  aspect-ratio: 3 / 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 80px 24px;
  background-color: #18272b;
  color: #fff;
  text-align: center;
}

.bottom-round-bg {
  position: absolute;
  inset: auto 0 0;
  z-index: 999;
  height: 100px;
  margin-bottom: -2px;
  background-image: url("/images/round-bottom-bg.svg");
  background-position: 50% 100%;
  background-repeat: no-repeat;
  background-size: 100% 100%;
  pointer-events: none;
}

.services-hero::before {
  content: "";
  position: absolute;
  inset: 0;
  z-index: -1;
  pointer-events: none;
  background-image: linear-gradient(90deg, rgb(7 26 46 / 65%), rgb(7 26 46 / 10%)),
    url("/images/image.png");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

.service-intro {
  padding: 80px 32px;
  background: #fff;
}

.service-intro-grid {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
  align-items: center;
  gap: clamp(40px, 7vw, 120px);
}

.service-intro-content {
  max-width: 620px;
}

.service-intro-content h2 {
  margin: 0;
  color: var(--color-primary);
  font-size: clamp(28px, 3vw, 44px);
  font-weight: 500;
  line-height: 1.45;
}

.service-intro-content blockquote {
  margin: 24px 0;
  padding-left: 18px;
  border-left: 4px solid var(--color-accent-light);
  color: #647080;
  font-size: 15px;
  font-style: italic;
  line-height: 1.8;
}

.service-intro-description {
  margin: 0;
  color: #647080;
  font-size: 15px;
  line-height: 1.8;
}

.service-intro-visual {
  position: relative;
  isolation: isolate;
  width: 100%;
  max-width: 620px;
  box-sizing: border-box;
  justify-self: end;
  padding-top: 14px;
  padding-right: 48px;
}

/* Gold panel behind the portrait. */
.service-intro-visual::before {
  content: "";
  position: absolute;
  top: 0;
  right: 0;
  bottom: 14px;
  width: 38%;
  background: var(--color-accent-light);
  z-index: -1;
}

.service-intro-visual img {
  display: block;
  width: 100%;
  aspect-ratio: 1.1 / 1;
  object-fit: cover;
  object-position: center;
  filter: grayscale(100%);
}

.service-intro-ribbon {
  position: absolute;
  top: 14px;
  right: 0;
  bottom: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  color: var(--color-primary);
  font-size: clamp(16px, 1.8vw, 24px);
  font-weight: 500;
}

.service-intro-ribbon > span {
  writing-mode: vertical-rl;
  text-orientation: mixed;
  white-space: nowrap;
}

@media (max-width: 900px) {
  .service-intro-grid {
    gap: 32px;
  }
}

@media (max-width: 680px) {
  .service-intro {
    padding: 48px 20px;
  }

  .service-intro-grid {
    grid-template-columns: 1fr;
    gap: 40px;
  }

  .service-intro-content,
  .service-intro-visual {
    max-width: 100%;
  }

  .service-intro-visual {
    justify-self: stretch;
  }
}
.hero-container {
  width: 100%;
  max-width: 900px;
  margin-inline: auto;
}

.services-hero h1 {
  margin: 0;
  color: var(--color-accent-light);
  font-family: var(--font-heading);
  font-size: clamp(2.5rem, 5vw, 4rem);
  font-weight: 500;
  line-height: 1.35;
}

.hero-lead {
  max-width: 650px;
  margin: 24px auto 0;
  color: #fff;
  font-size: clamp(1.125rem, 2.5vw, 1.75rem);
  line-height: 1.6;
}

.services-container {
  max-width: 1520px;
  margin-inline: auto;
}

.services-section {
  padding: 80px 32px;
  background: #fff;
}

.section-heading {
  max-width: 850px;
  margin-bottom: 48px;
  padding-left: 24px;
  border-left: 4px solid var(--color-accent-light);
}

.eyebrow {
  margin: 0 0 12px;
  color: #8b6b34;
  font-size: 14px;
  font-weight: 500;
  line-height: 1.6;
}

.section-heading h2,
.services-contact h2 {
  margin: 0;
  font-size: clamp(26px, 3vw, 40px);
  font-weight: 500;
  line-height: 1.5;
}

.section-description {
  margin: 20px 0 0;
  color: #647080;
  line-height: 1.8;
}

.services-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 24px;
}

.service-card {
  display: flex;
  flex-direction: column;
  min-width: 0;
  padding: 32px;
  border: 1px solid #e4e7eb;
  background: #fff;
  transition: border-color 200ms ease;
}

.service-card:hover,
.service-card:focus-within {
  border-color: var(--color-accent);
}

.service-number {
  margin-bottom: 24px;
  color: var(--color-accent);
  font-size: 32px;
  font-weight: 500;
}

.service-card h3 {
  margin: 0;
  color: var(--color-primary);
  font-size: 22px;
  font-weight: 500;
  line-height: 1.5;
}

.service-card > p {
  margin: 16px 0 28px;
  color: #647080;
  font-size: 15px;
  line-height: 1.8;
}

.service-link {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  margin-top: auto;
  padding-top: 20px;
  border-top: 1px solid #e4e7eb;
  color: #8b6b34;
  font-size: 14px;
  line-height: 1.6;
  text-decoration: none;
}

.service-link:hover {
  color: var(--color-primary);
}

.services-contact {
  padding: 80px 32px;
  background: var(--color-primary);
  color: #fff;
  text-align: center;
}

.services-contact .eyebrow {
  color: var(--color-accent-light);
}

.services-contact h2 {
  color: #fff;
}

.contact-description {
  max-width: 650px;
  margin: 20px auto 28px;
  color: #c8d0dc;
  line-height: 1.8;
}

.contact-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  padding: 14px 28px;
  border: 1px solid var(--color-accent-light);
  background: var(--color-accent-light);
  color: var(--color-primary);
  font-weight: 500;
  line-height: 1.6;
  text-decoration: none;
}

.contact-button:hover {
  background: #e5cea4;
}

.service-link:focus-visible,
.contact-button:focus-visible {
  outline: 2px solid var(--color-accent);
  outline-offset: 5px;
}

@media (max-width: 900px) {
  .services-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 600px) {
  .services-hero {
    aspect-ratio: auto;
    min-height: 300px;
    padding: 48px 20px;
  }

  .services-hero::before {
    background-image: linear-gradient(rgb(7 26 46 / 75%), rgb(7 26 46 / 75%)),
      url("/images/image.png");
  }

  .services-section,
  .services-contact {
    padding: 48px 20px;
  }

  .section-heading {
    padding-left: 18px;
    margin-bottom: 32px;
  }

  .services-grid {
    grid-template-columns: 1fr;
  }

  .service-card {
    padding: 28px 24px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .service-card {
    transition: none;
  }
}
</style>
