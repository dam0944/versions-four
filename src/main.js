import { createApp, nextTick } from 'vue';
import App from './App.vue';
import router from './router/index.js';
import './assets/styles/main.css';
import { createPageLoader } from './utils/pageLoader.js';
import { markPageMounted } from './utils/pageMounted.js';

async function start() {
  const loader = createPageLoader();
  const app = createApp(App).use(router);
  // Fetch the initial route while the introduction is visible. Mount afterward
  // so the existing entrance and scroll animations don't play behind it.
  if (loader) await Promise.all([loader.finished, router.isReady()]);
  app.mount('#app');
  await nextTick();
  markPageMounted();
  loader?.dismiss();
}

start();
