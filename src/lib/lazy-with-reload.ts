import { lazy, type ComponentType } from "react";

const KEY = "chunk-reload-at";

// After a new publish, old hashed chunk files disappear. If a lazy chunk fails
// to load, reload once (at most every 30s) so the browser picks up the new build.
export function lazyWithReload<T extends ComponentType<any>>(
  factory: () => Promise<{ default: T }>,
) {
  return lazy(async () => {
    try {
      return await factory();
    } catch (error) {
      if (typeof window !== "undefined") {
        const last = Number(window.sessionStorage.getItem(KEY) || 0);
        if (Date.now() - last > 30_000) {
          window.sessionStorage.setItem(KEY, String(Date.now()));
          window.location.reload();
          return await new Promise<{ default: T }>(() => {});
        }
      }
      throw error;
    }
  });
}
