<script setup>
import { computed } from "vue";
import { useI18n } from "vue-i18n";

const { t, tm } = useI18n();
const areas = computed(() => tm("resultsPage.areas"));
</script>

<template>
  <section class="results-expertise" aria-labelledby="results-expertise-title">
    <div class="results-expertise__container">
      <header class="results-expertise__header">
        <span class="results-expertise__eyebrow" aria-hidden="true"></span>
        <h2 id="results-expertise-title">{{ t("resultsPage.title") }}</h2>
      </header>
      <ol class="results-expertise__list">
        <li v-for="(area, index) in areas" :key="index">
          <span class="results-expertise__number" aria-hidden="true">
            {{ String(index + 1).padStart(2, "0") }}
          </span>
          <h3 class="results-expertise__name">{{ area }}</h3>
        </li>
      </ol>
    </div>
  </section>
</template>

<style scoped>
.results-expertise {
  padding: clamp(56px, 7vw, 88px) 24px clamp(64px, 8vw, 104px);
  background: #fff;
  color: var(--ink, #1b2437);
}

.results-expertise__container {
  width: min(100%, 1200px);
  margin-inline: auto;
}

.results-expertise__header {
  display: flex;
  align-items: center;
  gap: 18px;
  margin-bottom: 32px;
}

.results-expertise__eyebrow {
  display: block;
  flex: 0 0 36px;
  width: 36px;
  height: 2px;
  background: var(--gold, #b8893a);
}

.results-expertise__header h2 {
  margin: 0;
  color: var(--ink, #1b2437);
  font-family: var(--font-heading);
  font-size: clamp(1.8rem, 3.4vw, 2.6rem);
  font-weight: 600;
  line-height: 1.25;
}

.results-expertise__list {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 16px;
  margin: 0;
  padding: 0;
  list-style: none;
}

.results-expertise__list li {
  display: grid;
  grid-template-columns: 32px minmax(0, 1fr);
  align-items: start;
  gap: 16px;
  min-height: 120px;
  padding: 22px 20px;
  border: 1px solid var(--line, #e3d9c4);
  background: var(--card, #fff);
}

.results-expertise__number {
  padding-top: 3px;
  color: var(--gold, #b8893a);
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.04em;
}

.results-expertise__name {
  margin: 0;
  color: var(--ink, #1b2437);
  font-size: 1rem;
  font-weight: 600;
  line-height: 1.5;
}

@media (max-width: 1000px) {
  .results-expertise__list {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 600px) {
  .results-expertise {
    padding-inline: 20px;
  }

  .results-expertise__header {
    gap: 14px;
    margin-bottom: 24px;
  }

  .results-expertise__eyebrow {
    flex-basis: 24px;
    width: 24px;
  }

  .results-expertise__list {
    grid-template-columns: 1fr;
    gap: 10px;
  }

  .results-expertise__list li {
    min-height: 92px;
    padding: 18px 16px;
    gap: 12px;
  }

  .results-expertise__name {
    font-size: 1rem;
  }
}

</style>
