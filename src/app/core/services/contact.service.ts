import { inject, Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { PUBLIC_SITE_CONFIG } from '../config/site.config';
import { ContactInquiry, SERVICE_MESSAGES } from '../data/contact-inquiry';
import type { TranslationKey } from '../i18n/translation.model';
import { CONTACT_CONFIG } from '../config/contact.config';

export type ContactLinkState =
  | { readonly status: 'available'; readonly url: string }
  | { readonly status: 'unconfigured' | 'invalid'; readonly explanation: TranslationKey };

@Injectable({ providedIn: 'root' })
export class ContactService {
  private readonly config = inject(CONTACT_CONFIG);
  private readonly site = inject(PUBLIC_SITE_CONFIG);
  private readonly translate = inject(TranslateService);
  readonly status =
    this.config.whatsappNumber === null
      ? 'unconfigured'
      : /^[1-9]\d{7,14}$/.test(this.config.whatsappNumber)
        ? 'available'
        : 'invalid';

  link(inquiry: ContactInquiry): ContactLinkState {
    // Register the active dictionary as a dependency for computed component links.
    this.translate.currentLang();
    if (this.status !== 'available')
      return {
        status: this.status,
        explanation:
          this.status === 'unconfigured' ? 'contact.pending' : 'errors.contactUnavailable',
      };
    let message: string;
    switch (inquiry.kind) {
      case 'general':
        message = this.translate.instant('whatsapp.general');
        break;
      case 'service':
        message = this.translate.instant(SERVICE_MESSAGES[inquiry.serviceId]);
        break;
      case 'product':
        message = this.translate.instant('whatsapp.application', {
          productName: this.translate.instant(this.site.products[inquiry.productId].nameKey),
        });
        break;
    }
    return { status: 'available', url: this.whatsappUrl(message)! };
  }

  whatsappUrl(message: string): string | null {
    const number = this.config.whatsappNumber;
    if (number === null) return null;
    if (!/^[1-9]\d{7,14}$/.test(number))
      throw new Error('WhatsApp number must contain 8–15 international digits, without +.');
    return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
  }
}
