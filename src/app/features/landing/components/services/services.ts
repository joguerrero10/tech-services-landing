import { ScrollReveal } from '../../../../shared/directives/scroll-reveal';
import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { ContactLink } from '../../../../shared/components/contact-link/contact-link';
import { Icon } from '../../../../shared/components/icon/icon';
import { LanguageService } from '../../../../core/services/language.service';
import { ServicePricing } from '../../../../core/services/service-pricing.service';
import { SERVICES } from '../../../../core/data/services.data';
@Component({
  selector: 'app-services',
  imports: [ScrollReveal, TranslatePipe, Icon, ContactLink],
  templateUrl: './services.html',
  styleUrl: './services.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Services {
  private readonly language = inject(LanguageService);
  private readonly pricing = inject(ServicePricing);
  protected readonly items = SERVICES;
  protected readonly parameters = computed(() => this.pricing.forLocale(this.language.locale()));
}
