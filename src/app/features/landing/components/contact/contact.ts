import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { ContactLink } from '../../../../shared/components/contact-link/contact-link';
@Component({
  selector: 'app-contact',
  imports: [TranslatePipe, ContactLink],
  templateUrl: './contact.html',
  styleUrl: './contact.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Contact {}
