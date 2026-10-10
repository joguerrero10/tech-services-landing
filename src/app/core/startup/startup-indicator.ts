export const STARTUP_SKIP_EVENT = 'startup:skip';

/** Browser-only introduction. Without JavaScript, prerendered content stays visible. */
export function startStartupIndicator(document: Document): { ready(): void; fail(): void } {
  const view = document.defaultView;
  const inactive = { ready() {}, fail() {} };
  if (!view || view.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return inactive;

  const root = document.documentElement;
  const started = Date.now();
  let complete = false;
  let finishing = false;
  let exitTimer: ReturnType<typeof setTimeout> | undefined;
  let minimumTimer: ReturnType<typeof setTimeout> | undefined;
  const motion = view.matchMedia?.('(prefers-reduced-motion: reduce)');
  const onMotionChange = () => {
    if (motion?.matches) finish();
  };
  const finish = () => {
    const restoreFocus = document.activeElement?.closest('app-startup-loader');
    complete = true;
    root.removeAttribute('data-startup');
    clearTimeout(safetyTimer);
    clearTimeout(minimumTimer);
    clearTimeout(exitTimer);
    motion?.removeEventListener?.('change', onMotionChange);
    document.removeEventListener(STARTUP_SKIP_EVENT, finish);
    if (restoreFocus) document.getElementById('contenido')?.focus({ preventScroll: true });
  };
  // A failed or stalled bootstrap cannot strand the user in a loading state.
  const safetyTimer = setTimeout(finish, 8000);
  root.setAttribute('data-startup', 'loading');
  document.addEventListener(STARTUP_SKIP_EVENT, finish);
  motion?.addEventListener?.('change', onMotionChange);

  return {
    ready() {
      if (complete || finishing) return;
      finishing = true;
      minimumTimer = setTimeout(
        () => {
          root.setAttribute('data-startup', 'leaving');
          exitTimer = setTimeout(finish, 420);
        },
        Math.max(0, 5000 - (Date.now() - started)),
      );
    },
    fail: finish,
  };
}
