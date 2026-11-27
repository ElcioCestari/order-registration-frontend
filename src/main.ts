import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

// assets/config.json is written by the Docker image at startup (see docker/40-runtime-config.sh)
// and overrides the build-time environment. When it is missing (e.g. `ng serve`), the
// environment file is used as is.
fetch('assets/config.json', { cache: 'no-store' })
  .then(response => (response.ok ? response.json() : {}))
  .catch(() => ({}))
  .then(config => Object.assign(environment, config))
  .then(() => platformBrowserDynamic().bootstrapModule(AppModule))
  .catch(err => console.error(err));
