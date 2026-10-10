import { ChangeDetectionStrategy, Component, DOCUMENT, inject } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { Icon } from '../icon/icon';
import { STARTUP_SKIP_EVENT } from '../../../core/startup/startup-indicator';

@Component({
  selector: 'app-startup-loader',
  imports: [TranslatePipe, Icon],
  templateUrl: './startup-loader.html',
  styleUrl: './startup-loader.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StartupLoader {
  private readonly document = inject(DOCUMENT);

  skip(): void {
    this.document.dispatchEvent(new Event(STARTUP_SKIP_EVENT));
  }
}
