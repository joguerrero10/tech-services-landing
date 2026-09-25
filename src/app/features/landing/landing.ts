import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Hero } from './components/hero/hero';
import { Services } from './components/services/services';
import { Applications } from './components/applications/applications';
import { Process } from './components/process/process';
import { Contact } from './components/contact/contact';
import { TranslatePipe } from '@ngx-translate/core';
import { Header } from '../../shared/components/header/header';
import { Footer } from '../../shared/components/footer/footer';
@Component({
  selector: 'app-landing',
  imports: [TranslatePipe, Header, Hero, Services, Applications, Process, Contact, Footer],
  templateUrl: './landing.html',
  styleUrl: './landing.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Landing {}
