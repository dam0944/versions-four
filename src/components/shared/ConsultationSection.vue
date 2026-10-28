<script setup>
import { ref } from "vue";
import { useBackgroundReveal } from "../../composables/useBackgroundReveal.js";
import { RouterLink } from "vue-router";
import { useI18n } from "vue-i18n";
const backgroundSection = ref(null);
const { t } = useI18n();
useBackgroundReveal(backgroundSection);
</script>

<template>
  <section ref="backgroundSection" class="consultation-section">
    <div class="consultation-container">
      <h2>
        {{ t("consultationBanner.title") }}
        <span class="heading-line">{{ t("consultationBanner.subtitle") }}</span>
      </h2>

      <p>{{ t("consultationBanner.description") }}</p>

      <RouterLink class="consultation-button" to="/contact">
        {{ t("consultationBanner.button") }}
        <span aria-hidden="true">→</span>
      </RouterLink>
    </div>
  </section>
</template>

<style scoped>
.consultation-section {
  position: relative;
  isolation: isolate;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 380px;
  box-sizing: border-box;
  padding: 72px 32px;
  background-color: var(--color-primary);
  color: #fff;
  text-align: center;
}

.consultation-section::before {
  content: "";
  position: absolute;
  inset: 0;
  z-index: -1;
  pointer-events: none;
  clip-path: var(--background-reveal-clip, polygon(0 0, 100% 0, 100% 100%, 0 100%));
  background-image: linear-gradient(rgb(7 18 30 / 72%), rgb(7 18 30 / 72%)),
    url("/images/images.png");
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
}

.consultation-container {
  width: 100%;
  max-width: 900px;
  margin-inline: auto;
}

.consultation-container h2 {
  margin: 0;
  color: #fff;
  font-family: var(--font-heading);
  font-size: clamp(26px, 3vw, 40px);
  font-weight: 500;
  line-height: 1.5;
}

.heading-line {
  display: block;
}

.consultation-container p {
  max-width: 650px;
  margin: 20px auto 28px;
  color: #e0e5eb;
  font-size: 16px;
  line-height: 1.8;
}

.consultation-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 18px;
  padding: 14px 28px;
  border: 1px solid var(--color-accent-light);
  background: var(--color-accent-light);
  color: var(--color-primary);
  font-size: 14px;
  font-weight: 600;
  line-height: 1.7;
  text-decoration: none;
}

.consultation-button:hover {
  background: #e5cea4;
  border-color: #e5cea4;
}

.consultation-button:focus-visible {
  outline: 2px solid #fff;
  outline-offset: 5px;
}

@media (max-width: 600px) {
  .consultation-section {
    min-height: 340px;
    padding: 48px 20px;
  }

  .consultation-container p {
    font-size: 15px;
  }

  .consultation-button {
    padding: 14px 22px;
  }
}
</style>
