import { inject, onMounted, onBeforeUnmount } from 'vue';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { enhancedMotionQuery } from '../utils/performance.js';

gsap.registerPlugin(ScrollTrigger);

export function useBackgroundReveal(section) {
  const disabled = inject('disablePageAnimations', false);
  let media;
  onMounted(() => {
    if (disabled) return;
    media = gsap.matchMedia();
    media.add(enhancedMotionQuery, () => {
      if (!section.value) return;
      // Clip only the background layer; headings and controls stay readable.
      gsap.fromTo(
        section.value,
        { '--background-reveal-clip': 'polygon(0% 0%, 0% 0%, -25% 100%, 0% 100%)' },
        {
          '--background-reveal-clip': 'polygon(0% 0%, 125% 0%, 100% 100%, 0% 100%)',
          duration: 1.35,
          ease: 'power3.inOut',
          scrollTrigger: {
            trigger: section.value,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        },
      );
    });
  });
  onBeforeUnmount(() => media?.revert());
}
