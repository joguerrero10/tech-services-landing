import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';
import { startStartupIndicator } from './app/core/startup/startup-indicator';

const startup = startStartupIndicator(document);
bootstrapApplication(App, appConfig)
  .then(async (application) => {
    await application.whenStable();
    startup.ready();
  })
  .catch((error: unknown) => {
    startup.fail();
    console.error(error);
  });
