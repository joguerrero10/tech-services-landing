import { DOCUMENT } from '@angular/common';
import { AfterViewInit, Directive, ElementRef, inject, OnDestroy, Renderer2 } from '@angular/core';

/** Progressive enhancement: no hidden waiting state, including when observation fails. */
@Directive({ selector: '[appScrollReveal]', host: { '(focusin)': 'finish()' } })
export class ScrollReveal implements AfterViewInit, OnDestroy {
  private readonly element = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
  private readonly renderer = inject(Renderer2);
  private readonly view = inject(DOCUMENT).defaultView;
  private observer?: IntersectionObserver;
  private motion?: MediaQueryList;
  private finished = false;
  private stopAnimationListener?: () => void;
  private readonly reduceMotion = () => {
    if (this.motion?.matches) this.finish();
  };

  ngAfterViewInit(): void {
    const view = this.view;
    if (!view?.IntersectionObserver || !view.matchMedia) return;
    try {
      this.motion = view.matchMedia('(prefers-reduced-motion: reduce)');
      if (this.motion.matches) return;
      this.motion.addEventListener('change', this.reduceMotion);
      this.observer = new view.IntersectionObserver(
        (entries) => {
          if (this.finished || !entries.some((entry) => entry.isIntersecting)) return;
          // Disconnect before starting. Text changes and subsequent scrolls cannot replay it.
          this.observer?.disconnect();
          this.observer = undefined;
          this.finished = true;
          this.stopAnimationListener = this.renderer.listen(
            this.element,
            'animationend',
            (event: AnimationEvent) => {
              if (event.target === this.element && event.animationName === 'section-reveal')
                this.finish();
            },
          );
          this.renderer.addClass(this.element, 'scroll-reveal-running');
        },
        { threshold: 0 },
      );
      this.observer.observe(this.element);
    } catch {
      // Enhancement is optional; native content remains visible without observer support.
      this.finish();
    }
  }

  protected finish(): void {
    this.finished = true;
    this.observer?.disconnect();
    this.observer = undefined;
    this.motion?.removeEventListener('change', this.reduceMotion);
    this.stopAnimationListener?.();
    this.stopAnimationListener = undefined;
    this.renderer.removeClass(this.element, 'scroll-reveal-running');
  }

  ngOnDestroy(): void {
    this.finish();
  }
}
