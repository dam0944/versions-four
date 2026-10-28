export const enhancedMotionQuery = '(prefers-reduced-motion: no-preference)';
export const useSimpleMotion = () => !window.matchMedia(enhancedMotionQuery).matches;
