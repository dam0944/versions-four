<script setup>
import { testimonials } from "../../data/testimonials.js";
import client1 from "../../assets/picture/testimonial/client-1.png";
import client2 from "../../assets/picture/testimonial/client-2.png";
import client3 from "../../assets/picture/testimonial/client-3.png";
import client4 from "../../assets/picture/testimonial/client-4.png";
import client5 from "../../assets/picture/testimonial/client-6.png";
import { ref, onMounted, onBeforeUnmount } from "vue";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { enhancedMotionQuery } from "../../utils/performance.js";
import { useI18n } from "vue-i18n";

gsap.registerPlugin(ScrollTrigger);
const sectionRef = ref(null);
const viewportRef = ref(null);
const trackRef = ref(null);
const { t } = useI18n();
const testimonialImages = [client1, client2, client3, client4, client5];
let media;
let resizeObserver;
let refreshFrame;
let disposed = false;

const refreshScrollTrigger = () => {
  if (disposed) return;
  cancelAnimationFrame(refreshFrame);
  refreshFrame = requestAnimationFrame(() => {
    if (!disposed) ScrollTrigger.refresh();
  });
};

onMounted(() => {
  media = gsap.matchMedia();
  media.add(enhancedMotionQuery, () => {
    const track = trackRef.value;
    const viewport = viewportRef.value;
    const distance = () => Math.max(0, track.scrollWidth - viewport.clientWidth);
    viewport.scrollLeft = 0;
    gsap.to(track, {
      x: () => -distance(),
      ease: "none",
      scrollTrigger: {
        trigger: sectionRef.value,
        start: "top top",
        end: () => "+=" + (distance() + window.innerHeight * 0.8),
        scrub: 0.45,
        anticipatePin: 1,
        pin: true,
        invalidateOnRefresh: true,
      },
    });

    if ("ResizeObserver" in window) {
      resizeObserver = new ResizeObserver(refreshScrollTrigger);
      resizeObserver.observe(viewport);
      resizeObserver.observe(track);
    }
    refreshScrollTrigger();
    document.fonts?.ready.then(refreshScrollTrigger);

    return () => resizeObserver?.disconnect();
  });
});
onBeforeUnmount(() => {
  disposed = true;
  cancelAnimationFrame(refreshFrame);
  resizeObserver?.disconnect();
  media?.revert();
});
</script>
<template>
  <section id="results" ref="sectionRef" class="testimonials-section">
    <div class="testimonials-container">
      <header class="testimonials-heading">
        <div
          class="tag-title-group"
          style="display: flex; align-items: baseline; gap: 12px"
        >
          <span class="tag" style="color: #c5a059; font-weight: bold">{{
            t("testimonials.index")
          }}</span>
          <p class="eyebrow" style="margin: 0">{{ t("testimonials.label") }}</p>
        </div>
        <h2>{{ t("testimonials.title") }}</h2>
        <p class="heading-description">{{ t("testimonials.description") }}</p>
      </header>
      <div class="testimonials-slider">
        <div
          ref="viewportRef"
          class="testimonials-viewport"
          tabindex="0"
          role="region"
          :aria-label="t('testimonials.regionLabel')"
        >
          <div ref="trackRef" class="testimonials-grid">
            <figure
              v-for="index in [0, 1, 2, 3, 4]"
              :key="index"
              class="testimonial-card"
            >
              <svg
                class="quote-icon"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  d="M4 4h7v7c0 5-2.5 8-7 9v-3c2.5-.8 3.7-2.7 4-5H4V4Zm10 0h7v7c0 5-2.5 8-7 9v-3c2.5-.8 3.7-2.7 4-5h-4V4Z"
                />
              </svg>
              <blockquote>{{ t(`testimonials.items.${index}.quote`) }}</blockquote>
              <figcaption class="client-details">
                <img
                  decoding="async"
                  class="client-avatar"
                  :src="testimonialImages[index]"
                  :alt="t(`testimonials.items.${index}.name`)"
                  loading="lazy"
                />
                <div>
                  <p class="client-name">{{ t(`testimonials.items.${index}.name`) }}</p>
                  <p class="client-label">{{ t("testimonials.clientLabel") }}</p>
                </div>
              </figcaption>
            </figure>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.testimonials-section {
  padding: 109px 0 80px;
  background: #fff;
}

.testimonials-container {
  width: 100%;
  max-width: var(--content-max-width);
  margin-inline: auto;
  display: grid;
  grid-template-columns: 1fr 4.2fr;
  column-gap: 24px;
  padding-inline: 24px;
}

.testimonials-heading {
  grid-column: 1 / -1;
  display: grid;
  grid-template-columns: subgrid;
  margin: 0 0 48px;
  text-align: left;
}

.eyebrow {
  grid-column: 1;
  grid-row: 1 / 3;
  align-self: start;
  margin: 0;
  padding-top: 9px;
  color: #3d4a63;
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.14em;
}

:global(body:has(#l-km:checked) .testimonials-heading .eyebrow) {
  font-family: var(--font-khmer-brand);
  font-weight: 400;
  letter-spacing: 0.04em;
  font-size: 11px;
}

.testimonials-heading h2 {
  grid-column: 2;
  margin: 0 0 0.3em;
  color: #16233a;
  font-size: clamp(2.6rem, 5vw, 5rem);
  font-weight: 500;
  line-height: 1.1;
}

.heading-description {
  grid-column: 2;
  max-width: 38em;
  margin: 0;
  color: #5f6a7d;
  font-size: 16.5px;
  line-height: 1.85;
}

.testimonials-slider {
  grid-column: 1 / -1;
  width: 100vw;
  margin-left: calc(50% - 50vw);
  min-width: 0;
}

.testimonials-viewport {
  overflow: hidden;
  padding: 12px 0 18px;
}

.testimonials-grid {
  position: relative;
  display: flex;
  gap: 24px;
  width: max-content;
  padding-inline: 24px;
}

.slider-toggle {
  margin-top: 20px;
  padding: 10px 18px;
  border: 1px solid var(--color-accent);
  background: #fff;
  color: var(--color-primary);
  font: inherit;
  cursor: pointer;
}

.slider-toggle:focus-visible,
.testimonials-viewport:focus-visible {
  outline: 2px solid var(--color-accent);
  outline-offset: 3px;
}

.testimonial-card {
  box-sizing: border-box;
  flex: 0 0 min(480px, calc(100vw - 88px));
  display: flex;
  flex-direction: column;
  min-width: 0;
  margin: 0;
  padding: 32px;
  border: 1px solid #e4e7eb;
  background: #faf9f6;
}

.quote-icon {
  width: 32px;
  height: 32px;
  margin-bottom: 24px;
  color: var(--color-accent);
}

.testimonial-card blockquote {
  margin: 0 0 32px;
  color: #344154;
  font-size: 17px;
  line-height: 1.9;
}

.client-details {
  display: flex;
  align-items: center;
  gap: 14px;
  margin-top: auto;
  padding-top: 24px;
  border-top: 1px solid #e4e2dc;
}

.client-avatar {
  flex-shrink: 0;
  width: 52px;
  height: 52px;
  object-fit: cover;
  border: 1px solid var(--color-accent);
  border-radius: 50%;
}

.client-name {
  margin: 0;
  color: var(--color-primary);
  font-size: 16px;
  font-weight: 500;
  line-height: 1.7;
}

.client-label {
  margin: 3px 0 0;
  color: #647080;
  font-size: 13px;
  line-height: 1.6;
}

@media (max-width: 900px) {
  .testimonials-section {
    padding: 64px 20px;
  }

  .testimonials-container,
  .testimonials-heading {
    grid-template-columns: 1fr;
  }

  .testimonials-heading .eyebrow,
  .testimonials-heading h2,
  .heading-description,
  .testimonials-slider {
    grid-column: 1;
    grid-row: auto;
  }

  .testimonials-heading .eyebrow {
    margin-bottom: 20px;
  }

  .testimonial-card {
    flex-basis: calc((100% - 24px) / 2);
  }
}

@media (max-width: 600px) {
  .testimonials-section {
    padding: 48px 20px;
  }

  .testimonials-heading {
    margin-bottom: 32px;
  }

  .testimonial-card {
    flex-basis: 100%;
    padding: 28px 24px;
  }

  .testimonial-card blockquote {
    font-size: 16px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .testimonials-slider {
    width: 100%;
    margin-left: 0;
  }

  .testimonials-viewport {
    overflow-x: auto;
    scroll-snap-type: x mandatory;
  }

  .testimonial-card {
    scroll-snap-align: start;
  }

  .testimonial-clone,
  .slider-toggle {
    display: none;
  }
}

/* Stable card widths keep scroll distance measurable on small screens. */
.testimonials-slider {
  width: 100vw;
  margin-left: calc(50% - 50vw);
}
.testimonials-viewport {
  overflow-x: auto;
  scroll-snap-type: x proximity;
  scrollbar-width: thin;
}
.testimonials-viewport::-webkit-scrollbar {
  display: block;
  height: 6px;
}
.testimonials-grid {
  width: max-content;
  padding-inline: 24px;
}
.testimonial-card {
  flex: 0 0 min(480px, calc(100vw - 88px));
  scroll-snap-align: start;
}

@media (prefers-reduced-motion: no-preference) {
  .testimonials-viewport {
    overflow: hidden;
    scroll-snap-type: none;
  }
}
</style>
