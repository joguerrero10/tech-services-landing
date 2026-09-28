import { Component, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { ScrollReveal } from './scroll-reveal';

@Component({ imports: [ScrollReveal], template: '<section appScrollReveal>{{ text() }}</section>' })
class Host {
  text = signal('Contenido en español');
}

describe('ScrollReveal progressive enhancement', () => {
  let callback: IntersectionObserverCallback;
  let changeMotion: () => void;
  let reduced: boolean;
  const disconnect = vi.fn();
  const observe = vi.fn();
  const removeListener = vi.fn();

  beforeEach(() => {
    reduced = false;
    disconnect.mockClear();
    observe.mockReset();
    removeListener.mockClear();
    vi.stubGlobal(
      'IntersectionObserver',
      class {
        constructor(listener: IntersectionObserverCallback) {
          callback = listener;
        }
        observe = observe;
        disconnect = disconnect;
      },
    );
    vi.stubGlobal('matchMedia', () => ({
      get matches() {
        return reduced;
      },
      addEventListener: (_: string, listener: () => void) => {
        changeMotion = listener;
      },
      removeEventListener: removeListener,
    }));
  });
  afterEach(() => {
    TestBed.resetTestingModule();
    vi.unstubAllGlobals();
  });
  async function render() {
    const fixture = TestBed.createComponent(Host);
    await fixture.whenStable();
    const section = (fixture.nativeElement as HTMLElement).querySelector('section')!;
    return { fixture, section };
  }
  function intersect() {
    callback([{ isIntersecting: true } as IntersectionObserverEntry], {} as IntersectionObserver);
  }

  it('is visible while waiting, animates once, and does not replay for longer translated content', async () => {
    const { fixture, section } = await render();
    expect(section.className).toBe('');
    expect(section.style.opacity).toBe('');
    intersect();
    expect(section.classList.contains('scroll-reveal-running')).toBe(true);
    expect(disconnect).toHaveBeenCalledOnce();
    const end = new Event('animationend');
    Object.defineProperty(end, 'animationName', { value: 'section-reveal' });
    section.dispatchEvent(end);
    fixture.componentInstance.text.set(
      'Longer English content that can wrap onto additional lines',
    );
    fixture.changeDetectorRef.markForCheck();
    await fixture.whenStable();
    intersect();
    expect(section.className).toBe('');
    expect(section.textContent).toContain('Longer English');
    expect(removeListener).toHaveBeenCalled();
  });

  it('keeps content visible without IntersectionObserver', async () => {
    vi.stubGlobal('IntersectionObserver', undefined);
    const { section } = await render();
    expect(section.className).toBe('');
    expect(observe).not.toHaveBeenCalled();
  });

  it('keeps content visible and cleans up if observation fails', async () => {
    observe.mockImplementation(() => {
      throw new Error('Observer unavailable');
    });
    const { section } = await render();
    expect(section.className).toBe('');
    expect(disconnect).toHaveBeenCalledOnce();
  });

  it('does not observe when reduced motion is requested', async () => {
    reduced = true;
    const { section } = await render();
    expect(section.className).toBe('');
    expect(observe).not.toHaveBeenCalled();
  });

  it('cancels running motion immediately when the preference changes', async () => {
    const { section } = await render();
    intersect();
    reduced = true;
    changeMotion();
    expect(section.className).toBe('');
    expect(removeListener).toHaveBeenCalled();
  });

  it('keeps keyboard targets visible and prevents replay after focus', async () => {
    const { section } = await render();
    intersect();
    section.dispatchEvent(new Event('focusin', { bubbles: true }));
    expect(section.className).toBe('');
    intersect();
    expect(section.className).toBe('');
  });

  it('disconnects pending observation when the component is destroyed', async () => {
    const { fixture } = await render();
    fixture.destroy();
    expect(disconnect).toHaveBeenCalledOnce();
    expect(removeListener).toHaveBeenCalled();
  });
});
