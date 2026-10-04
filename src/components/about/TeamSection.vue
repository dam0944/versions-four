<script setup>
import { socialLinks, members } from '../../data/team.js';
import { enhancedMotionQuery } from '../../utils/performance.js';

import { inject, onMounted, onBeforeUnmount, ref } from 'vue';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const teamSection = ref(null);
const disablePageAnimations = inject('disablePageAnimations', false);
let media;

onMounted(() => {
  if (disablePageAnimations) return;
  media = gsap.matchMedia();
  media.add(enhancedMotionQuery, () => {
    const photos = teamSection.value.querySelectorAll('.team-photo img');
    photos.forEach((photo, index) => {
      gsap.fromTo(
        photo,
        { clipPath: 'polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)' },
        {
          clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
          duration: 1.2,
          delay: index * 0.12,
          ease: 'power3.inOut',
          clearProps: 'clipPath',
          scrollTrigger: {
            trigger: photo,
            start: 'top 85%',
            once: true,
          },
        },
      );
    });
  });
});

onBeforeUnmount(() => media?.revert());
</script>

<template>
  <section ref="teamSection" class="team-section">
    <div class="team-container">
      <header class="team-heading">
        <p class="team-eyebrow">
          <span class="en">Meet our team</span>
          <span class="km">ជួបជាមួយក្រុមការងាររបស់យើង</span>
        </p>

        <h2>
          <span class="en"> Working together to protect your interests. </span>
          <span class="km"> រួមគ្នាដើម្បីការពារផលប្រយោជន៍របស់លោកអ្នក។ </span>
        </h2>
      </header>

      <div class="team-grid">
        <article v-for="member in members" :key="member.name" class="team-card">
          <div class="team-photo">
            <img decoding="async" :src="member.image" :alt="member.name" loading="lazy" />

            <div v-if="member.socials.length" class="team-socials">
              <a
                v-for="social in member.socials"
                :key="social.platform"
                :href="social.url"
                target="_blank"
                rel="noopener noreferrer"
                :aria-label="`${member.name} on ${social.platform}`"
              >
                <svg
                  class="social-icon"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                  focusable="false"
                >
                  <path :d="social.path" />
                </svg>
              </a>
            </div>
          </div>

          <div class="team-details">
            <h3>{{ member.name }}</h3>
            <p>
              <span class="en">Lawyer</span>
              <span class="km">មេធាវី</span>
            </p>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<style scoped>
.team-section {
  padding: 80px 32px;
  background: #fff;
}

.team-container {
  max-width: 1520px;
  margin-inline: auto;
}
.social-icon {
  display: block;
  width: 16px;
  height: 16px;
}
.team-heading {
  margin-bottom: 48px;
  padding: 8px 0 8px 24px;
  border-left: 4px solid var(--color-accent-light);
}

.team-eyebrow {
  margin: 0 0 12px;
  color: #8b6b34;
  font-size: 14px;
  font-weight: 500;
  line-height: 1.6;
}

.team-heading h2 {
  margin: 0;
  color: var(--color-primary);
  font-size: clamp(26px, 3vw, 40px);
  font-weight: 500;
  line-height: 1.4;
}

.team-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 24px;
}

.team-card {
  min-width: 0;
}

.team-photo {
  position: relative;
  aspect-ratio: 1 / 1;
  background: #e9e9e9;
}

.team-photo img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center top;
  filter: grayscale(100%);
  transition: filter 250ms ease;
}

.team-card:hover img,
.team-card:focus-within img {
  filter: grayscale(0%);
}

.team-socials {
  position: absolute;
  top: -10px;
  right: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  padding: 12px 8px;
  background: var(--color-accent-light);
}

.team-socials a {
  display: grid;
  place-items: center;
  width: 28px;
  height: 28px;
  color: var(--color-primary);
  font-family: var(--font-system);
  font-size: 14px;
  font-weight: 700;
  text-decoration: none;
}

.team-socials a:hover {
  background: rgb(255 255 255 / 35%);
}

.team-socials a:focus-visible {
  outline: 2px solid var(--color-primary);
  outline-offset: 2px;
}

.team-details {
  padding: 22px 16px;
  background: #f3f3f3;
  text-align: center;
}

.team-details h3 {
  margin: 0;
  color: var(--color-primary);
  font-size: 20px;
  font-weight: 500;
  line-height: 1.4;
}

.team-details p {
  margin: 6px 0 0;
  color: #8b6b34;
  font-size: 12px;
  line-height: 1.6;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

@media (max-width: 900px) {
  .team-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 32px 24px;
  }
}

@media (max-width: 600px) {
  .team-section {
    padding: 48px 20px;
  }

  .team-heading {
    margin-bottom: 32px;
    padding-left: 18px;
  }
}

@media (max-width: 420px) {
  .team-grid {
    grid-template-columns: 1fr;
  }
}

@media (prefers-reduced-motion: reduce) {
  .team-photo img {
    transition: none;
  }
}
</style>
