// Kept apart from particlefield so callers don't pull three.js into the main bundle.
export const FOCUS_EVENT = "particlefield:focus-home";

export function focusHome(active) {
  window.dispatchEvent(new CustomEvent(FOCUS_EVENT, { detail: active }));
}
