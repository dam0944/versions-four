import { ref, onMounted, onBeforeUnmount, watch, nextTick } from 'vue';
import { useRoute } from 'vue-router';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollSmoother } from 'gsap/ScrollSmoother';
import { enhancedMotionQuery } from '../utils/performance.js';
import { motion } from '../config/motion.js';

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

export function usePageSmoother(language) {
  const ready = ref(false);
  const headerSpace = ref(0);
  const route = useRoute();
  let media, observer, frame;
  let disposed = false;
  const measureHeader = () => {
    const header = document.querySelector('#app .top');
    headerSpace.value =
      ScrollSmoother.get() && header && !header.classList.contains('over-hero')
        ? header.getBoundingClientRect().height
        : 0;
  };
  const refresh = () => {
    cancelAnimationFrame(frame);
    frame = requestAnimationFrame(() => {
      measureHeader();
      ScrollTrigger.refresh();
    });
  };
  onMounted(() => {
    media = gsap.matchMedia();
    media.add(enhancedMotionQuery, () => {
      const smoother = ScrollSmoother.create({
        wrapper: '#smooth-wrapper',
        content: '#smooth-content',
        // Use the same scrolling response on every route, with lighter touch smoothing.
        smooth: motion.smooth,
        smoothTouch: motion.smoothTouch,
        effects: false,
        normalizeScroll: false,
      });
      document.documentElement.classList.add('has-scroll-smoother');
      measureHeader();
      return () => {
        smoother.kill();
        document.documentElement.classList.remove('has-scroll-smoother');
        headerSpace.value = 0;
      };
    });
    // Mount page animations after the smoother has established its scroller.
    ready.value = true;
    const header = document.querySelector('#app .top');
    if (header && 'ResizeObserver' in window) {
      observer = new ResizeObserver(refresh);
      observer.observe(header);
    }
    document.fonts?.ready.then(() => {
      if (!disposed) refresh();
    });
    nextTick(refresh);
  });
  watch(
    [() => route.fullPath, language],
    async () => {
      await nextTick();
      refresh();
    },
    { flush: 'post' },
  );
  onBeforeUnmount(() => {
    disposed = true;
    observer?.disconnect();
    cancelAnimationFrame(frame);
    media?.revert();
  });
  return { ready, headerSpace };
}
