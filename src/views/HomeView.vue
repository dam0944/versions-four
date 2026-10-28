<script setup>
import { ref, inject, watch, nextTick } from "vue";
import { useScrollAnimations } from "../composables/useScrollAnimations.js";

import HeroSection from "../components/home/HeroSection.vue";
import FirmSection from "../components/home/FirmSection.vue";
import ServicesSection from "../components/home/ServicesSection.vue";
import ValuesSection from "../components/home/ValuesSection.vue";
import NotarySection from "../components/home/NotarySection.vue";
import ProcessSection from "../components/home/ProcessSection.vue";
import FaqSection from "../components/home/FaqSection.vue";
import PrepareSection from "../components/home/PrepareSection.vue";
import ContactSection from "../components/shared/ContactSection.vue";
import MapSection from "../components/shared/MapSection.vue";
import TestimonialsSection from "../components/home/TestimonialsSection.vue";
import PracticeAreas from "../components/home/PracticeAreas.vue";

const page = ref(null);
const language = inject("language");

const { refresh } = useScrollAnimations(page);

watch(language, async () => {
  await nextTick();
  refresh();
});
</script>

<template>
  <div ref="page">
    <HeroSection />
    <FirmSection />
    <ServicesSection />
    <ValuesSection />
    <NotarySection />
    <TestimonialsSection />
    <ProcessSection />
    <FaqSection />
    <PracticeAreas />
    <PrepareSection />
    <ContactSection />
    <MapSection />
  </div>
</template>
