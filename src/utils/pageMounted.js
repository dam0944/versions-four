
let resolveMounted;
export const pageMounted = new Promise((resolve) => {
  resolveMounted = resolve;
});
export const markPageMounted = () => resolveMounted();
