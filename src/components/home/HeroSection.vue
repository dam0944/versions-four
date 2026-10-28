<script setup>
import { enhancedMotionQuery } from "../../utils/performance.js";

import { ref, onMounted, onBeforeUnmount } from "vue";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useI18n } from "vue-i18n";

gsap.registerPlugin(ScrollTrigger);

const hero = ref(null);
const background = ref(null);
const { t } = useI18n();

let media;
const buttonCleanups = [];

onMounted(() => {
  media = gsap.matchMedia();

  media.add(
    enhancedMotionQuery,
    () => {
      gsap.fromTo(
        background.value,
        { scale: 1.08 },
        {
          scale: 1,
          duration: 1.5,
          ease: "power2.out",
        }
      );

      gsap.fromTo(
        background.value,
        { clipPath: "polygon(0% 0%, 0% 0%, -25% 100%, 0% 100%)" },
        {
          clipPath: "polygon(0% 0%, 125% 0%, 100% 100%, 0% 100%)",
          duration: 1.35,
          ease: "power3.inOut",
          scrollTrigger: {
            trigger: hero.value,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );

      gsap.from(hero.value.querySelectorAll(".eyebrow, h1, .sub"), {
        y: 24,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power2.out",
        clearProps: "transform,opacity",
      });

      const buttons = hero.value.querySelectorAll(".btns > a");
      gsap.from(buttons, {
        y: 18,
        scale: 0.96,
        opacity: 0,
        duration: 0.65,
        delay: 0.25,
        stagger: 0.14,
        ease: "back.out(1.4)",
        clearProps: "transform,opacity",
      });

      buttons.forEach((button) => {
        const arrow = button.querySelector('[aria-hidden="true"]');
        const animateIn = () => {
          gsap.to(button, {
            y: -3,
            scale: 1.025,
            duration: 0.2,
            ease: "power2.out",
            overwrite: "auto",
          });
          if (arrow) {
            gsap.to(arrow, {
              x: 4,
              y: button.classList.contains("more") ? 2 : 0,
              duration: 0.2,
              ease: "power2.out",
              overwrite: "auto",
            });
          }
        };
        const animateOut = () => {
          gsap.to(button, {
            y: 0,
            scale: 1,
            duration: 0.25,
            ease: "power2.out",
            overwrite: "auto",
          });
          if (arrow) {
            gsap.to(arrow, {
              x: 0,
              y: 0,
              duration: 0.25,
              ease: "power2.out",
              overwrite: "auto",
            });
          }
        };

        button.addEventListener("pointerenter", animateIn);
        button.addEventListener("pointerleave", animateOut);
        button.addEventListener("focus", animateIn);
        button.addEventListener("blur", animateOut);
        buttonCleanups.push(() => {
          button.removeEventListener("pointerenter", animateIn);
          button.removeEventListener("pointerleave", animateOut);
          button.removeEventListener("focus", animateIn);
          button.removeEventListener("blur", animateOut);
          gsap.killTweensOf(button);
          if (arrow) gsap.killTweensOf(arrow);
        });
      });

      gsap.to(background.value, {
        yPercent: 8,
        ease: "none",
        scrollTrigger: {
          trigger: hero.value,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    },
    hero.value
  );
});

onBeforeUnmount(() => {
  buttonCleanups.forEach((cleanup) => cleanup());
  buttonCleanups.length = 0;
  media?.revert();
});
</script>

<template>
  <section id="home" ref="hero" class="hero">
    <div ref="background" class="hero-background" aria-hidden="true"></div>
    <div class="hero-layout">
      <div class="hero-content">
        <p class="eyebrow">{{ t("hero.location") }}</p>
        <h1>{{ t("hero.title") }}</h1>
        <p class="sub">{{ t("hero.subtitle") }}</p>
        <div class="btns">
          <a class="go" href="#contact">
            {{ t("hero.appointment") }}
            <span aria-hidden="true">→</span>
          </a>
          <a class="more" href="#services">
            {{ t("hero.services") }}
            <span aria-hidden="true">↓</span>
          </a>
        </div>
      </div>
    </div>
    <!-- <div class="side">
      <small>01</small>
      {{ t("hero.promise") }}
    </div> -->
  </section>
</template>

<style scoped>
.hero {
  position: relative;
  isolation: isolate;
  overflow: hidden;
  display: flex;
  align-items: center;
  min-height: max(740px, 100svh);
  box-sizing: border-box;
  padding: 150px 32px 130px;
  background: #101820;
}

.hero-background {
  position: absolute;
  inset: 0;
  z-index: -2;
  pointer-events: none;
  background-image: var(--hero-img);
  background-size: cover;
  background-position: center 44%;
  background-repeat: no-repeat;
  will-change: transform, clip-path;
}

.hero::after {
  content: none;
}

.hero::before {
  position: absolute;
  inset: 0;
  z-index: -1;
  background: linear-gradient(
      90deg,
      rgba(8, 17, 27, 0.82) 0%,
      rgba(8, 17, 27, 0.68) 48%,
      rgba(8, 17, 27, 0.32) 100%
    ),
    linear-gradient(0deg, rgba(8, 17, 27, 0.48), transparent 46%);
  content: "";
  pointer-events: none;
}

.hero-layout {
  display: block;
  width: 100%;
  max-width: 1520px;
  margin-inline: auto;
}

.hero-content {
  min-width: 0;
  max-width: 820px;
}

.hero .eyebrow {
  margin: 0 0 24px;
  color: #d9e8f6;
  font-size: 14px;
  font-weight: 500;
  line-height: 1.8;
}

.hero h1 {
  margin: 0;
  color: #fff;
  font-family: var(--font-heading);
  font-size: clamp(40px, 5.1vw, 76px);
  font-weight: 500;
  line-height: 1.13;
  max-width: 900px;
}

.hero h1 em {
  display: block;
  margin-top: 8px;
  color: #d9e8f6;
  font-style: normal;
}

.hero .sub {
  max-width: 650px;
  margin: 24px 0 0;
  color: #e2e7ec;
  font-size: 16px;
  line-height: 1.8;
}

.hero .btns {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 18px;
  margin-top: 30px;
}

.hero .go {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  padding: 12px 22px;
  border: 1px solid var(--color-button);
  border-radius: 999px;
  background: var(--color-button);
  color: var(--color-button-text);
  font-weight: 500;
  line-height: 1.7;
  text-decoration: none;
}

.hero .go:hover {
  background: #fff;
}

.hero .more {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  padding: 10px 20px;
  border: 1px solid rgba(255, 255, 255, 0.66);
  border-bottom: 1px solid rgba(255, 255, 255, 0.66);
  border-radius: 999px;
  color: #fff;
  font-size: 14px;
  line-height: 1.8;
  text-decoration: none;
}

.hero .more:hover {
  color: var(--color-button);
}

.hero .go:focus-visible,
.hero .more:focus-visible {
  outline: 2px solid #fff;
  outline-offset: 5px;
}

.hero .go [aria-hidden="true"],
.hero .more [aria-hidden="true"] {
  display: inline-block;
}

.hero .side {
  position: absolute;
  bottom: 36px;
  left: auto;
  right: max(32px, calc((100% - 1520px) / 2));
  display: flex;
  align-items: center;
  justify-content: flex-end;
  width: min(420px, calc(100% - 64px));
  gap: 16px;
  color: #e2e7ec;
  font-size: 12px;
  line-height: 1.8;
  text-align: right;
}

.side small {
  color: var(--color-button);
  font-size: 12px;
}

@media (max-width: 900px) {
  .hero {
    min-height: max(700px, 100svh);
    padding: 140px 24px 120px;
  }

  .hero-content {
    max-width: 720px;
  }

  .hero-background {
    background-position: 68% center;
  }

  .hero .side {
    right: 24px;
    width: calc(100% - 48px);
  }
}

@media (max-width: 600px) {
  .hero {
    min-height: max(680px, 100svh);
    padding: 128px 20px 120px;
  }

  .hero h1 {
    font-size: clamp(36px, 10vw, 52px);
  }

  .eyebrow {
    font-size: 12px;
  }

  .sub {
    font-size: 16px;
  }

  .btns {
    gap: 12px;
  }

  .hero .side {
    right: 20px;
    width: calc(100% - 40px);
    font-size: 11px;
  }

  .hero .go,
  .hero .more {
    min-height: 44px;
  }
}
</style>
