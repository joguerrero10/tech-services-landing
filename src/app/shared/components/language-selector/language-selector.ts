import { SITE_CONFIG } from '../../../core/config/site.config';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { LanguageService } from '../../../core/services/language.service';
@Component({
  selector: 'app-language-selector',
  imports: [TranslatePipe],
  templateUrl: './language-selector.html',
  styleUrl: './language-selector.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LanguageSelector {
  protected readonly language = inject(LanguageService);
  protected readonly locales = SITE_CONFIG.supportedLocales.map((value) => ({
    value,
    label: SITE_CONFIG.locales[value].labelKey,
  }));

  protected async selectLanguage(select: HTMLSelectElement): Promise<void> {
    await this.language.changeLanguage(select.value);
    select.value = this.language.language();
  }
}
