<script setup>
import { useI18n } from "vue-i18n";

const { t } = useI18n();
</script>

<template>
  <section id="firm" class="firm">
    <div class="in">
      <div class="firm-heading">
        <div class="tag">
          <b>{{ t("about.index") }}</b>
          <span>{{ t("about.label") }}</span>
        </div>
        <h2>{{ t("about.whoWeAre") }}</h2>
      </div>

      <div class="txt">
        <div class="txt-lead">
          <p>{{ t("about.p1") }}</p>
        </div>
        <div class="txt-details">
          <p>{{ t("about.p2") }}</p>
          <p>{{ t("about.p3") }}</p>
          <p>{{ t("about.p4") }}</p>
          <p>{{ t("about.p5") }}</p>
        </div>
      </div>
    </div>

    <div class="mv">
      <div>
        <h3>{{ t("about.vision.title") }}</h3>
        <p>{{ t("about.vision.text") }}</p>
      </div>
      <div>
        <h3>{{ t("about.mission.title") }}</h3>
        <p>{{ t("about.mission.text") }}</p>
        <p class="commitment-intro">{{ t("about.mission.commitmentIntro") }}</p>
        <ul>
          <li>{{ t("about.mission.commitments.0") }}</li>
          <li>{{ t("about.mission.commitments.1") }}</li>
          <li>{{ t("about.mission.commitments.2") }}</li>
          <li>{{ t("about.mission.commitments.3") }}</li>
          <li>{{ t("about.mission.commitments.4") }}</li>
        </ul>
      </div>
    </div>
  </section>
</template>
