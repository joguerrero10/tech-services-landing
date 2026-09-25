import { TestBed } from '@angular/core/testing';
import { RouterTestingHarness } from '@angular/router/testing';
import { appConfig } from './app.config';
import { LanguageService } from './core/services/language.service';
import { Landing } from './features/landing/landing';

describe('Landing route', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({ providers: appConfig.providers }).compileComponents();
    await TestBed.inject(LanguageService).initialize();
  });

  it('loads the landing and redirects unknown paths to it', async () => {
    const harness = await RouterTestingHarness.create();
    await harness.navigateByUrl('/', Landing);
    expect(harness.routeNativeElement?.querySelector('h1')?.textContent).toContain('Tecnología');
    await harness.navigateByUrl('/unknown', Landing);
    expect(harness.routeNativeElement?.querySelectorAll('.service-card')).toHaveLength(4);
  });
});
