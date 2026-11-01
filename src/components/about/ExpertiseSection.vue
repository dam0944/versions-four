<script setup>
import { useI18n } from "vue-i18n";
import { legalExpertise } from "../../data/legalExpertise.js";

const { t, locale } = useI18n();
</script>

<template>
  <section class="expertise-section">
    <div class="expertise-container">
      <div class="expert-card">
        <div class="expert-heading">
          <p class="eyebrow">{{ t("aboutPage.expertise.who") }}</p>
          <h2>{{ t("aboutPage.expertise.dedicated") }}</h2>
        </div>
        <img
          decoding="async"
          class="expert-portrait"
          src="/images/website-5.png"
          :alt="t('aboutPage.expertisePortraitAlt')"
          loading="lazy"
        />
      </div>
      <div class="expert-introduction">
        <blockquote>{{ t("aboutPage.expertise.quote") }}</blockquote>
        <p>{{ t("aboutPage.expertise.intro") }}</p>
      </div>
      <div class="expert-skills">
        <h3>{{ t("aboutPage.expertise.heading") }}</h3>
        <p class="skills-description">{{ t("aboutPage.expertise.description") }}</p>
        <div class="expertise-list">
          <article
            v-for="area in legalExpertise"
            :key="area.id"
            class="expertise-item"
          >
            <span class="expertise-number" aria-hidden="true">{{ area.id }}</span>
            <div>
              <h4>{{ locale === "km" ? area.km.title : area.en.title }}</h4>
              <p>{{ locale === "km" ? area.km.description : area.en.description }}</p>
            </div>
          </article>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.expertise-section {
  position: relative;
  isolation: isolate;
  padding: 80px 32px;
  background: var(--color-primary);
}

.expertise-section::before,
.expertise-section::after {
  content: "";
  position: absolute;
  inset-inline: 0;
  z-index: -1;
}

.expertise-section::before {
  top: 0;
  height: 260px;
  background: #fff;
}

.expertise-section::after {
  top: 260px;
  bottom: 0;
  background: linear-gradient(rgb(7 26 46 / 90%), rgb(7 26 46 / 90%)),
    var(--color-primary);
}

.expertise-container {
  max-width: 1520px;
  margin-inline: auto;
  display: grid;
  grid-template-columns: minmax(280px, 420px) minmax(0, 1fr);
  grid-template-rows: 180px auto;
  column-gap: clamp(32px, 5vw, 80px);
}

.expert-card {
  grid-column: 1;
  grid-row: 1 / 3;
  align-self: start;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  width: 100%;
  height: 600px;
  box-sizing: border-box;
  border: 8px solid var(--color-accent-light);
  background: #fff;
}

.expert-heading {
  padding: 28px 28px 0;
}

.eyebrow {
  margin: 0 0 16px;
  color: #8b6b34;
  font-size: 14px;
  font-weight: 600;
}

.expert-heading h2 {
  margin: 0;
  color: var(--color-primary);
  font-size: clamp(28px, 3vw, 40px);
  font-weight: 500;
  line-height: 1.35;
}

.expert-portrait {
  display: block;
  flex: 1 1 auto;
  width: 100%;
  min-height: 0;
  height: auto;
  margin-top: 28px;
  object-fit: contain;
  object-position: center bottom;
}

.expert-introduction {
  grid-column: 2;
  grid-row: 1;
  align-self: start;
  padding-top: 24px;
}

.expert-introduction blockquote {
  margin: 0;
  padding-left: 18px;
  border-left: 4px solid var(--color-accent-light);
  color: var(--color-primary);
  font-size: clamp(18px, 2vw, 24px);
  font-style: italic;
  line-height: 1.5;
}

.expert-introduction > p {
  margin: 16px 0 0;
  color: #647080;
  font-size: 14px;
  line-height: 1.7;
}

.expert-skills {
  grid-column: 2;
  grid-row: 2;
  padding-top: 64px;
  padding-bottom: 24px;
  color: #fff;
}

.expert-skills h3 {
  margin: 0;
  color: #fff;
  font-size: clamp(24px, 2.5vw, 32px);
  font-weight: 500;
  line-height: 1.4;
}

.skills-description {
  max-width: 720px;
  margin: 16px 0 28px;
  color: #c8d0dc;
  font-size: 14px;
  line-height: 1.8;
}

.expertise-list {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 0 32px;
}

.expertise-item {
  display: grid;
  grid-template-columns: 32px minmax(0, 1fr);
  gap: 12px;
  padding: 20px 0;
  border-top: 1px solid rgb(255 255 255 / 22%);
}

.expertise-number {
  color: var(--color-accent-light);
  font-size: 14px;
  font-variant-numeric: tabular-nums;
}

.expertise-item h4 {
  margin: 0;
  color: #fff;
  font-size: 16px;
  font-weight: 600;
  line-height: 1.45;
}

.expertise-item p {
  margin: 8px 0 0;
  color: #c8d0dc;
  font-size: 13px;
  line-height: 1.7;
}

@media (max-width: 900px) {
  .expertise-section {
    padding: 48px 24px;
  }

  .expertise-section::before {
    height: 230px;
  }

  .expertise-section::after {
    top: 230px;
  }

  .expertise-container {
    grid-template-columns: minmax(240px, 320px) minmax(0, 1fr);
    grid-template-rows: 182px auto;
    column-gap: 28px;
  }

  .expert-heading {
    padding: 24px 20px 0;
  }

  .expert-card {
    height: 560px;
  }

  .expert-introduction {
    padding-top: 0;
  }

  .expert-skills {
    padding-top: 40px;
  }

  .expertise-list {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 680px) {
  .expertise-section {
    padding: 48px 20px;
    background: #fff;
  }

  .expertise-section::before,
  .expertise-section::after {
    display: none;
  }

  .expertise-container {
    grid-template-columns: 1fr;
    grid-template-rows: auto;
    gap: 32px;
  }

  .expert-card,
  .expert-introduction,
  .expert-skills {
    grid-column: auto;
    grid-row: auto;
  }

  .expert-card {
    width: 100%;
    max-width: 420px;
    height: 540px;
    margin-inline: auto;
    box-sizing: border-box;
  }

  .expert-skills {
    padding: 32px 24px;
    background: linear-gradient(rgb(7 26 46 / 92%), rgb(7 26 46 / 92%)),
      var(--color-primary);
  }
}
</style>
