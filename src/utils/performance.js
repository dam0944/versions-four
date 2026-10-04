// Preserve animations on every device; honor the user's motion preference.
export const enhancedMotionQuery = '(prefers-reduced-motion: no-preference)';
export const useSimpleMotion = () => !window.matchMedia(enhancedMotionQuery).matches;
