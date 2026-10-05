<script setup>
import SiteHeader from "./components/layout/SiteHeader.vue";
import SiteFooter from "./components/layout/SiteFooter.vue";
import { useLanguage } from "./composables/useLanguage.js";
import { usePageSmoother } from "./composables/usePageSmoother.js";

const { language, changeLanguage, handleLanguageKey } = useLanguage();
const { ready, headerSpace } = usePageSmoother(language);
</script>

<template>
  <div class="site-app">
    <input
      id="l-en"
      :checked="language === 'en'"
      @click.prevent="changeLanguage('en')"
      @keydown="handleLanguageKey"
      class="lang-radio"
      type="radio"
      name="lang"
      value="en"
    />

    <input
      id="l-km"
      :checked="language === 'km'"
      @click.prevent="changeLanguage('km')"
      @keydown="handleLanguageKey"
      class="lang-radio"
      type="radio"
      name="lang"
      value="km"
    />

    <a class="skip-link" href="#main-content"> Skip to content · រំលងទៅមាតិកា </a>

    <SiteHeader />

    <div id="smooth-wrapper">
      <div id="smooth-content">
        <div aria-hidden="true" :style="{ height: headerSpace + 'px' }"></div>
        <main id="main-content" tabindex="-1">
          <RouterView v-if="ready" />
        </main>
        <SiteFooter v-if="ready" />
      </div>
    </div>
  </div>
</template>
