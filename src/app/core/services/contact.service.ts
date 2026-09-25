import { inject, Injectable } from '@angular/core';
import { CONTACT_CONFIG } from '../config/contact.config';

@Injectable({ providedIn: 'root' })
export class ContactService {
  private readonly config = inject(CONTACT_CONFIG);
  whatsappUrl(message: string): string | null {
    const number = this.config.whatsappNumber;
    if (number === null) return null;
    if (!/^[1-9]\d{7,14}$/.test(number))
      throw new Error('WhatsApp number must contain 8–15 international digits, without +.');
    return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
  }
}
