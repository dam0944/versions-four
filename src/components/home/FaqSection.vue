<script setup>
import { computed, onBeforeUnmount, onMounted, watch } from "vue";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useI18n } from "vue-i18n";
import { useSimpleMotion } from "../../utils/performance.js";

const { locale, t, tm } = useI18n();
const items = computed(() => tm("faq.items"));
const animations = new Map();

function finish(details, expanded) {
  details.open = expanded;
  gsap.set(details, { clearProps: "height,overflow" });
  animations.delete(details);
}

function toggleAnswer(event) {
  event.preventDefault();
  const summary = event.currentTarget;
  const details = summary.parentElement;
  const previous = animations.get(details);
  const expanded = !(previous?.expanded ?? details.open);
  const startHeight = details.getBoundingClientRect().height;
  previous?.tween.kill();

  if (useSimpleMotion()) {
    finish(details, expanded);
    ScrollTrigger.refresh();
    return;
  }

  gsap.set(details, { clearProps: "height,overflow" });
  details.open = expanded;
  const endHeight = details.getBoundingClientRect().height;
  details.open = true;
  gsap.set(details, { height: startHeight, overflow: "hidden" });

  const tween = gsap.to(details, {
    height: endHeight,
    duration: 0.38,
    ease: "power2.inOut",
    onComplete: () => {
      finish(details, expanded);
      ScrollTrigger.refresh();
    },
  });
  animations.set(details, { tween, expanded });
}

function settleAnimations() {
  animations.forEach(({ tween, expanded }, details) => {
    tween.kill();
    finish(details, expanded);
  });
}

watch(locale, settleAnimations);
onMounted(() => window.addEventListener("resize", settleAnimations));
onBeforeUnmount(() => {
  window.removeEventListener("resize", settleAnimations);
  settleAnimations();
});
</script>

<template>
  <section id="faq" class="alt faq">
    <div class="in faqgrid">
      <div class="list">
        <p class="eyebrow">FAQ</p>
        <h2>{{ t("faq.title") }}</h2>
        <p class="intro">{{ t("faq.intro") }}</p>
        <details v-for="(item, index) in items" :key="index">
          <summary @click="toggleAnswer">{{ item.title }}</summary>
          <p>{{ item.description }}</p>
        </details>
      </div>
      <img
        loading="lazy"
        decoding="async"
        class="scales"
        src="/images/website-4.jpeg"
        :alt="t('faq.imageAlt')"
      />
    </div>
  </section>
</template>
