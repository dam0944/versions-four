<script setup>
import '../../assets/styles/loader.css';

const loaderSrc = import.meta.env.BASE_URL + 'lawyer-loader.svg';
</script>

<template>
  <div class="first-visit-loader" role="status" aria-live="polite" aria-label="Loading website">
    <img
      class="first-visit-loader__illustration"
      :src="loaderSrc"
      alt=""
      width="160"
      height="160"
    />
  </div>
</template>
