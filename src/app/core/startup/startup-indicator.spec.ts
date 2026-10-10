import { startStartupIndicator } from './startup-indicator';

describe('Initial loading lifecycle', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.stubGlobal('matchMedia', () => ({ matches: false }));
  });
  afterEach(() => {
    document.documentElement.removeAttribute('data-startup');
    vi.useRealTimers();
    vi.unstubAllGlobals();
  });
  it('shows during startup, exits once ready, and leaves no pending timers', () => {
    const indicator = startStartupIndicator(document);
    expect(document.documentElement.getAttribute('data-startup')).toBe('loading');
    indicator.ready();
    vi.advanceTimersByTime(800);
    expect(document.documentElement.getAttribute('data-startup')).toBe('leaving');
    vi.advanceTimersByTime(180);
    expect(document.documentElement.hasAttribute('data-startup')).toBe(false);
    expect(vi.getTimerCount()).toBe(0);
  });
  it('does not leave a permanent loading state when bootstrap never finishes', () => {
    const indicator = startStartupIndicator(document);
    vi.advanceTimersByTime(4000);
    expect(document.documentElement.hasAttribute('data-startup')).toBe(false);
    indicator.ready();
    expect(vi.getTimerCount()).toBe(0);
  });
  it('clears the loading state immediately on failure', () => {
    const indicator = startStartupIndicator(document);
    indicator.fail();
    expect(document.documentElement.hasAttribute('data-startup')).toBe(false);
    expect(vi.getTimerCount()).toBe(0);
  });
  it('does not animate or delay users requesting reduced motion', () => {
    vi.stubGlobal('matchMedia', () => ({ matches: true }));
    const indicator = startStartupIndicator(document);
    indicator.ready();
    expect(document.documentElement.hasAttribute('data-startup')).toBe(false);
    expect(vi.getTimerCount()).toBe(0);
  });
});
