import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { ContactLink } from '../../../../shared/components/contact-link/contact-link';
import { Icon } from '../../../../shared/components/icon/icon';
@Component({
  selector: 'app-hero',
  imports: [TranslatePipe, Icon, ContactLink],
  templateUrl: './hero.html',
  styleUrl: './hero.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Hero {}
