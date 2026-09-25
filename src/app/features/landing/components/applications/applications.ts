import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { ContactLink } from '../../../../shared/components/contact-link/contact-link';
import { Icon } from '../../../../shared/components/icon/icon';
import { APPLICATIONS } from '../../../../core/data/applications.data';
@Component({
  selector: 'app-applications',
  imports: [TranslatePipe, Icon, ContactLink],
  templateUrl: './applications.html',
  styleUrl: './applications.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Applications {
  protected readonly items = APPLICATIONS;
}
