<script setup>
import { computed } from "vue";
import { useRoute } from "vue-router";
import TeamMemberBiography from "../components/about/TeamMemberBiography.vue";
import { members } from "../data/team.js";

const route = useRoute();
const member = computed(() => members.find((item) => item.id === route.params.id));
</script>

<template>
  <TeamMemberBiography v-if="member" :member="member" />

  <main v-else class="not-found">
    <h1>Team member not found</h1>
    <RouterLink to="/team">Return to the team</RouterLink>
  </main>
</template>

<style scoped>
.not-found {
  width: min(100% - 48px, 884px);
  min-height: 40vh;
  margin-inline: auto;
  padding-block: 64px;
  color: #18272b;
}

.not-found h1 {
  margin: 0 0 16px;
  font-family: var(--font-heading);
}

.not-found a {
  color: #8b6b34;
}
</style>
