import { createApp, nextTick } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import router from './router/index.js';
import './assets/styles/main.css';
import { createPageLoader } from './utils/pageLoader.js';
import { markPageMounted } from './utils/pageMounted.js';
import { i18n } from './i18n.js';

async function start() {
  const loader = createPageLoader();
  const app = createApp(App)
    .use(createPinia())
    .use(i18n)
    .use(router);

  if (loader) await Promise.all([loader.finished, router.isReady()]);
  app.mount('#app');
  await nextTick();
  markPageMounted();
  loader?.dismiss();
}

start();