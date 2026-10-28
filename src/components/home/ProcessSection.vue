<script setup>
import { useI18n } from "vue-i18n";

const { t } = useI18n();
const steps = [0, 1, 2, 3];
</script>

<template>
  <section id="how">
    <div class="in">
      <p class="eyebrow">{{ t("process.label") }}</p>
      <h2>{{ t("process.title") }}</h2>
      <ol class="steps">
        <li v-for="index in steps" :key="index">
          <h3>{{ t(`process.steps.${index}.title`) }}</h3>
          <p>{{ t(`process.steps.${index}.description`) }}</p>
        </li>
      </ol>
    </div>
  </section>
</template>
