<script setup>
import { useI18n } from "vue-i18n";

const { t } = useI18n();
const items = [0, 1, 2];
</script>

<template>
  <section id="values" class="vals">
    <div class="in">
      <span class="q" aria-hidden="true">“</span>
      <p class="big">{{ t("values.statement") }}</p>
      <div class="cols">
        <div v-for="index in items" :key="index" class="col">
          <small>{{ String(index + 1).padStart(2, "0") }}</small>
          <h3>{{ t(`values.items.${index}.title`) }}</h3>
          <p>{{ t(`values.items.${index}.description`) }}</p>
        </div>
      </div>
    </div>
  </section>
</template>
