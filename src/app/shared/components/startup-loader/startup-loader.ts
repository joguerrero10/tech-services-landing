import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { Icon } from '../icon/icon';

@Component({
  selector: 'app-startup-loader',
  imports: [TranslatePipe, Icon],
  templateUrl: './startup-loader.html',
  styleUrl: './startup-loader.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StartupLoader {}
