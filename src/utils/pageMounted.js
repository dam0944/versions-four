// Initial routing may finish while the first-visit loader is still visible.
// Wait for the page and ScrollSmoother before restoring any scroll position.
let resolveMounted;
export const pageMounted = new Promise((resolve) => {
  resolveMounted = resolve;
});
export const markPageMounted = () => resolveMounted();
