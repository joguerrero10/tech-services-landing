import type { ContactInquiry } from '../../../core/data/contact-inquiry';
import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { Icon } from '../icon/icon';
import { ContactService } from '../../../core/services/contact.service';
import type { TranslationKey } from '../../../core/i18n/translation.model';
@Component({
  selector: 'app-contact-link',
  imports: [TranslatePipe, Icon],
  templateUrl: './contact-link.html',
  styleUrl: './contact-link.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactLink {
  protected readonly contact = inject(ContactService);
  readonly label = input<TranslationKey>('contact.whatsapp');
  readonly inquiry = input<ContactInquiry>({ kind: 'general' });
  protected readonly state = computed(() => this.contact.link(this.inquiry()));
  readonly accessibleLabel = input<TranslationKey>();
  readonly variant = input<'primary' | 'light' | 'text'>('text');
}
