import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import type { IconName } from '../../../core/data/icons.data';

@Component({
  selector: 'app-icon',
  imports: [],
  templateUrl: './icon.html',
  styleUrl: './icon.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Icon {
  readonly name = input.required<IconName>();
}
