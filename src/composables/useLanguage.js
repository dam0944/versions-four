import { ref, provide, watch, onMounted, onBeforeUnmount } from 'vue';
import { useRoute } from 'vue-router';
import { gsap } from 'gsap';
import { useSimpleMotion } from '../utils/performance.js';
import { site } from '../config/site.js';
import { i18n } from '../i18n.js';

/** Provide the shared language and update the document language accessibly. */
export function useLanguage() {
  const language = ref(i18n.global.locale.value || site.defaultLanguage);
  const route = useRoute();

  provide('language', language);

  let languageTween;
  let pendingLanguage = language.value;

  function changeLanguage(nextLanguage) {
    if (!['en', 'km'].includes(nextLanguage) || nextLanguage === pendingLanguage) return;
    pendingLanguage = nextLanguage;
    languageTween?.kill();
    const targets = document.querySelectorAll('#app .top, #main-content, #smooth-content > footer');

    function applyLanguage() {
      language.value = nextLanguage;
      i18n.global.locale.value = nextLanguage;
      localStorage.setItem('lang', nextLanguage);
    }

    if (route.path !== '/' || useSimpleMotion()) {
      applyLanguage();
      gsap.set(targets, { clearProps: 'opacity' });
      return;
    }

    languageTween = gsap
      .timeline()
      .to(targets, { opacity: 0, duration: 0.12, ease: 'power1.out' })
      .call(applyLanguage)
      .to(targets, {
        opacity: 1,
        duration: 0.24,
        ease: 'power1.inOut',
        clearProps: 'opacity',
      });
  }

  provide('changeLanguage', changeLanguage);
  onBeforeUnmount(() => languageTween?.kill());

  function handleLanguageKey(event) {
    if (!['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'].includes(event.key)) return;
    event.preventDefault();
    const nextLanguage = event.currentTarget.value === 'en' ? 'km' : 'en';
    document.getElementById(`l-${nextLanguage}`).focus();
    changeLanguage(nextLanguage);
  }

  function updateLanguage() {
    document.documentElement.lang = language.value;
  }

  onMounted(updateLanguage);
  watch(language, updateLanguage);

  return { language, changeLanguage, handleLanguageKey };
}
