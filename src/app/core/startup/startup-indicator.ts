/** Browser-only enhancement. Prerendered content is never hidden or made inert. */
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
    complete = true;
    root.removeAttribute('data-startup');
    clearTimeout(safetyTimer);
    clearTimeout(minimumTimer);
    clearTimeout(exitTimer);
    motion?.removeEventListener?.('change', onMotionChange);
  };
  // A failed or stalled bootstrap cannot strand the user in a loading state.
  const safetyTimer = setTimeout(finish, 4000);
  root.setAttribute('data-startup', 'loading');
  motion?.addEventListener?.('change', onMotionChange);

  return {
    ready() {
      if (complete || finishing) return;
      finishing = true;
      minimumTimer = setTimeout(
        () => {
          root.setAttribute('data-startup', 'leaving');
          exitTimer = setTimeout(finish, 180);
        },
        Math.max(0, 800 - (Date.now() - started)),
      );
    },
    fail: finish,
  };
}
