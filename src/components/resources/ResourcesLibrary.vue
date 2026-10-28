<script setup>
import { computed } from "vue";
import { useI18n } from "vue-i18n";

const { t } = useI18n();
const coverModules = import.meta.glob("../../assets/picture/resource-*.png", {
  eager: true,
  import: "default",
});
const resources = computed(() =>
  Object.entries(coverModules)
    .map(([path, src]) => ({
      number: Number(path.match(/resource-(\d+)\.png$/)?.[1]),
      src,
    }))
    .filter((resource) => Number.isInteger(resource.number) && resource.number > 0)
    .sort((a, b) => a.number - b.number)
);
</script>

<template>
  <section class="resource-library" :aria-label="$t('resourcesPage.libraryLabel')">
    <div class="resource-library__grid">
      <article v-for="resource in resources" :key="resource.number" class="resource-card">
        <img
          class="resource-card__cover"
          :src="resource.src"
          :alt="t('resourcesPage.imageAlt', { number: resource.number })"
          loading="lazy"
          decoding="async"
        />
      </article>
    </div>
  </section>
</template>

<style scoped>
.resource-library {
  padding: 72px 24px 96px;
  background: #f5f5f5;
}

.resource-library__grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 306px));
  justify-content: center;
  gap: 40px;
  width: min(100%, 1120px);
  margin-inline: auto;
}

.resource-card {
  min-width: 0;
  text-align: center;
}

.resource-card__cover {
  display: block;
  width: 100%;
  aspect-ratio: 0.72;
  border-radius: 7px;
  background: #fff;
  object-fit: contain;
  box-shadow: 0 2px 8px rgb(22 32 48 / 6%);
}

.resource-card__title {
  margin: 22px 0 8px;
  color: var(--ink, #1b2437);
  font-size: 17px;
  font-weight: 700;
  line-height: 1.5;
}

.resource-card__description {
  margin: 0;
  color: var(--muted, #586177);
  font-size: 14px;
  line-height: 1.7;
}

@media (max-width: 760px) {
  .resource-library__grid {
    grid-template-columns: repeat(2, minmax(0, 306px));
    gap: 28px;
  }
}

@media (max-width: 520px) {
  .resource-library {
    padding: 48px 20px 64px;
  }

  .resource-library__grid {
    grid-template-columns: minmax(0, 306px);
    gap: 36px;
  }
}
</style>
