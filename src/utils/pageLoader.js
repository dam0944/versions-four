import { createApp } from 'vue';
import Loading from '../components/layout/Loading.vue';
import { site } from '../config/site.js';

export function createPageLoader() {
  if (!site.loader.enabled || window.matchMedia('(prefers-reduced-motion: reduce)').matches)
    return null;
  // This runs once when the document opens, including browser refreshes.
  // Vue Router navigation does not restart the loading screen.
  const host = document.createElement('div');
  document.body.append(host);
  const loaderApp = createApp(Loading);
  loaderApp.mount(host);
  document.getElementById('app').setAttribute('aria-busy', 'true');

  return {
    finished: new Promise((resolve) => setTimeout(resolve, site.loader.duration)),
    dismiss() {
      document.getElementById('app').removeAttribute('aria-busy');
      loaderApp.unmount();
      host.remove();
    },
  };
}
