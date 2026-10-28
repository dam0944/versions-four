<script setup>
import { provide } from "vue";
import { useI18n } from "vue-i18n";
import ContactSection from "../components/shared/ContactSection.vue";
import MapSection from "../components/shared/MapSection.vue";
const { t } = useI18n();
provide("disablePageAnimations", true);
</script>

<template>
  <div class="contact-page">
    <section class="contact-hero">
      <div class="hero-container">
        <h1>{{ t("contact.page.title") }}</h1>

        <p class="hero-lead">{{ t("contact.page.lead") }}</p>

        <p class="hero-description">{{ t("contact.page.description") }}</p>
      </div>
      <svg
        class="bottom-round-bg"
        viewBox="0 0 100 102"
        preserveAspectRatio="none"
        aria-hidden="true"
        focusable="false"
      >
        <path fill="#fff" d="M0 0 Q50 200 100 0 V102 H0 Z" />
      </svg>
    </section>
    <section class="contact-info">
      <div class="contact-info-container">
        <div class="contact-info-item">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 1 1 16 0Z" />
            <circle cx="12" cy="10" r="3" />
          </svg>

          <h2>{{ t("contact.page.headOffice") }}</h2>
          <p>
            {{ t("contact.page.addressLine1") }}<br />
            {{ t("contact.page.addressLine2") }}
          </p>
        </div>

        <div class="contact-info-item">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <rect x="2" y="4" width="20" height="16" rx="2" />
            <path d="m2 5 10 8L22 5" />
          </svg>

          <h2>{{ t("contact.page.emailSupport") }}</h2>

          <p>
            <a href="s.sreng@bakc.org.kh">s.sreng@bakc.org.kh</a>
            <br />
            <a href="mailto:support@example.com">support@example.com</a>
          </p>
        </div>

        <div class="contact-info-item">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path
              d="M22 16.92v3a2 2 0 0 1-2.18 2
          19.79 19.79 0 0 1-8.63-3.07
          19.5 19.5 0 0 1-6-6
          19.79 19.79 0 0 1-3.07-8.67
          A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72
          c.12.96.35 1.9.69 2.79
          a2 2 0 0 1-.45 2.11L8.09 9.89
          a16 16 0 0 0 6 6l1.27-1.27
          a2 2 0 0 1 2.11-.45
          c.89.34 1.83.57 2.79.69
          A2 2 0 0 1 22 16.92Z"
            />
          </svg>

          <h2>{{ t("contact.page.letsTalk") }}</h2>

          <p>
            {{ t("contact.page.phone", { numbers: "(+855)16 625 190 / 86 868 892" }) }}
            <br />
          </p>
        </div>

        <div class="contact-info-item">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <circle cx="12" cy="12" r="10" />
            <path d="M12 6v6l4 3" />
          </svg>

          <h2>{{ t("contact.page.officeHours") }}</h2>

          <p>
            {{ t("contact.page.officeHoursValue") }}
          </p>
        </div>
      </div>
    </section>

    <ContactSection />
    <MapSection />
  </div>
</template>

<style scoped>
.contact-page {
  background: #fff;
}

.contact-hero {
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
  display: block;
  width: 100%;
  height: 102px;
  pointer-events: none;
}

.contact-hero::before {
  content: "";
  position: absolute;
  inset: 0;
  z-index: -1;
  pointer-events: none;
  background-image: linear-gradient(90deg, rgb(7 26 46 / 65%), rgb(7 26 46 / 20%)),
    url("/images/image.png");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

.hero-container {
  width: 100%;
  max-width: 900px;
  margin-inline: auto;
}
.contact-info {
  position: relative;
  margin-top: -1px;
  padding: 80px 32px;
  background: #fff;
}

.contact-info-container {
  max-width: 1520px;
  margin-inline: auto;
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 32px;
}

.contact-info-item {
  min-width: 0;
  text-align: center;
}

.contact-info-item svg {
  display: block;
  width: 32px;
  height: 32px;
  margin: 0 auto 20px;
  fill: none;
  stroke: var(--color-accent);
  stroke-width: 1.5;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.contact-info-item h2 {
  margin: 0 0 14px;
  color: var(--color-primary);
  font-size: 20px;
  font-weight: 500;
  line-height: 1.5;
}

.contact-info-item p {
  margin: 0;
  color: #647080;
  font-size: 14px;
  line-height: 1.8;
  overflow-wrap: anywhere;
}

.contact-info-item a {
  color: inherit;
  text-decoration: none;
}

.contact-info-item a:hover {
  color: #8b6b34;
  text-decoration: underline;
}

.contact-info-item a:focus-visible {
  outline: 2px solid var(--color-accent);
  outline-offset: 4px;
}

@media (max-width: 900px) {
  .contact-info-container {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 40px 24px;
  }
}

@media (max-width: 600px) {
  .contact-info {
    padding: 48px 20px;
  }
}

@media (max-width: 420px) {
  .contact-info-container {
    grid-template-columns: 1fr;
  }
}
.contact-hero h1 {
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

.hero-description {
  max-width: 600px;
  margin: 16px auto 0;
  color: #d4dce5;
  font-size: 16px;
  line-height: 1.8;
}

@media (max-width: 600px) {
  .contact-hero {
    aspect-ratio: auto;
    min-height: 320px;
    padding: 48px 20px;
  }

  .contact-hero::before {
    background-image: linear-gradient(rgb(7 26 46 / 78%), rgb(7 26 46 / 78%)),
      url("/images/image.png");
  }

  .hero-description {
    font-size: 14px;
  }
}
</style>
