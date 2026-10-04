import { inject, onMounted, onBeforeUnmount, reactive, toValue } from 'vue';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { enhancedMotionQuery } from '../utils/performance.js';
import { motion } from '../config/motion.js';

gsap.registerPlugin(ScrollTrigger);

/** Count each skill to its configured value once its list enters the viewport. */
export function useSkillCounters(list, skills, enabled) {
  const counters = reactive(skills.map(({ value }) => ({ value })));
  const pageAnimationsDisabled = inject('disablePageAnimations', false);
  let media;

  onMounted(() => {
    if (!list.value || (pageAnimationsDisabled && !toValue(enabled))) return;
    media = gsap.matchMedia();
    media.add(enhancedMotionQuery, () => {
      counters.forEach((counter) => {
        counter.value = 0;
      });
      gsap.to(counters, {
        value: (index) => skills[index].value,
        duration: motion.skillCounters.duration,
        stagger: motion.skillCounters.stagger,
        ease: 'power2.out',
        scrollTrigger: { trigger: list.value, start: motion.skillCounters.start, once: true },
      });
      return () =>
        counters.forEach((counter, index) => {
          counter.value = skills[index].value;
        });
    });
  });
  onBeforeUnmount(() => media?.revert());
  return counters;
}
