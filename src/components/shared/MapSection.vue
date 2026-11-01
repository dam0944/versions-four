<script setup>
import { useI18n } from "vue-i18n";

const { t } = useI18n();
</script>

<template>
  <section id="map">
    <div class="in map-wrap">
      <div class="map-info">
        <p class="eyebrow">{{ t("map.label") }}</p>
        <h2>{{ t("map.title") }}</h2>
        <p class="lead">{{ t("map.address") }}</p>
        <p>{{ t("map.hours") }}</p>
        <a class="btn" href="#contact">{{ t("map.directions") }}</a>
      </div>
      <iframe
        class="office-map"
        :title="t('map.frameTitle')"
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1259.1763174519492!2d104.91051559987787!3d11.563790624445888!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31095114f1138ac5%3A0x7619b468836cd886!2sPhnom%20Penh%20international%20university!5e0!3m2!1sen!2skh!4v1793550329605!5m2!1sen!2skh"
        allowfullscreen=""
        loading="lazy"
        referrerpolicy="strict-origin-when-cross-origin"
      ></iframe>
    </div>
  </section>
</template>

<style scoped>
#map {
  padding-block: 0;
  padding-left: max(
    var(--page-gutter, 24px),
    calc((100% - var(--content-max-width)) / 2)
  );
  padding-right: 0;
}

.map-info .eyebrow {
  font-family: var(--font-khmer);
}

.map-wrap {
  max-width: none;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1.4fr);
  gap: clamp(24px, 4vw, 64px);
}

.map-info {
  min-width: 0;
  align-self: start;
  padding-block: 48px;
}

.office-map {
  display: block;
  width: 100%;
  height: 100%;
  min-height: 450px;
  border: 0;
  border-radius: 0;
  background: var(--cream2);
}

@media (max-width: 900px) {
  #map {
    padding-left: 20px;
    padding-right: 0;
  }

  .map-wrap {
    grid-template-columns: minmax(0, 1fr);
  }

  .map-info {
    padding-bottom: 0;
  }

  .office-map {
    height: clamp(320px, 60vw, 450px);
    min-height: 0;
  }
}
</style>
