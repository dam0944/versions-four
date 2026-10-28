<script setup>
import { useI18n } from "vue-i18n";
const { t } = useI18n();
const services = ["licensing", "contracts", "tech", "fintech", "investment", "startups"];
</script>

<template>
  <section id="services" class="svcs">
    <div class="in">
      <div class="stick">
        <div class="tag">
          <b>02</b><span>{{ t("services.label") }}</span>
        </div>
        <h2>{{ t("services.title") }}</h2>
        <p>{{ t("services.intro") }}</p>
      </div>
      <ol>
        <li v-for="(id, i) in services" :key="id">
          <a class="item" href="#contact">
            <small>{{ String(i + 1).padStart(2, "0") }}</small>
            <div>
              <h3>{{ t(`services.items.${id}.title`) }}</h3>
              <p>{{ t(`services.items.${id}.desc`) }}</p>
            </div>
            <span class="arr">↗</span>
          </a>
        </li>
      </ol>
    </div>
  </section>
</template>
