<script setup>
import { enhancedMotionQuery } from "../../utils/performance.js";

import { onBeforeUnmount, onMounted, ref } from "vue";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useI18n } from "vue-i18n";

gsap.registerPlugin(ScrollTrigger);

const contentRef = ref(null);
const photoRef = ref(null);
const { t } = useI18n();
let media;

onMounted(() => {
  media = gsap.matchMedia();

  media.add(enhancedMotionQuery, () => {
    gsap.fromTo(
      contentRef.value,
      {
        opacity: 0,
        y: 48,
      },
      {
        opacity: 1,
        y: 0,
        duration: 1.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: contentRef.value,
          start: "top 82%",
          once: true,
        },
      }
    );

    gsap.fromTo(
      photoRef.value,
      {
        opacity: 0,
        y: 54,
        clipPath: "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)",
      },
      {
        opacity: 1,
        y: 0,
        clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
        duration: 1.4,
        ease: "power3.inOut",
        scrollTrigger: {
          trigger: photoRef.value,
          start: "top 82%",
          once: true,
        },
      }
    );
  });
});

onBeforeUnmount(() => {
  media?.revert();
});
</script>

<template>
  <section id="notary" class="notary-section">
    <div class="notary-container">
      <div ref="contentRef" class="notary-content">
        <div class="notary-section__tag">
          <b>{{ t("president.index") }}</b>
          <span class="notary-section__tag-label">{{ t("president.label") }}</span>
        </div>
        <h2>{{ t("president.name") }}</h2>
        <p class="notary-description">{{ t("president.description") }}</p>

        <ul class="notary-services">
          <li v-for="index in [0, 1, 2, 3]" :key="index">
            {{ t(`president.services.${index}`) }}
          </li>
        </ul>
      </div>

      <div ref="photoRef" class="notary-photo">
        <img
          decoding="async"
          src="/images/website-3.jpeg"
          :alt="t('president.portraitAlt')"
          loading="lazy"
        />
      </div>
    </div>
  </section>
</template>

<style scoped>
.notary-section {
  padding: clamp(56px, 7vw, 100px) 32px;
  background: #fff;
}

.notary-container {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
  align-items: center;
  gap: clamp(40px, 6vw, 100px);
  max-width: 1520px;
  margin-inline: auto;
}

.notary-section__tag {
  display: flex;
  align-items: center;
  gap: 18px;
  margin-bottom: 24px;
}

.notary-section__tag b {
  color: #b8893a;
  font-family: var(--font-latin);
  font-size: 13px;
  font-weight: 800;
}

.notary-section__tag .km {
  color: #16233a;
  font-family: var(--font-khmer-title);
  font-size: 13px;
  font-weight: 400;
  line-height: 2;
}

.notary-content {
  min-width: 0;
  max-width: 650px;
  opacity: 1;
  will-change: transform, opacity;
}

.section-tag {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 24px;
  color: #8b6b34;
  font-size: 14px;
  line-height: 1.7;
}

.section-tag b {
  padding-right: 12px;
  border-right: 1px solid var(--color-accent-light);
  font-size: 12px;
  font-weight: 500;
}

.notary-content h2 {
  margin: 0 0 24px;
  color: var(--color-primary);
  font-family: var(--font-heading);
  font-size: clamp(32px, 3.5vw, 48px);
  font-weight: 500;
  line-height: 1.45;
}

.notary-description {
  margin: 0;
  padding-left: 20px;
  border-left: 3px solid var(--color-accent);
  color: #647080;
  font-size: 16px;
  line-height: 1.9;
}

.notary-services {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 14px 24px;
  margin: 28px 0 0;
  padding: 0;
  list-style: none;
}

.notary-services li {
  position: relative;
  padding-left: 16px;
  color: #596574;
  font-size: 14px;
  line-height: 1.8;
}

.notary-services li::before {
  content: "";
  position: absolute;
  top: 0.75em;
  left: 0;
  width: 5px;
  height: 5px;
  background: var(--color-accent);
}

.notary-photo {
  position: relative;
  isolation: isolate;
  width: 100%;
  max-width: 600px;
  box-sizing: border-box;
  justify-self: end;
  padding: 14px 38px 0 0;
  opacity: 1;
  clip-path: polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%);
  will-change: transform, opacity, clip-path;
}

/* Offset gold panel behind the portrait. */
.notary-photo::before {
  content: "";
  position: absolute;
  top: 0;
  right: 0;
  bottom: 14px;
  width: 35%;
  background: var(--color-accent-light);
  z-index: -1;
}

.notary-photo img {
  display: block;
  width: 100%;
  aspect-ratio: 1.1 / 1;
  object-fit: cover;
  object-position: center top;
  filter: grayscale(100%);
}

@media (max-width: 900px) {
  .notary-container {
    gap: 32px;
  }

  .notary-services {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 680px) {
  .notary-section {
    padding: 48px 20px;
  }

  .notary-container {
    grid-template-columns: 1fr;
    gap: 36px;
  }

  .notary-content {
    max-width: 100%;
  }

  .notary-photo {
    max-width: 480px;
    justify-self: center;
    padding-right: 28px;
  }

  .notary-description {
    font-size: 15px;
  }
}
</style>
