<script setup>
import { useI18n } from "vue-i18n";
const { t } = useI18n();
</script>

<template>
  <footer>
    <div class="in">
      <div class="top2">
        <RouterLink class="brand" to="/"
          ><img style="width: 50px" src="/logo.png" :alt="t('header.logoAlt')" /><span
            ><b>{{ t("footer.brand") }}</b
            ><small>{{ t("footer.brandSubtitle") }}</small></span
          ></RouterLink
        >
        <p class="tagline">{{ t("footer.tagline") }}</p>
        <nav>
          <RouterLink to="/about">{{ t("footer.about") }}</RouterLink>
          <RouterLink to="/service">{{ t("footer.services") }}</RouterLink>
          <RouterLink to="/#notary">{{ t("footer.notary") }}</RouterLink>
          <RouterLink to="/contact">{{ t("footer.contact") }}</RouterLink>
        </nav>
      </div>
      <div class="copy">{{ t("footer.copyright") }}</div>
    </div>
  </footer>
</template>
