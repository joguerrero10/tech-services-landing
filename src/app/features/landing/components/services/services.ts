import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { ContactLink } from '../../../../shared/components/contact-link/contact-link';
import { Icon } from '../../../../shared/components/icon/icon';
import { SERVICES } from '../../../../core/data/services.data';
@Component({
  selector: 'app-services',
  imports: [TranslatePipe, Icon, ContactLink],
  templateUrl: './services.html',
  styleUrl: './services.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Services {
  protected readonly items = SERVICES;
}
