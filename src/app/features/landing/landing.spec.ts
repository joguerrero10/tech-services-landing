import { provideRouter } from '@angular/router';
import { TestBed } from '@angular/core/testing';
import { RouterTestingHarness } from '@angular/router/testing';
import { provideTranslateService, provideTranslateLoader } from '@ngx-translate/core';
import { LocalTranslationLoader } from '../../core/i18n/local-translation-loader';
import { routes } from '../../app.routes';

describe('Landing content and interactions', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        provideRouter(routes),
        provideTranslateService({
          fallbackLang: 'es',
          loader: provideTranslateLoader(LocalTranslationLoader),
        }),
      ],
    }).compileComponents();
  });
  async function render() {
    const harness = await RouterTestingHarness.create('/es');
    return { harness, fixture: harness.fixture, page: harness.routeNativeElement! };
  }

  it('shows the team identity, exactly four services and the two product names', async () => {
    const { page } = await render();
    expect(page.querySelectorAll('h1')).toHaveLength(1);
    expect(page.querySelector('h1')?.textContent?.trim()).toBe(
      'Tecnología que te hace la vida más fácil.',
    );
    expect(page.querySelector('h1 .title-highlight')?.textContent).toBe('más fácil');
    expect(page.querySelector('h1 script, h1 b')).toBeNull();
    expect(page.querySelector('header')?.textContent).toContain('Equipo independiente');
    expect(page.querySelectorAll('.service-card')).toHaveLength(4);
    expect(page.querySelector('#servicios')?.textContent).toContain('Mantenimiento de software');
    expect(page.querySelectorAll('.application-card h3').length).toBe(2);
    expect(page.querySelector('#aplicaciones')?.textContent).toContain('SmartFinance PTY');
    expect(page.querySelector('#aplicaciones')?.textContent).toContain('SmartPOS PTY');
    expect(page.textContent).not.toMatch(
      /SmartNova|Smart\s?Academy|Joel\.|soporte técnico a domicilio/i,
    );
  });

  it('changes visible content, accessible text, metadata and contact messages using the selector', async () => {
    const { harness, fixture } = await render();
    let page = harness.routeNativeElement!;
    let select = page.querySelector('select')!;
    select.value = 'en';
    select.dispatchEvent(new Event('change'));
    await fixture.whenStable();
    page = harness.routeNativeElement!;
    expect(page.querySelector('h1')?.textContent?.trim()).toBe(
      'Technology that makes your life easier.',
    );
    expect(page.querySelector('h1 .title-highlight')?.textContent).toBe('easier');
    expect(page.querySelector('img')?.alt).toContain('Shared workspace');
    expect(document.documentElement.lang).toBe('en');
    expect(document.title).toContain('Independent team');
    expect(document.querySelector('meta[name="description"]')?.getAttribute('content')).toContain(
      'We are a team',
    );
    const financeLink = page.querySelector<HTMLAnchorElement>(
      'a[aria-label="Request information about SmartFinance PTY"]',
    )!;
    expect(new URL(financeLink.href).searchParams.get('text')).toContain('Hello');
    expect(new URL(financeLink.href).searchParams.get('text')).toContain('SmartFinance PTY');
    select = page.querySelector('select')!;
    select.value = 'es';
    select.dispatchEvent(new Event('change'));
    await fixture.whenStable();
    expect(document.documentElement.lang).toBe('es');
    expect(harness.routeNativeElement?.querySelector('h1')?.textContent).toContain('Tecnología');
  });

  it('toggles the mobile menu and closes it on navigation or Escape with focus restored', async () => {
    const { fixture, page } = await render();
    const toggle = page.querySelector<HTMLButtonElement>('.menu-toggle')!;
    const panel = page.querySelector<HTMLElement>('#site-navigation')!;
    expect(toggle.getAttribute('aria-expanded')).toBe('false');
    expect(toggle.getAttribute('aria-controls')).toBe(panel.id);
    toggle.click();
    await fixture.whenStable();
    expect(toggle.getAttribute('aria-expanded')).toBe('true');
    expect(toggle.getAttribute('aria-label')).toBe('Cerrar menú');
    expect(panel.classList.contains('is-open')).toBe(true);
    const link = panel.querySelector<HTMLAnchorElement>('nav a')!;
    link.click();
    await fixture.whenStable();
    expect(toggle.getAttribute('aria-expanded')).toBe('false');
    toggle.click();
    await fixture.whenStable();
    link.focus();
    link.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
    await fixture.whenStable();
    expect(toggle.getAttribute('aria-expanded')).toBe('false');
    expect(panel.classList.contains('is-open')).toBe(false);
    expect(document.activeElement).toBe(toggle);
  });

  it('provides real anchor destinations and encoded WhatsApp links for every call to action', async () => {
    const { page } = await render();
    const anchors = page.querySelectorAll<HTMLAnchorElement>('a[href^="/es#"]');
    expect(anchors.length).toBeGreaterThan(0);
    for (const link of anchors) {
      expect(page.querySelector(new URL(link.href).hash)).not.toBeNull();
    }
    const links = page.querySelectorAll<HTMLAnchorElement>('a[href^="https://wa.me/"]');
    expect(links).toHaveLength(8);
    for (const link of links) {
      const url = new URL(link.href);
      expect(url.pathname).toBe('/50768702316');
      expect(url.searchParams.get('text')).toMatch(/^Hola,/);
    }
    expect(
      new Set(
        [...page.querySelectorAll<HTMLAnchorElement>('.service-card a')].map((link) => link.href),
      ).size,
    ).toBe(4);
    expect(page.querySelector('main')?.getAttribute('tabindex')).toBe('-1');
  });
});
