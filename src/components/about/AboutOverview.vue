<script setup>
import { enhancedMotionQuery } from '../../utils/performance.js';

import { inject, onBeforeUnmount, onMounted, ref } from 'vue';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const aboutOverview = ref(null);
const disablePageAnimations = inject('disablePageAnimations', false);
let media;

onMounted(() => {
  if (disablePageAnimations) return;
  media = gsap.matchMedia();
  media.add(enhancedMotionQuery, () => {
    const images = aboutOverview.value.querySelectorAll('.photo-card img, .featured-card > img');

    images.forEach((image, index) => {
      gsap.fromTo(
        image,
        { clipPath: 'polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)' },
        {
          clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
          duration: 1.2,
          delay: index * 0.12,
          ease: 'power3.inOut',
          clearProps: 'clipPath',
          scrollTrigger: {
            trigger: image,
            start: 'top 85%',
            once: true,
          },
        },
      );
    });
  });
});

onBeforeUnmount(() => media?.revert());

defineProps({
  firmName: {
    type: String,
    default: 'Dharmasastra',
  },
  // Replace this sample statistic with your verified figure.
  clientCount: {
    type: String,
    default: '5000+',
  },
  images: {
    type: Object,
    default: () => ({
      lawyer: '/images/team-3.png',
      gavel: '/images/website-2.jpeg',
      consultation: '/images/team-4.png',
    }),
  },
});
</script>

<template>
  <section ref="aboutOverview" class="about-overview">
    <div class="about-overview__container">
      <header class="section-heading">
        <h2>
          <span class="en">
            Your Trusted <em>Advocates</em> in<br />
            the Legal Landscape
          </span>
          <span class="km">
            ដៃគូផ្នែកច្បាប់ដែលអ្នក<em>ទុកចិត្ត</em><br />
            ក្នុងវិស័យច្បាប់
          </span>
        </h2>

        <p>
          <span class="en">
            At {{ firmName }}, we are more than just legal advisors—we are your partners in
            navigating the complexities of the law. Our firm is built on a foundation.
          </span>
          <span class="km">
            នៅ {{ firmName }} យើងមិនត្រឹមតែជាទីប្រឹក្សាផ្នែកច្បាប់ប៉ុណ្ណោះទេ
            ប៉ុន្តែជាដៃគូរបស់អ្នកក្នុងការស្វែងយល់ពីភាពស្មុគស្មាញនៃច្បាប់។
            ការិយាល័យរបស់យើងត្រូវបានកសាងឡើងលើមូលដ្ឋានដ៏រឹងមាំ។
          </span>
        </p>
      </header>

      <div class="about-grid">
        <!-- Left column -->
        <div class="about-column">
          <div class="photo-card">
            <img
              decoding="async"
              :src="images.lawyer"
              alt="Portrait of a member of the legal team"
              loading="lazy"
              width="640"
              height="550"
            />
          </div>

          <article class="info-card info-card--gold">
            <svg class="decoration" viewBox="0 0 64 64" fill="none" aria-hidden="true">
              <g
                stroke="currentColor"
                stroke-width="7"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="M25 13l20 20M19 19l20 20M24 14l-6 6M46 32l-6 6" />
                <path d="M30 30L12 48M35 52h22M39 46h14" />
              </g>
            </svg>

            <h3>
              <span class="en">Successful Case</span>
              <span class="km">សំណុំរឿងជោគជ័យ</span>
            </h3>

            <p>
              <span class="en">
                We understand that legal challenges can be daunting, which is why we prioritize
                clear communication.
              </span>
              <span class="km">
                យើងយល់ថាបញ្ហាផ្លូវច្បាប់អាចបង្កការព្រួយបារម្ភ
                ដូច្នេះហើយយើងផ្តល់អាទិភាពដល់ការទំនាក់ទំនងប្រកបដោយភាពច្បាស់លាស់។
              </span>
            </p>
          </article>
        </div>

        <!-- Center column -->
        <article class="featured-card">
          <img
            decoding="async"
            :src="images.gavel"
            alt="Scales of justice and a judge's gavel"
            loading="lazy"
            width="640"
            height="900"
          />

          <div class="featured-card__overlay"></div>

          <div class="featured-card__stat">
            <strong>{{ clientCount }}</strong>
            <span class="en">Trusted Clients</span>
            <span class="km">អតិថិជនដែលទុកចិត្តយើង</span>
          </div>

          <div class="featured-card__content">
            <h3>
              <span class="en">Successful Case</span>
              <span class="km">សំណុំរឿងជោគជ័យ</span>
            </h3>
            <p>
              <span class="en">
                Our attorneys bring extensive experience and specialized knowledge in various areas
                of law.
              </span>
              <span class="km">
                មេធាវីរបស់យើងមានបទពិសោធន៍ទូលំទូលាយ និងចំណេះដឹងឯកទេស ក្នុងវិស័យច្បាប់ជាច្រើន។
              </span>
            </p>
          </div>
        </article>

        <!-- Right column -->
        <div class="about-column about-column--right">
          <article class="info-card info-card--slate">
            <svg class="decoration" viewBox="0 0 64 64" fill="currentColor" aria-hidden="true">
              <path d="M32 4a13 13 0 0 0-13 13v5a13 13 0 0 0 26 0v-5A13 13 0 0 0 32 4Z" />
              <path d="M22 37 9 44a10 10 0 0 0-5 9v7h56v-7a10 10 0 0 0-5-9l-13-7-10 10-10-10Z" />
            </svg>

            <h3>
              <span class="en">Best Attorneys</span>
              <span class="km">មេធាវីជំនាញ</span>
            </h3>

            <p>
              <span class="en">
                Our team of dedicated attorneys brings a strategic and personalized approach to
                every case.
              </span>
              <span class="km">
                ក្រុមមេធាវីដែលប្តេជ្ញាចិត្តរបស់យើង
                ប្រើប្រាស់យុទ្ធសាស្ត្រសមស្របតាមតម្រូវការនៃសំណុំរឿងនីមួយៗ។
              </span>
            </p>
          </article>

          <div class="photo-card">
            <img
              decoding="async"
              :src="images.consultation"
              alt="Portrait of an attorney"
              loading="lazy"
              width="640"
              height="550"
            />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.about-overview {
  --ink: #17242d;
  --muted: #707781;
  --gold: #b1a276;
  --slate: #606970;

  padding: 80px 0;
  background: #fff;
  color: var(--ink);
  font-family: inherit;
}

.about-overview,
.about-overview * {
  box-sizing: border-box;
}

.about-overview__container {
  width: min(1520px, calc(100% - 64px));
  margin-inline: auto;
}

.section-heading {
  max-width: 660px;
  margin: 0 auto 44px;
  text-align: center;
}

.section-heading h2 {
  margin: 0 0 16px;
  font-family: var(--font-quote);
  font-size: clamp(28px, 3vw, 40px);
  font-weight: 600;
  line-height: 1.25;
  letter-spacing: -0.6px;
}

.section-heading em {
  color: var(--gold);
  font-weight: 500;
}

.section-heading p {
  max-width: 540px;
  margin: 0 auto;
  color: var(--muted);
  font-size: 14px;
  line-height: 1.65;
}

.about-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 24px;
  max-width: 1100px;
  margin-inline: auto;
}

.about-column {
  display: grid;
  grid-template-rows: minmax(0, 1.8fr) minmax(165px, 1fr);
  gap: 24px;
}

.about-column--right {
  grid-template-rows: minmax(165px, 1fr) minmax(0, 1.8fr);
}

.photo-card,
.info-card,
.featured-card {
  position: relative;
  overflow: hidden;
  border-radius: 6px;
}

.photo-card img,
.featured-card > img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.photo-card {
  min-height: 0;
}

.info-card {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 28px;
  padding: 20px 18px;
  color: #fff;
}

.info-card--gold {
  background: var(--gold);
}

.info-card--slate {
  background: var(--slate);
}

.info-card h3 {
  position: relative;
  z-index: 1;
  margin: 0;
  font-family: var(--font-quote);
  font-size: clamp(23px, 2.2vw, 30px);
  font-weight: 500;
  line-height: 1.15;
}

.info-card p {
  position: relative;
  z-index: 1;
  margin: 0;
  font-size: 13px;
  line-height: 1.55;
}

.decoration {
  position: absolute;
  top: -4px;
  right: -4px;
  width: 78px;
  height: 78px;
  color: #fff;
  opacity: 0.12;
  pointer-events: none;
}

.featured-card {
  min-height: 490px;
  isolation: isolate;
  color: #fff;
  background: var(--ink);
}

.featured-card > img {
  position: absolute;
  inset: 0;
  z-index: -2;
}

.featured-card__overlay {
  position: absolute;
  inset: 0;
  z-index: -1;
  background: linear-gradient(
    180deg,
    rgb(10 17 20 / 62%) 0%,
    rgb(10 17 20 / 24%) 42%,
    rgb(10 17 20 / 88%) 100%
  );
}

.featured-card__stat {
  position: absolute;
  top: 20px;
  left: 24px;
  right: 24px;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.featured-card__stat strong {
  font-size: 38px;
  font-weight: 600;
  line-height: 1.1;
  letter-spacing: -1px;
}

.featured-card__stat span {
  font-size: 13px;
  line-height: 1.5;
}

.featured-card__content {
  position: absolute;
  right: 24px;
  bottom: 20px;
  left: 24px;
}

.featured-card__content h3 {
  margin: 0 0 10px;
  font-family: var(--font-quote);
  font-size: 22px;
  font-weight: 600;
  line-height: 1.3;
}

.featured-card__content p {
  margin: 0;
  font-size: 13px;
  line-height: 1.6;
}

@media (max-width: 900px) {
  .about-overview {
    padding: 64px 0;
  }

  .about-overview__container {
    width: calc(100% - 40px);
  }

  .about-grid,
  .about-column {
    gap: 16px;
  }

  .info-card {
    padding: 18px 14px;
  }

  .info-card h3 {
    font-size: 23px;
  }

  .featured-card {
    min-height: 460px;
  }

  .featured-card__stat {
    left: 18px;
    right: 18px;
  }

  .featured-card__content {
    left: 18px;
    right: 18px;
  }
}

@media (max-width: 680px) {
  .about-overview {
    padding: 48px 0;
  }

  .about-overview__container {
    width: calc(100% - 32px);
  }

  .section-heading {
    margin-bottom: 30px;
  }

  .section-heading h2 {
    font-size: 30px;
  }

  .about-grid {
    grid-template-columns: 1fr;
    max-width: 440px;
    gap: 20px;
  }

  .about-column,
  .about-column--right {
    grid-template-rows: auto;
    gap: 20px;
  }

  .photo-card {
    aspect-ratio: 4 / 3;
  }

  .info-card {
    min-height: 180px;
    padding: 24px;
  }

  .info-card h3 {
    font-size: 28px;
  }

  .featured-card {
    min-height: 480px;
  }

  .featured-card__stat {
    top: 24px;
    left: 24px;
  }

  .featured-card__content {
    right: 24px;
    bottom: 24px;
    left: 24px;
  }
}
</style>
