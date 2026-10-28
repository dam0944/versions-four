<script setup>
import { useI18n } from "vue-i18n";

const { t } = useI18n();
</script>

<template>
  <section id="firm" class="firm">
    <div class="in">
      <div class="tag">
        <b>{{ t("about.index") }}</b>
        <span>{{ t("about.label") }}</span>
      </div>

      <div>
        <p class="kick">{{ t("about.eyebrow") }}</p>
        <h2>{{ t("about.headline") }}</h2>
      </div>

      <div class="txt">
        <p>{{ t("about.p1") }}</p>
        <p>{{ t("about.p2") }}</p>
      </div>
    </div>

    <div class="mv">
      <div>
        <h3>{{ t("about.mission.title") }}</h3>
        <p>{{ t("about.mission.text") }}</p>
      </div>
      <div>
        <h3>{{ t("about.vision.title") }}</h3>
        <p>{{ t("about.vision.text") }}</p>
      </div>
    </div>
  </section>
</template>
