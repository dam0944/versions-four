import { onMounted, onBeforeUnmount } from 'vue';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { enhancedMotionQuery } from '../utils/performance.js';
import { motion } from '../config/motion.js';

gsap.registerPlugin(ScrollTrigger);

export function useImageReveals(page, selector = 'img') {
  let media;
  let root;
  let frame;
  const refresh = () => {
    cancelAnimationFrame(frame);
    frame = requestAnimationFrame(() => ScrollTrigger.refresh());
  };

  onMounted(() => {
    root = page.value;
    if (!root) return;
    media = gsap.matchMedia();
    media.add(
      enhancedMotionQuery,
      () => {
        const cleanups = [];
        root.querySelectorAll(selector).forEach((image) => {
          const tween = gsap.fromTo(
            image,
            { clipPath: 'polygon(0% 0%, 0% 0%, -25% 100%, 0% 100%)' },
            {
              clipPath: 'polygon(0% 0%, 125% 0%, 100% 100%, 0% 100%)',
              duration: motion.imageReveal.duration,
              ease: 'power3.inOut',
              clearProps: 'clipPath',
              scrollTrigger: {
                // Measure the stationary frame rather than the clipped image.
                trigger: image.parentElement,
                start: motion.imageReveal.start,
                once: true,
              },
            },
          );
          // keyboard navigation must never land on a still-clipped card link.
          const showOnFocus = () => {
            tween.scrollTrigger?.kill();
            tween.progress(1);
          };
          image.addEventListener('focusin', showOnFocus);
          cleanups.push(() => image.removeEventListener('focusin', showOnFocus));
        });
        return () => cleanups.forEach((cleanup) => cleanup());
      },
      root,
    );
    root.addEventListener('load', refresh, true);
    refresh();
  });

  onBeforeUnmount(() => {
    root?.removeEventListener('load', refresh, true);
    cancelAnimationFrame(frame);
    media?.revert();
  });
}
