<script setup>
import { computed } from "vue";
import { useI18n } from "vue-i18n";

const props = defineProps({
  member: {
    type: Object,
    required: true,
  },
});

const { locale, t } = useI18n();
const language = computed(() => (locale.value === "km" ? "km" : "en"));
const biography = computed(
  () => props.member.biography?.[language.value] ?? props.member.biography?.en ?? []
);
const paragraphs = computed(() =>
  Array.isArray(biography.value) ? biography.value : biography.value.paragraphs ?? []
);
const responsibilities = computed(
  () =>
    props.member.responsibilities?.[language.value] ??
    props.member.responsibilities?.en ??
    []
);
const philosophy = computed(
  () => props.member.philosophy?.[language.value] ?? props.member.philosophy?.en ?? ""
);
</script>

<template>
  <main class="member-page">
    <section class="member-banner">
      <div class="banner-inner">
        <p class="eyebrow">{{ t("teamMemberPage.eyebrow") }}</p>
        <h1>{{ member.name[language] ?? member.name.en }}</h1>
      </div>
    </section>

    <section class="member-content" :aria-label="t('teamMemberPage.biography')">
      <div class="member-profile">
        <img
          class="member-photo"
          :src="member.image"
          :alt="member.name[language] ?? member.name.en"
        />
        <h2>{{ member.name[language] ?? member.name.en }}</h2>
        <p class="member-position">
          {{ member.position[language] ?? member.position.en }}
        </p>
      </div>

      <article class="member-biography">
        <!-- <h2>{{ t("teamMemberPage.biography") }}</h2> -->
        <p v-for="(paragraph, index) in paragraphs" :key="index">
          {{ paragraph }}
        </p>

        <section v-if="responsibilities.length" class="member-responsibilities">
          <h3>{{ t("teamMemberPage.responsibilities") }}</h3>
          <ul>
            <li v-for="(item, index) in responsibilities" :key="index">{{ item }}</li>
          </ul>
        </section>

        <section v-if="philosophy" class="member-philosophy">
          <h3>{{ t("teamMemberPage.philosophy") }}</h3>
          <blockquote>{{ philosophy }}</blockquote>
        </section>
      </article>
    </section>
  </main>
</template>

<style scoped>
.member-page {
  color: #18272b;
  background: #f7f7f7;
}

.member-banner {
  position: relative;
  display: flex;
  align-items: center;
  min-height: 196px;
  overflow: hidden;
  color: #fff;
  background: #343a3c;
  isolation: isolate;
}

.member-banner::before {
  position: absolute;
  z-index: -1;
  inset: 0;
  content: "";
  background-image: linear-gradient(90deg, rgb(0 0 0 / 48%), rgb(0 0 0 / 28%)),
    url("/images/image.png");
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  filter: grayscale(100%);
}

.banner-inner {
  width: min(calc(100% - 48px), 1120px);
  margin-inline: auto;
}

.banner-inner {
  padding-block: 32px;
}

.eyebrow {
  margin: 0 0 8px;
  color: rgb(255 255 255 / 78%);
  font-size: 0.875rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.member-banner h1 {
  margin: 0;
  color: #fff;
  font-family: var(--font-heading);
  font-size: clamp(2.25rem, 5vw, 3.75rem);
  font-weight: 700;
  line-height: 1.1;
}

.member-content {
  width: min(calc(100% - 48px), 1120px);
  display: grid;
  grid-template-columns: minmax(220px, 288px) minmax(0, 1fr);
  gap: clamp(36px, 6vw, 72px);
  align-items: start;
  padding-inline: 0;
  padding-block: 52px 80px;
  margin-inline: auto;
}

.member-photo {
  display: block;
  width: 100%;
  aspect-ratio: 4 / 5;
  border-radius: 4px;
  background: #aaa;
  object-fit: cover;
  object-position: center top;
}

.member-profile h2 {
  margin: 16px 0 4px;
  color: #122a42;
  font-family: var(--font-heading);
  font-size: 1.35rem;
  font-weight: 700;
  line-height: 1.3;
}

.member-position {
  margin: 0;
  color: #bd2736;
  font-size: 0.95rem;
  font-weight: 600;
}

.member-biography h2 {
  margin: 0 0 18px;
  color: #122a42;
  font-family: var(--font-heading);
  font-size: 1.65rem;
  font-weight: 700;
}

.member-biography p {
  margin: 0 0 18px;
  color: #24364a;
  font-size: 1rem;
  line-height: 1.85;
}

.member-biography p:last-child {
  margin-bottom: 0;
}

.member-responsibilities,
.member-philosophy {
  margin-top: 36px;
  padding: 0;
}

#main-content .member-responsibilities,
#main-content .member-philosophy {
  padding: 0;
}

.member-responsibilities h3,
.member-philosophy h3 {
  margin: 0 0 16px;
  color: #122a42;
  font-family: var(--font-heading);
  font-size: 1.25rem;
  font-weight: 700;
  line-height: 1.4;
}

.member-responsibilities ul {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px 28px;
  margin: 0;
  padding: 0;
  list-style: none;
}

.member-responsibilities li {
  position: relative;
  padding-left: 20px;
  color: #24364a;
  font-size: 0.95rem;
  line-height: 1.65;
}

.member-responsibilities li::before {
  position: absolute;
  top: 0.65em;
  left: 0;
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: #bd2736;
  content: "";
}

.member-philosophy blockquote {
  margin: 0;
  padding: 18px 22px;
  border-left: 4px solid #bd2736;
  background: #fff;
  color: #24364a;
  font-size: 1rem;
  font-style: italic;
  line-height: 1.8;
}

@media (max-width: 640px) {
  .member-banner {
    min-height: 160px;
  }

  .banner-inner {
    width: calc(100% - 32px);
  }

  .member-content {
    width: calc(100% - 32px);
  }

  .member-content {
    grid-template-columns: 1fr;
    gap: 32px;
    padding-block: 32px 56px;
  }

  .member-photo {
    max-width: 360px;
  }

  .member-responsibilities ul {
    grid-template-columns: 1fr;
  }
}

@media (min-width: 901px) {
  #main-content .member-content {
    padding-inline: 0;
  }
}
</style>
