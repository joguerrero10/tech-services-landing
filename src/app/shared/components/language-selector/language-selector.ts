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
}
