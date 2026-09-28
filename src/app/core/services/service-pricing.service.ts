import { inject, Injectable, makeStateKey, TransferState } from '@angular/core';
import { ServiceInterpolations, serviceInterpolations } from '../i18n/service-interpolations';

@Injectable({ providedIn: 'root' })
export class ServicePricing {
  private readonly state = inject(TransferState);

  forLocale(locale: string): ServiceInterpolations {
    const key = makeStateKey<ServiceInterpolations>(`service-pricing:${locale}`);
    if (this.state.hasKey(key)) return this.state.get(key, {} as ServiceInterpolations);
    const values = serviceInterpolations(locale);
    // Reuse server formatting during hydration, including ICU spacing/grouping differences.
    this.state.set(key, values);
    return values;
  }
}
