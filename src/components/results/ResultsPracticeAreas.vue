<script setup>
import { computed } from "vue";
import { useI18n } from "vue-i18n";
import { RouterLink } from "vue-router";

const { t, tm } = useI18n();
const areas = computed(() => tm("resultsPage.areas"));
</script>

<template>
  <section id="practice-areas" class="results-practice">
    <div class="results-practice__container">
      <p class="results-practice__intro">{{ t("resultsPage.areasIntro") }}</p>

      <nav class="results-practice__grid" :aria-label="t('resultsPage.areasLabel')">
        <RouterLink
          v-for="area in areas"
          :key="area.id"
          class="results-practice__link"
          :to="{ hash: `#practice-area-${area.id}` }"
        >
          <span class="results-practice__number">{{ area.id }}</span>
          <span class="results-practice__link-title">{{ area.title }}</span>
        </RouterLink>
      </nav>

      <div class="results-practice__details">
        <section
          v-for="area in areas"
          :id="`practice-area-${area.id}`"
          :key="area.id"
          class="results-practice__detail"
          tabindex="-1"
        >
          <span class="results-practice__number">{{ area.id }}</span>
          <div>
            <h2>{{ area.title }}</h2>
            <ul>
              <li v-for="(project, index) in area.projects" :key="index">
                {{ project }}
              </li>
            </ul>
          </div>
        </section>
      </div>
    </div>
  </section>
</template>

<style scoped>
.results-practice {
  padding: 72px 24px 96px;
  background: var(--card, #fff);
  color: var(--ink, #1b2437);
}

.results-practice__container {
  width: min(100%, 1160px);
  margin-inline: auto;
}

.results-practice__intro {
  margin: 0 0 46px;
  color: var(--muted, #586177);
  font-size: 16px;
  line-height: 1.9;
}

.results-practice__grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  border-top: 1px solid var(--line, #dedede);
  border-left: 1px solid var(--line, #dedede);
}

.results-practice__link {
  display: flex;
  align-items: flex-start;
  gap: 14px;
  min-height: 88px;
  padding: 22px;
  border-right: 1px solid var(--line, #dedede);
  border-bottom: 1px solid var(--line, #dedede);
  color: inherit;
  text-decoration: none;
  transition: background-color 180ms ease;
}

.results-practice__link:hover {
  background: var(--cream, #f4f1ea);
}

.results-practice__link:focus-visible {
  position: relative;
  z-index: 1;
  outline: 3px solid var(--color-accent, #b9975b);
  outline-offset: -3px;
}

.results-practice__number {
  flex: 0 0 auto;
  color: #d62637;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.06em;
}

.results-practice__link-title {
  font-size: 13px;
  font-weight: 700;
  line-height: 1.55;
  text-transform: uppercase;
}

.results-practice__details {
  margin-top: 56px;
}

.results-practice__detail {
  display: grid;
  grid-template-columns: 90px minmax(0, 1fr);
  gap: 24px;
  padding: 38px 0;
  border-bottom: 1px solid var(--line, #dedede);
  scroll-margin-top: 84px;
}

.results-practice__detail:first-child {
  border-top: 1px solid var(--line, #dedede);
}

.results-practice__detail:focus {
  outline: none;
}

.results-practice__detail h2 {
  margin: -5px 0 22px;
  color: var(--ink, #1b2437);
  font-size: clamp(18px, 2vw, 22px);
  font-weight: 700;
  line-height: 1.45;
  text-transform: uppercase;
}

.results-practice__detail ul {
  display: grid;
  gap: 14px;
  margin: 0;
  padding-left: 20px;
  color: var(--muted, #586177);
  font-size: 14px;
  line-height: 1.75;
}

.results-practice__detail li::marker {
  color: #d62637;
}

@media (max-width: 800px) {
  .results-practice__grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .results-practice__detail {
    grid-template-columns: 52px minmax(0, 1fr);
    gap: 12px;
  }
}

@media (max-width: 540px) {
  .results-practice {
    padding: 52px 16px 68px;
  }

  .results-practice__intro {
    margin-bottom: 30px;
  }

  .results-practice__grid {
    grid-template-columns: 1fr;
  }

  .results-practice__link {
    min-height: 70px;
    padding: 18px;
  }

  .results-practice__details {
    margin-top: 40px;
  }

  .results-practice__detail {
    grid-template-columns: 34px minmax(0, 1fr);
    gap: 8px;
    padding: 30px 0;
  }
}

@media (prefers-reduced-motion: reduce) {
  .results-practice__link {
    transition: none;
  }
}
</style>
