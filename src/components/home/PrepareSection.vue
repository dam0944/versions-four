<script setup>
import { useI18n } from "vue-i18n";

const { t } = useI18n();
const steps = [0, 1, 2];
</script>

<template>
  <section id="prepare" class="prepare">
    <div class="in">
      <div class="prepare-intro">
        <p class="eyebrow">{{ t("prepare.label") }}</p>
        <h2>{{ t("prepare.title") }}</h2>
        <p class="lead">{{ t("prepare.intro") }}</p>
        <a class="btn" href="#contact">{{ t("prepare.button") }}</a>
      </div>
      <ul class="prepare-list">
        <li v-for="index in steps" :key="index">
          <span class="prepare-number" aria-hidden="true">
            {{ String(index + 1).padStart(2, "0") }}
          </span>
          <div>
            <h3>{{ t(`prepare.steps.${index}.title`) }}</h3>
            <p>{{ t(`prepare.steps.${index}.description`) }}</p>
          </div>
        </li>
      </ul>
    </div>
  </section>
</template>
