import { ScrollReveal } from '../../../../shared/directives/scroll-reveal';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { PROCESS_STEPS } from '../../../../core/data/process.data';
@Component({
  selector: 'app-process',
  imports: [ScrollReveal, TranslatePipe],
  templateUrl: './process.html',
  styleUrl: './process.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Process {
  protected readonly items = PROCESS_STEPS;
}
