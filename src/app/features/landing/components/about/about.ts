import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { ScrollReveal } from '../../../../shared/directives/scroll-reveal';
import { TECHNOLOGIES, VALUES } from '../../../../core/data/about.data';
import { SITE_CONFIG } from '../../../../core/config/site.config';

@Component({
  selector: 'app-about',
  imports: [TranslatePipe, ScrollReveal],
  templateUrl: './about.html',
  styleUrl: './about.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class About {
  protected readonly technologies = TECHNOLOGIES;
  protected readonly values = VALUES;
  protected readonly instagramUrl = SITE_CONFIG.instagramUrl;
}
