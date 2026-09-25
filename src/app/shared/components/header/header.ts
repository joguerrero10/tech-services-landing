import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { Icon } from '../icon/icon';
import { LanguageSelector } from '../language-selector/language-selector';
import { NAVIGATION } from '../../../core/data/navigation.data';
@Component({
  selector: 'app-header',
  imports: [TranslatePipe, Icon, LanguageSelector],
  templateUrl: './header.html',
  styleUrl: './header.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Header {
  protected readonly navigation = NAVIGATION;
  protected readonly menuOpen = signal(false);

  protected closeOnEscape(toggle: HTMLButtonElement, event: Event): void {
    if (!this.menuOpen()) return;
    this.menuOpen.set(false);
    toggle.focus();
    event.stopPropagation();
  }
}
