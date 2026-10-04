import { enhancedMotionQuery } from '../utils/performance.js';
import { onMounted, onBeforeUnmount } from 'vue';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function useScrollAnimations(page) {
  let context;
  let media;
  let disposed = false;
  const refresh = () => {
    if (window.matchMedia(enhancedMotionQuery).matches) ScrollTrigger.refresh();
  };
  onMounted(() => {
    context = gsap.context(() => {
      media = gsap.matchMedia();
      media.add(enhancedMotionQuery, (motionContext) => {
        const reveal = (nodes, delay = 0) => {
          const targets = [...nodes].filter(Boolean);
          if (targets.length)
            gsap.from(targets, {
              y: 22,
              opacity: 0,
              duration: 0.65,
              stagger: 0.09,
              delay,
              ease: 'power2.out',
              clearProps: 'transform,opacity',
            });
        };
        // HeroSection owns its entrance and scrubbed background animations.
        const revealOnEntry = (trigger, nodes, delay = 0) => {
          if (!trigger || !nodes.filter(Boolean).length) return;
          ScrollTrigger.create({
            trigger,
            start: 'top 88%',
            once: true,
            onEnter: () => motionContext.add(() => reveal(nodes, delay)),
          });
        };
        page.value.querySelectorAll('section:not(.hero)').forEach((section) => {
          const heading = section.querySelector('h2');
          const label = section.querySelector('.eyebrow,.tag,.practice__label');
          revealOnEntry(label || heading, [label, heading]);
          // Each block enters independently, including cards far below the heading.
          // Content is never hidden until its trigger runs.
          section
            .querySelectorAll(
              '.item,.vals .col,.steps li,.faq details,.prepare-list li,.card2,.scales,.map,form,.firm .txt,.practice__description,.practice__grid,.testimonials-viewport,.map-info,.office-map',
            )
            .forEach((block) => revealOnEntry(block, [block]));
        });
      });
    }, page.value);
    // Capture non-bubbling details toggle events for FAQ height changes.
    page.value.addEventListener('toggle', refresh, true);
    window.addEventListener('load', refresh);
    document.fonts?.ready.then(() => {
      if (!disposed) refresh();
    });
  });
  onBeforeUnmount(() => {
    disposed = true;
    page.value?.removeEventListener('toggle', refresh, true);
    window.removeEventListener('load', refresh);
    media?.revert();
    context?.revert();
  });
  return { refresh };
}
