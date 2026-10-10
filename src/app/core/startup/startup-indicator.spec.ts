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
  it('stays visible for five seconds from startup before exiting once ready', () => {
    const indicator = startStartupIndicator(document);
    expect(document.documentElement.getAttribute('data-startup')).toBe('loading');
    vi.advanceTimersByTime(1000);
    indicator.ready();
    vi.advanceTimersByTime(3999);
    expect(document.documentElement.getAttribute('data-startup')).toBe('loading');
    vi.advanceTimersByTime(1);
    expect(document.documentElement.getAttribute('data-startup')).toBe('leaving');
    vi.advanceTimersByTime(420);
    expect(document.documentElement.hasAttribute('data-startup')).toBe(false);
    expect(vi.getTimerCount()).toBe(0);
  });
  it('does not leave a permanent loading state when bootstrap never finishes', () => {
    const indicator = startStartupIndicator(document);
    vi.advanceTimersByTime(7999);
    expect(document.documentElement.getAttribute('data-startup')).toBe('loading');
    vi.advanceTimersByTime(1);
    expect(document.documentElement.hasAttribute('data-startup')).toBe(false);
    indicator.ready();
    expect(vi.getTimerCount()).toBe(0);
  });
  it('allows skipping the introduction and transfers keyboard focus to the content', () => {
    const loader = document.createElement('app-startup-loader');
    const button = document.createElement('button');
    loader.append(button);
    const content = document.createElement('main');
    content.id = 'contenido';
    content.tabIndex = -1;
    document.body.append(loader, content);
    try {
      const indicator = startStartupIndicator(document);
      indicator.ready();
      button.focus();
      document.dispatchEvent(new Event('startup:skip'));
      expect(document.documentElement.hasAttribute('data-startup')).toBe(false);
      expect(document.activeElement).toBe(content);
      // Flush the DOM's selectionchange events queued by focus(), not startup timers.
      vi.advanceTimersByTime(0);
      expect(vi.getTimerCount()).toBe(0);
      indicator.ready();
      expect(vi.getTimerCount()).toBe(0);
    } finally {
      loader.remove();
      content.remove();
    }
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
