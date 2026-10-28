<script setup>
import { useI18n } from "vue-i18n";

const { t } = useI18n();
const values = [0, 1, 2, 3, 4, 5];
</script>

<template>
  <section class="about-values">
    <div class="about-values__container">
      <h2>{{ t("aboutPage.values.title") }}</h2>
      <div class="about-values__grid">
        <article v-for="index in values" :key="index" class="about-values__card">
          <span class="about-values__icon" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none">
              <template v-if="index === 0 || index === 5">
                <path
                  d="M4 8h16v11H4zM9 8V5h6v3M4 12h16M10 12v2h4v-2"
                  stroke="currentColor"
                  stroke-width="1.8"
                  stroke-linejoin="round"
                />
              </template>
              <template v-else-if="index === 1">
                <path
                  d="m14 4 6-2-2 6-8 8-4-4 8-8ZM6 14l4 4-5 4 1-5-3-1 3-2ZM14 7l3 3"
                  stroke="currentColor"
                  stroke-width="1.8"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </template>
              <template v-else-if="index === 2">
                <circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="1.8" />
                <path
                  d="M3 12h18M12 3a15 15 0 0 1 0 18M12 3a15 15 0 0 0 0 18"
                  stroke="currentColor"
                  stroke-width="1.5"
                />
              </template>
              <template v-else-if="index === 3">
                <path
                  d="M5 5h6v6H5zM13 5h6v6h-6zM5 13h6v6H5zM13 13h6v6h-6z"
                  fill="currentColor"
                />
              </template>
              <template v-else>
                <path
                  d="M3 20h18M5 9h14M7 9v8m5-8v8m5-8v8M4 7l8-4 8 4H4Z"
                  stroke="currentColor"
                  stroke-width="1.8"
                  stroke-linejoin="round"
                />
              </template>
            </svg>
          </span>
          <h3>{{ t(`aboutPage.values.items.${index}.title`) }}</h3>
          <p>{{ t(`aboutPage.values.items.${index}.description`) }}</p>
        </article>
      </div>
    </div>
  </section>
</template>

<style scoped>
.about-values {
  padding: 32px 24px clamp(48px, 7vw, 80px);
  background: #fff;
  color: #17242d;
}

.about-values__container {
  width: 100%;
  max-width: var(--content-max-width);
  margin-inline: auto;
}

.about-values h2 {
  margin: 0 0 24px;
  color: #17242d;
  font-size: clamp(1.7rem, 3vw, 2.1rem);
  font-weight: 700;
  line-height: 1.3;
}

.about-values__grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 32px;
}

.about-values__card {
  display: flex;
  min-width: 0;
  min-height: 230px;
  flex-direction: column;
  align-items: center;
  padding: 24px 22px;
  border: 1px solid #e6e6e6;
  border-radius: 10px;
  box-shadow: 0 8px 24px rgb(23 36 45 / 4%);
  text-align: center;
}

.about-values__icon {
  display: grid;
  width: 36px;
  height: 36px;
  flex: 0 0 auto;
  place-items: center;
  margin-bottom: 14px;
  border-radius: 50%;
  background: #6b6b6b;
  color: #fff;
}

.about-values__icon svg {
  width: 18px;
  height: 18px;
}

.about-values__card h3 {
  margin: 0 0 12px;
  color: #17242d;
  font-size: 15px;
  font-weight: 700;
  line-height: 1.5;
  text-transform: uppercase;
}

.about-values__card p {
  margin: 0;
  color: #526071;
  font-size: 14px;
  line-height: 1.75;
}

@media (max-width: 800px) {
  .about-values__grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 20px;
  }
}

@media (max-width: 520px) {
  .about-values {
    padding-inline: 20px;
  }

  .about-values__grid {
    grid-template-columns: 1fr;
    gap: 16px;
  }

  .about-values__card {
    min-height: 0;
  }
}
</style>
