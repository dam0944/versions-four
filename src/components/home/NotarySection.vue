<script setup>
import { enhancedMotionQuery } from '../../utils/performance.js';

import { onBeforeUnmount, onMounted, ref } from 'vue';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const contentRef = ref(null);
const photoRef = ref(null);
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
        ease: 'power3.out',
        scrollTrigger: {
          trigger: contentRef.value,
          start: 'top 82%',
          once: true,
        },
      },
    );

    gsap.fromTo(
      photoRef.value,
      {
        opacity: 0,
        y: 54,
        clipPath: 'polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)',
      },
      {
        opacity: 1,
        y: 0,
        clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
        duration: 1.4,
        ease: 'power3.inOut',
        scrollTrigger: {
          trigger: photoRef.value,
          start: 'top 82%',
          once: true,
        },
      },
    );
  });
});

onBeforeUnmount(() => {
  media?.revert();
  ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
});
</script>

<template>
  <section id="notary" class="notary-section">
    <div class="notary-container">
      <div ref="contentRef" class="notary-content">
        <div class="tag">
          <b>03</b>
          <span class="en">OUR NOTARY</span>
          <span class="km">សារការីរបស់យើង</span>
        </div>
        <h2>
          <span class="en">Khorn Sokheng</span>
          <span class="km">ខន សុខេង</span>
        </h2>

        <p class="notary-description">
          <span class="en">
            With experience across law, public policy, banking, business and information systems,
            Mr. Sokheng provides attentive support for personal and commercial documents.
          </span>
          <span class="km">
            ដោយមានបទពិសោធន៍លើវិស័យច្បាប់ គោលនយោបាយសាធារណៈ ធនាគារ អាជីវកម្ម និងប្រព័ន្ធព័ត៌មាន លោក
            សុខេង ផ្តល់ការគាំទ្រដោយយកចិត្តទុកដាក់លើឯកសារផ្ទាល់ខ្លួន និងពាណិជ្ជកម្ម។
          </span>
        </p>

        <ul class="notary-services">
          <li>
            <span class="en">Notarisation</span>
            <span class="km">ការធ្វើសារការី</span>
          </li>

          <li>
            <span class="en">Document Certification</span>
            <span class="km">ការបញ្ជាក់ឯកសារ</span>
          </li>

          <li>
            <span class="en">Corporate Documents</span>
            <span class="km">ឯកសារក្រុមហ៊ុន</span>
          </li>

          <li>
            <span class="en">International Documents</span>
            <span class="km">ឯកសារអន្តរជាតិ</span>
          </li>
        </ul>
      </div>

      <div ref="photoRef" class="notary-photo">
        <img
          decoding="async"
          src="/images/website-3.jpeg"
          alt="Portrait of the notary"
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

.tag {
  display: flex;
  align-items: center;
  gap: 18px;
  margin-bottom: 24px;
}

.tag b {
  color: #b8893a;
  font-family: var(--font-latin);
  font-size: 13px;
  font-weight: 800;
}

.tag .km {
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

.notary-role {
  margin: 0 0 12px;
  color: #8b6b34;
  font-size: 15px;
  line-height: 1.8;
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
  content: '';
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
  content: '';
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
