<script setup>
import { useI18n } from "vue-i18n";

const { t } = useI18n();
</script>

<template>
  <section class="about-overview">
    <div class="about-overview__container">
      <h2>{{ t("aboutPage.headline") }}</h2>
      <p class="about-overview__intro">{{ t("aboutPage.description") }}</p>

      <div class="about-overview__mission">
        <h3>{{ t("aboutPage.mission.title") }}</h3>
        <p>{{ t("aboutPage.mission.text") }}</p>
      </div>

      <div class="about-overview__vision">
        <h3>{{ t("aboutPage.vision.title") }}</h3>
        <p>{{ t("aboutPage.vision.text") }}</p>
      </div>
    </div>
  </section>
</template>

<style scoped>
.about-overview {
  padding: clamp(48px, 7vw, 88px) 24px 24px;
  background: #f5f5f5;
  color: #17242d;
}

.about-overview__container {
  width: min(1056px, 100%);
  margin-inline: auto;
}

.about-overview h2 {
  max-width: 760px;
  margin: 0 0 18px;
  font-family: var(--font-display);
  font-size: clamp(1.75rem, 3vw, 2.3rem);
  font-weight: 700;
  line-height: 1.35;
}

.about-overview p {
  margin: 0;
  font-size: 15px;
  line-height: 1.85;
}

.about-overview__intro {
  margin-bottom: 26px !important;
}

.about-overview__mission {
  margin-bottom: 24px;
}

.about-overview h3 {
  margin: 0 0 12px;
  font-family: var(--font-display);
  font-size: 1.3rem;
  font-weight: 700;
  line-height: 1.5;
}

@media (max-width: 600px) {
  .about-overview {
    padding-inline: 20px;
  }
}
</style>
