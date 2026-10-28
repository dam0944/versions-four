const blockedShortcuts = new Set(['i', 'j', 'c', 'u']);

// This only discourages casual inspection. Browser source and delivered code
// remain accessible through other browser features and network tools.
export function installInspectionDeterrent() {
  window.addEventListener('contextmenu', (event) => event.preventDefault());
  window.addEventListener(
    'keydown',
    (event) => {
      const key = event.key.toLowerCase();
      const hasModifier = event.ctrlKey || event.metaKey;
      const opensDevTools = event.key === 'F12'
        || (hasModifier && event.shiftKey && blockedShortcuts.has(key))
        || (hasModifier && key === 'u');

      if (opensDevTools) event.preventDefault();
    },
    { capture: true },
  );
}
