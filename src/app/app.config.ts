import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideZonelessChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { ConfigService } from './shared/config-service';
import { PAINT_TYPE_CONFIG } from './shared/app.tokens';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(routes),
    provideClientHydration(withEventReplay()),
    provideHttpClient(withFetch()),
    ConfigService,
    {
      provide: PAINT_TYPE_CONFIG,
      useFactory: (configService: ConfigService) => {
        return configService.configuration.paintTypeAltNames;
      },
      deps: [ConfigService],
    }
  ],
};
