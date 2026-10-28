import { nextTick } from 'vue';
import { ScrollSmoother } from 'gsap/ScrollSmoother';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { createRouter, createWebHistory, START_LOCATION } from 'vue-router';
import { pageMounted } from '../utils/pageMounted.js';

const HomeView = () => import('../views/HomeView.vue');
const AboutView = () => import('../views/AboutView.vue');
const ContactView = () => import('../views/ContactView.vue');
const ServiceView = () => import('../views/ServiceView.vue');
const TeamView = () => import('../views/TeamView.vue');
const ResultView = () => import('../views/ResultView.vue');
const ResourcesView = () => import('../views/ResourcesView.vue');

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),

  routes: [
    {
      path: '/',
      component: HomeView,
    },
    {
      path: '/about',
      component: AboutView,
    },
    {
      path: '/team',
      component: TeamView,
    },
    {
      path: '/results',
      component: ResultView,
    },
    {
      path: '/resources',
      component: ResourcesView,
    },
    {
      path: '/service',
      component: ServiceView,
    },
    {
      path: '/contact',
      component: ContactView,
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: '/',
    },
  ],

  async scrollBehavior(to, from, savedPosition) {
    if (from === START_LOCATION) {
      savedPosition = null;
      await pageMounted;
    }
    await nextTick();
    await new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve)));
    const smoother = ScrollSmoother.get();
    if (smoother) {
      ScrollTrigger.refresh();
      const target = to.hash && document.getElementById(decodeURIComponent(to.hash.slice(1)));
      if (savedPosition) smoother.scrollTop(savedPosition.top);
      else if (target) smoother.scrollTo(target, true, 'top 110px');
      else smoother.scrollTop(0);
      return false;
    }
    if (savedPosition) return { ...savedPosition, behavior: 'instant' };

    if (to.hash) {
      return {
        el: to.hash,
        top: 110,
        behavior: 'instant',
      };
    }

    return { top: 0, behavior: 'instant' };
  },
});

export default router;
