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

  it('shows the Tech Together identity, seven service packages and six project names', async () => {
    const { page } = await render();
    expect(page.querySelectorAll('h1')).toHaveLength(1);
    expect(page.querySelector('h1')?.textContent?.trim()).toBe(
      'Software a medida para negocios en Panamá.',
    );
    expect(page.querySelector('h1 .title-highlight')?.textContent).toBe('negocios en Panamá');
    expect(page.querySelector('h1 script, h1 b')).toBeNull();
    expect(page.querySelector('header')?.textContent).toContain('Tech Together');
    expect(page.querySelectorAll('.service-card')).toHaveLength(7);
    expect(page.querySelector('#servicios')?.textContent).toContain('Mantenimiento Plan Soporte');
    expect(page.querySelectorAll('.application-card h3').length).toBe(6);
    expect(page.querySelectorAll('.application-card li')).toHaveLength(18);
    expect(page.querySelectorAll('.application-card img')).toHaveLength(6);
    expect(
      [...page.querySelectorAll('.project-status')].map((node) => node.textContent?.trim()),
    ).toEqual([
      'Publicado',
      'En desarrollo',
      'En desarrollo',
      'Sin publicar',
      'Sin publicar',
      'Sin publicar',
    ]);
    expect(page.querySelectorAll('.project-scope')).toHaveLength(2);
    for (const image of page.querySelectorAll<HTMLImageElement>('.application-card img')) {
      expect(image.srcset).toContain('480w');
      expect(image.srcset).toContain('960w');
      expect(image.alt).toContain('Ilustración conceptual');
    }
    expect(page.querySelector('#sobre-nosotros')?.textContent).toContain(
      'Somos un grupo de programadores en Panamá',
    );
    expect(
      [...page.querySelectorAll('main > *')].map((element) => element.tagName.toLowerCase()),
    ).toEqual([
      'app-hero',
      'app-services',
      'app-applications',
      'app-about',
      'app-process',
      'app-contact',
    ]);
    expect(page.querySelector('#servicios')?.textContent).toContain('Desde $250');
    expect(page.querySelector('#servicios')?.textContent).toContain('Desde $1,200');
    expect(page.querySelector('#aplicaciones')?.textContent).toContain('SmartFinance PTY');
    expect(page.querySelector('#aplicaciones')?.textContent).toContain('SmartPOS PTY');
    expect(page.textContent).not.toMatch(/{{|services\./);
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
      'Custom software for businesses in Panama.',
    );
    expect(page.querySelector('h1 .title-highlight')?.textContent).toBe('businesses in Panama');
    expect(page.querySelector('img')?.alt).toContain('Shared workspace');
    expect(document.documentElement.lang).toBe('en');
    expect(
      [...page.querySelectorAll('.project-status')].map((node) => node.textContent?.trim()),
    ).toEqual([
      'Published',
      'In development',
      'In development',
      'Not published',
      'Not published',
      'Not published',
    ]);
    expect(document.title).toContain('Tech Together');
    expect(document.querySelector('meta[name="description"]')?.getAttribute('content')).toContain(
      'We are Tech Together',
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
    expect(harness.routeNativeElement?.querySelector('h1')?.textContent).toContain(
      'Software a medida',
    );
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
    expect(links).toHaveLength(15);
    for (const link of links) {
      const url = new URL(link.href);
      expect(url.pathname).toBe('/50768702316');
      expect(url.searchParams.get('text')).toMatch(/^Hola, Tech Together\./);
    }
    expect(
      new Set(
        [...page.querySelectorAll<HTMLAnchorElement>('.service-card a')].map((link) => link.href),
      ).size,
    ).toBe(7);
    expect(page.querySelector('main')?.getAttribute('tabindex')).toBe('-1');
  });
});
