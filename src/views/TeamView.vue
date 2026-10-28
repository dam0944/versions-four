<script setup>
import { useI18n } from "vue-i18n";
import TeamSection from "../components/about/TeamSection.vue";

const { t } = useI18n();
</script>

<template>
  <div class="team-page">
    <section class="team-intro">
      <div class="in">
        <h1>{{ t("teamPage.title") }}</h1>
        <p class="lead">{{ t("teamPage.lead") }}</p>
      </div>
      <div class="bottom-round-bg" aria-hidden="true"></div>
    </section>
    <TeamSection />
  </div>
</template>

<style scoped>
.team-intro {
  position: relative;
  isolation: isolate;
  overflow: hidden;
  aspect-ratio: 3 / 1;
  display: flex;
  align-items: center;
  background-color: #18272b;
  color: #fff;
  padding-block: 80px;
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

.team-intro::before {
  content: "";
  position: absolute;
  inset: 0;
  z-index: -1;
  pointer-events: none;
  background-image: linear-gradient(90deg, rgb(7 26 46 / 65%), rgb(7 26 46 / 10%)),
    url("/images/image.png");
  background-size: 100% 100%, cover;
  background-position: center;
  background-repeat: no-repeat;
}

.in {
  max-width: 1520px;
  margin-inline: auto;
}

h1 {
  margin: 0;
  color: var(--color-accent-light);
  font-family: var(--font-heading);
  font-size: clamp(2.5rem, 5vw, 4rem);
  font-weight: 500;
  line-height: 1.2;
}

.lead {
  color: #fff;
  max-width: 600px;
  margin: 24px auto 0;
  font-size: clamp(1.125rem, 2.5vw, 1.75rem);
  line-height: 1.35;
}

@media (max-width: 600px) {
  .team-intro {
    padding-block: 48px;
  }

  .team-intro::before {
    background-image: linear-gradient(rgb(7 26 46 / 75%), rgb(7 26 46 / 75%)),
      url("/images/image.png");
  }
}
</style>
