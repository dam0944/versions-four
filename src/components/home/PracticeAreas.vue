<script setup>
import { areas } from '../../data/practiceAreas.js';
import { enhancedMotionQuery } from '../../utils/performance.js';

import { onBeforeUnmount, onMounted, ref } from 'vue';
import { gsap } from 'gsap';
import { RouterLink } from 'vue-router';

const cardGrid = ref(null);
let media;

onMounted(() => {
  media = gsap.matchMedia();
  media.add(enhancedMotionQuery, () => {
    const cards = cardGrid.value.querySelectorAll('.practice__card');
    const cleanups = [];

    cards.forEach((card) => {
      const summary = card.querySelector('.practice__summary');
      const icon = card.querySelector('.practice__icon');
      const animateCard = (active) => {
        gsap.to(card, {
          y: active ? -7 : 0,
          backgroundColor: active ? '#ffffff' : '#14232c',
          color: active ? '#14243a' : '#ffffff',
          borderColor: active ? '#ffffff' : 'rgba(255, 255, 255, 0.16)',
          boxShadow: active ? '0 18px 38px rgba(0, 0, 0, 0.22)' : '0 0 0 rgba(0, 0, 0, 0)',
          duration: 0.42,
          ease: 'power3.out',
          overwrite: 'auto',
        });

        if (summary) {
          gsap.to(summary, {
            color: active ? '#6c706f' : '#c1c9cf',
            duration: 0.35,
            ease: 'power2.out',
            overwrite: 'auto',
          });
        }

        if (icon) {
          gsap.to(icon, {
            y: active ? -3 : 0,
            rotate: active ? 6 : 0,
            scale: active ? 1.06 : 1,
            duration: 0.42,
            ease: 'back.out(1.5)',
            overwrite: 'auto',
          });
        }
      };
      const enter = () => animateCard(true);
      const leave = () => {
        if (card.matches(':hover') || card.contains(document.activeElement)) return;
        animateCard(false);
      };

      card.addEventListener('pointerenter', enter);
      card.addEventListener('pointerleave', leave);
      card.addEventListener('focus', enter);
      card.addEventListener('blur', leave);
      cleanups.push(() => {
        card.removeEventListener('pointerenter', enter);
        card.removeEventListener('pointerleave', leave);
        card.removeEventListener('focus', enter);
        card.removeEventListener('blur', leave);
        gsap.killTweensOf(card);
        if (summary) gsap.killTweensOf(summary);
        if (icon) gsap.killTweensOf(icon);
      });
    });

    return () => cleanups.forEach((cleanup) => cleanup());
  });
});

onBeforeUnmount(() => media?.revert());

// Change these links to your service detail routes when available.
</script>

<template>
  <section id="practice-areas" class="practice">
    <div class="practice__container">
      <header class="practice__header">
        <div class="practice__intro">
          <div class="practice__label">
            <span class="practice__number">04</span>
            <span>PRACTICE AREAS</span>
          </div>

          <h2>វិស័យជំនាញរបស់យើង</h2>

          <p class="practice__description">
            យើងផ្តល់សេវាប្រឹក្សា និងជំនួយផ្នែកច្បាប់ ដើម្បីបំពេញតម្រូវការរបស់បុគ្គល និងអាជីវកម្ម។
          </p>
        </div>

        <RouterLink to="/contact" class="practice__contact">
          ទាក់ទងយើង
          <span aria-hidden="true">↗</span>
        </RouterLink>
      </header>

      <div ref="cardGrid" class="practice__grid">
        <RouterLink v-for="area in areas" :key="area.id" :to="area.link" class="practice__card">
          <div class="practice__card-top">
            <span class="practice__index">{{ area.id }}</span>

            <svg
              class="practice__icon"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="1.3"
              stroke-linecap="round"
              stroke-linejoin="round"
              aria-hidden="true"
            >
              <path v-for="(path, index) in area.paths" :key="index" :d="path" />
            </svg>
          </div>

          <h3>{{ area.title }}</h3>
          <p class="practice__english">{{ area.english }}</p>
          <p class="practice__summary">{{ area.description }}</p>
        </RouterLink>
      </div>
    </div>
  </section>
</template>

<style scoped>
.practice {
  --cream: #101d25;
  --navy: #f6f7f8;
  --gold: #b8a276;
  --muted: #c1c9cf;
  --border: rgba(255, 255, 255, 0.16);

  padding: 100px 0;
  background: var(--cream);
  color: var(--navy);
  font-family: inherit;
}

.practice,
.practice * {
  box-sizing: border-box;
}

.practice__container {
  width: min(1520px, 100%);
  margin-inline: auto;
}

.practice__header {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 32px;
  margin-bottom: 48px;
}

.practice__intro {
  max-width: 680px;
}

.practice__label {
  display: flex;
  align-items: center;
  gap: 14px;
  margin-bottom: 20px;
  color: var(--gold);
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 2px;
}

.practice__number {
  display: grid;
  place-items: center;
  width: 38px;
  height: 38px;
  border: 1px solid var(--gold);
  font-size: 13px;
  letter-spacing: 0;
}

.practice h2 {
  margin: 0 0 18px;
  font-family: inherit;
  font-size: clamp(28px, 3vw, 42px);
  font-weight: 600;
  line-height: 1.65;
}

.practice__description {
  margin: 0;
  color: var(--muted);
  font-size: 16px;
  line-height: 1.95;
}

.practice__contact {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 24px;
  flex-shrink: 0;
  min-height: 50px;
  padding: 12px 22px;
  border: 1px solid var(--gold);
  color: var(--navy);
  font-size: 14px;
  text-decoration: none;
  transition:
    background 180ms ease,
    color 180ms ease;
}

.practice__contact:hover {
  background: #fff;
  color: #14243a;
}

.practice__contact span {
  color: var(--gold);
  font-size: 22px;
}

.practice__grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 22px;
}

.practice__card {
  display: flex;
  flex-direction: column;
  min-width: 0;
  padding: 32px;
  border: 1px solid var(--border);
  background: #14232c;
  color: inherit;
  text-decoration: none;
  will-change: transform, background-color;
}

.practice__card-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 30px;
}

.practice__index {
  color: var(--gold);
  font-size: 13px;
  letter-spacing: 1px;
}

.practice__icon {
  width: 42px;
  height: 42px;
  color: var(--gold);
}

.practice h3 {
  margin: 0 0 6px;
  font-family: inherit;
  font-size: 22px;
  font-weight: 600;
  line-height: 1.7;
}

.practice__english {
  margin: 0 0 20px;
  color: var(--gold);
  font-size: 12px;
  letter-spacing: 0.8px;
  line-height: 1.5;
}

.practice__summary {
  margin: 0;
  color: var(--muted);
  font-size: 15px;
  line-height: 1.95;
}

.practice__card:focus-visible,
.practice__contact:focus-visible {
  outline: 3px solid var(--gold);
  outline-offset: 5px;
}

@media (max-width: 1024px) {
  .practice {
    padding: 72px 0;
  }

  .practice__container {
    width: 100%;
  }

  .practice__grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .practice__card {
    padding: 26px;
  }
}

@media (max-width: 640px) {
  .practice {
    padding: 56px 0;
  }

  .practice__container {
    width: calc(100% - 32px);
  }

  .practice__header {
    align-items: flex-start;
    flex-direction: column;
    gap: 24px;
    margin-bottom: 30px;
  }

  .practice__grid {
    grid-template-columns: 1fr;
    gap: 16px;
  }

  .practice h3 {
    font-size: 20px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .practice * {
    transition: none;
  }
}
</style>
