<script setup>
import { useSimpleMotion } from "../../utils/performance.js";

import { ref, computed, inject, onMounted, onBeforeUnmount, nextTick, watch } from "vue";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRoute } from "vue-router";
import { useI18n } from "vue-i18n";

gsap.registerPlugin(ScrollTrigger);

const changeLanguage = inject("changeLanguage");
const { t, locale } = useI18n();
const route = useRoute();
const menuOpen = ref(false);
const overHero = computed(() => route.path === "/");
const isScrolled = ref(false);
const headerRef = ref(null);
const navRef = ref(null);
const blobRef = ref(null);
let blobTween;
let scrollTrigger;
let activeLink;
let blobVisible = false;

const closeOnEscape = (event) => {
  if (event.key === "Escape") menuOpen.value = false;
};

const moveBlob = (event, force = false) => {
  if (window.matchMedia("(max-width: 1100px)").matches) return;

  const link = event.target.closest?.("a");
  const nav = navRef.value;
  const blob = blobRef.value;

  if (!link || !nav?.contains(link) || !blob || (link === activeLink && !force)) return;

  const navRect = nav.getBoundingClientRect();
  const linkRect = link.getBoundingClientRect();
  const targetX = linkRect.left - navRect.left - 4;
  const targetY = linkRect.top - navRect.top - 3;
  const targetWidth = linkRect.width + 8;
  const targetHeight = linkRect.height + 6;
  const reducedMotion = useSimpleMotion();

  blobTween?.kill();

  if (!blobVisible) {
    gsap.set(blob, {
      x: targetX - 16,
      y: targetY,
      width: targetWidth * 0.7,
      height: targetHeight,
      autoAlpha: 1,
    });
    blobVisible = true;
  }

  if (reducedMotion) {
    gsap.set(blob, { x: targetX, y: targetY, width: targetWidth, height: targetHeight });
  } else if (force) {
    blobTween = gsap.to(blob, {
      x: targetX,
      y: targetY,
      width: targetWidth,
      height: targetHeight,
      duration: 0.3,
      ease: "power2.out",
    });
  } else {
    const currentX = Number(gsap.getProperty(blob, "x")) || 0;
    const distance = targetX - currentX;
    const stretch = Math.min(Math.abs(distance) * 0.18, 28);

    blobTween = gsap
      .timeline()
      .to(blob, {
        x: targetX + Math.sign(distance) * stretch,
        y: targetY,
        width: targetWidth + stretch,
        height: targetHeight,
        duration: 0.2,
        ease: "power2.out",
      })
      .to(blob, {
        x: targetX,
        width: targetWidth,
        duration: 0.55,
        ease: "elastic.out(1, 0.55)",
      });
  }

  activeLink = link;
};

const hideBlob = (event) => {
  if (event.type === "focusout" && navRef.value?.contains(event.relatedTarget)) return;

  const currentRouteLink = navRef.value?.querySelector(".router-link-exact-active");
  if (currentRouteLink) {
    moveBlob({ target: currentRouteLink, type: "route" });
    return;
  }

  activeLink = null;
  blobTween?.kill();

  if (useSimpleMotion()) {
    gsap.set(blobRef.value, { autoAlpha: 0 });
    blobVisible = false;
    return;
  }

  blobTween = gsap.to(blobRef.value, {
    autoAlpha: 0,
    scale: 0.75,
    duration: 0.2,
    ease: "power2.out",
    onComplete: () => {
      blobVisible = false;
    },
  });
};

const handleNavClick = (event) => {
  moveBlob(event, true);
  menuOpen.value = false;
};

const syncActiveRoute = (force = false) => {
  const currentRouteLink = navRef.value?.querySelector(".router-link-exact-active");
  if (currentRouteLink) moveBlob({ target: currentRouteLink, type: "route" }, force);
};

const syncScrollStyle = () => {
  scrollTrigger?.kill();
  const header = headerRef.value;
  if (!header) return;

  const overlaysHero = overHero.value;
  isScrolled.value = overlaysHero && window.scrollY > 40;

  if (overlaysHero) {
    scrollTrigger = ScrollTrigger.create({
      start: 40,
      onEnter: () => {
        isScrolled.value = true;
      },
      onLeaveBack: () => {
        isScrolled.value = false;
      },
    });
  }
};

watch(
  () => route.fullPath,
  async () => {
    await nextTick();
    syncActiveRoute();
    syncScrollStyle();
  }
);

watch(locale, async () => {
  await nextTick();
  requestAnimationFrame(() => syncActiveRoute(true));
});

onMounted(() => {
  document.addEventListener("keydown", closeOnEscape);
  syncScrollStyle();
  requestAnimationFrame(syncActiveRoute);
});
onBeforeUnmount(() => {
  document.removeEventListener("keydown", closeOnEscape);
  scrollTrigger?.kill();
  blobTween?.kill();
  if (blobRef.value) gsap.set(blobRef.value, { clearProps: "all" });
});
</script>
<template>
  <header
    ref="headerRef"
    class="top"
    :class="{
      'has-open-menu': menuOpen,
      'over-hero': overHero,
      'is-scrolled': isScrolled,
    }"
  >
    <svg class="gooey-filter" aria-hidden="true" focusable="false">
      <filter id="nav-goo">
        <feGaussianBlur in="SourceGraphic" stdDeviation="5" result="blur" />
        <feColorMatrix
          in="blur"
          mode="matrix"
          values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 18 -7"
          result="goo"
        />
        <feComposite in="SourceGraphic" in2="goo" operator="atop" />
      </filter>
    </svg>
    <div class="in">
      <RouterLink class="brand" to="/"
        ><img style="width: 50px" src="/logo.png" :alt="t('header.logoAlt')"
      /></RouterLink>
      <nav
        ref="navRef"
        :class="{ 'is-open': menuOpen }"
        @click="handleNavClick"
        @focusin="moveBlob"
        @focusout="hideBlob"
        id="main-navigation"
        :aria-label="t('header.navigationLabel')"
      >
        <span ref="blobRef" class="gooey-blob" aria-hidden="true"></span>
        <RouterLink to="/">{{ t("header.home") }}</RouterLink>
        <RouterLink to="/about">{{ t("header.about") }}</RouterLink>
        <RouterLink to="/team">{{ t("header.team") }}</RouterLink>
        <RouterLink to="/results">{{ t("header.results") }}</RouterLink>
        <RouterLink to="/resources">{{ t("header.newsResources") }}</RouterLink>
        <RouterLink class="reqbtn mobile-appointment" to="/contact">{{
          t("header.appointment")
        }}</RouterLink>
      </nav>
      <button
        class="menu-toggle"
        type="button"
        aria-controls="main-navigation"
        :aria-expanded="menuOpen"
        @click="menuOpen = !menuOpen"
      >
        {{ menuOpen ? t("header.closeMenu") : t("header.openMenu") }}
        <span class="menu-icon" aria-hidden="true">
          <span></span>
          <span></span>
          <span></span>
        </span>
      </button>
      <div class="tools">
        <div class="switch">
          <label for="l-en" @click.prevent="changeLanguage('en')">EN</label
          ><span class="sep">|</span
          ><label for="l-km" @click.prevent="changeLanguage('km')">ខ្មែរ</label>
        </div>
        <RouterLink class="reqbtn" to="/contact">{{
          t("header.appointment")
        }}</RouterLink>
      </div>
    </div>
  </header>
</template>

<style scoped>
.top nav {
  position: relative;
  isolation: isolate;
}

.top.over-hero {
  position: fixed;
  inset: 0 0 auto;
  border-bottom-color: transparent;
  background: transparent;
  transition: background-color 300ms ease, border-color 300ms ease, box-shadow 300ms ease;
}

.top:not(.over-hero) {
  border-bottom-color: #e5eaf0;
  background: #ffffff;
  color: #172638;
}

.top:not(.over-hero) .brand {
  color: #172638;
}

.top:not(.over-hero) .brand i::after {
  background: #fff;
}

.top:not(.over-hero) nav > a,
.top:not(.over-hero) .menu-toggle {
  color: #172638;
}

.top:not(.over-hero) .reqbtn {
  border-color: var(--color-button);
  border-radius: 999px;
  background: var(--color-button);
  color: var(--color-button-text);
}

.top:not(.over-hero) .gooey-blob {
  background: rgba(220, 236, 251, 0.9);
}

.top.is-scrolled {
  border-bottom-color: #e5eaf0;
  background: #ffffff;
  box-shadow: 0 4px 18px rgba(15, 29, 45, 0.08);
}

.top.over-hero:not(.is-scrolled):not(.has-open-menu) .brand,
.top.over-hero:not(.is-scrolled):not(.has-open-menu) nav > a,
.top.over-hero:not(.is-scrolled):not(.has-open-menu) .menu-toggle,
.top.over-hero:not(.is-scrolled):not(.has-open-menu) .switch label {
  color: #fff;
  text-shadow: 0 1px 8px rgba(0, 0, 0, 0.42);
}

.top.over-hero:not(.is-scrolled) .switch .sep {
  color: rgba(255, 255, 255, 0.75);
}

.top.is-scrolled .brand {
  color: #172638;
}

.top.over-hero .brand i::after,
.top.is-scrolled .brand i::after {
  background: #fff;
}

.top.is-scrolled nav > a,
.top.is-scrolled .menu-toggle {
  color: #172638;
}

.top:not(.over-hero) nav > a:hover,
.top:not(.over-hero) nav > a:focus-visible,
.top:not(.over-hero) nav > a.router-link-exact-active,
.top.over-hero:not(.is-scrolled):not(.has-open-menu) nav > a:hover,
.top.over-hero:not(.is-scrolled):not(.has-open-menu) nav > a:focus-visible,
.top.over-hero:not(.is-scrolled):not(.has-open-menu) nav > a.router-link-exact-active,
.top.is-scrolled nav > a:hover,
.top.is-scrolled nav > a:focus-visible,
.top.is-scrolled nav > a.router-link-exact-active {
  color: #8b682a;
  text-shadow: none;
}

.top.over-hero .reqbtn,
.top.is-scrolled .reqbtn {
  border-color: var(--color-button);
  border-radius: 999px;
  background: var(--color-button);
  color: var(--color-button-text);
}

.top.over-hero .gooey-blob,
.top.is-scrolled .gooey-blob {
  background: rgba(220, 236, 251, 0.9);
}

.top nav > a {
  position: relative;
  z-index: 1;
  padding: 8px 12px;
  transition: color 240ms ease, text-shadow 240ms ease;
}

.gooey-blob {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 0;
  border-radius: 999px;
  background: rgba(184, 137, 58, 0.55);
  filter: url(#nav-goo);
  opacity: 0;
  visibility: hidden;
  pointer-events: none;
  will-change: transform, width, height;
}

.gooey-filter {
  position: absolute;
  width: 0;
  height: 0;
  overflow: hidden;
}

.menu-toggle {
  align-items: center;
  justify-content: center;
  gap: 10px;
  cursor: pointer;
}

.mobile-appointment {
  display: none;
}

.menu-icon {
  position: relative;
  display: inline-block;
  flex: 0 0 22px;
  width: 22px;
  height: 18px;
}

.menu-icon > span {
  position: absolute;
  left: 0;
  top: 8px;
  width: 100%;
  height: 2px;
  border-radius: 2px;
  background: currentColor;
  transform-origin: center;
  transition: transform 300ms cubic-bezier(0.4, 0, 0.2, 1), opacity 180ms ease;
}

.menu-icon > span:first-child {
  transform: translateY(-7px);
}

.menu-icon > span:last-child {
  transform: translateY(7px);
}

.menu-toggle[aria-expanded="true"] .menu-icon > span:first-child {
  transform: rotate(45deg);
}

.menu-toggle[aria-expanded="true"] .menu-icon > span:nth-child(2) {
  opacity: 0;
  transform: scaleX(0);
}

.menu-toggle[aria-expanded="true"] .menu-icon > span:last-child {
  transform: rotate(-45deg);
}

@media (max-width: 1100px) {
  .top.has-open-menu {
    background: var(--color-primary);
    border-bottom-color: #16314d;
    box-shadow: 0 8px 24px rgb(7 26 46 / 20%);
    max-height: 100dvh;
    overflow-y: auto;
  }

  .top.has-open-menu nav > a,
  .top.has-open-menu .menu-toggle,
  .top.has-open-menu .switch label {
    color: #fff;
    text-shadow: none;
  }

  .top.has-open-menu nav > a:hover,
  .top.has-open-menu nav > a:focus-visible,
  .top.has-open-menu nav > a.router-link-exact-active {
    color: var(--champ);
  }

  .gooey-blob {
    display: none;
  }

  .menu-toggle {
    display: inline-flex;
  }

  .top nav.is-open > .mobile-appointment {
    display: inline-flex;
    align-self: flex-start;
    align-items: center;
    justify-content: center;
    margin-block: 12px 8px;
    border-color: var(--color-button);
    border-radius: 999px;
    background: var(--color-button);
    color: var(--color-button-text);
    text-shadow: none;
  }
}

@media (prefers-reduced-motion: reduce) {
  .gooey-blob {
    filter: none;
  }
}

@media (prefers-reduced-motion: reduce) {
  .menu-icon > span {
    transition: none;
  }
}
</style>
