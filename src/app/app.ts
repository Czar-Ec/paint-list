import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit, signal } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { NgParticlesService, NgxParticlesModule } from '@tsparticles/angular';
import type { ISourceOptions } from '@tsparticles/engine';
import { loadSlim } from '@tsparticles/slim';
import { Filter } from './filter/filter';
import { ConfigService } from './shared/config-service';
import { PaintList } from './paint-list/paint-list';
import { ScreenService } from './shared/screen-service';

@Component({
  selector: 'app-root',
  imports: [NgxParticlesModule, MatCardModule, MatButtonModule, Filter, PaintList],
  templateUrl: './app.html',
  styleUrls: ['./app.scss', './font-override.scss'],
})
export class App implements OnInit {
  protected readonly title = signal('PaintList');

  public id = 'tsparticles';
  public particlesOptions: ISourceOptions | undefined;

  constructor(
    private readonly ngParticlesService: NgParticlesService,
    private readonly http: HttpClient,
    private cdr: ChangeDetectorRef,
    private readonly configService: ConfigService,
    private readonly screenService: ScreenService
  ) {
    this.configService.loadConfig('assets/config.json');
    this.configService.loadPaintBrandList('assets/paint-brands.json');
    this.configService.loadAllPaints();

    // Load particles JSON from assets
    this.http
      .get<ISourceOptions>(
        'https://raw.githubusercontent.com/Czar-Ec/Czar-Ec.github.io/refs/heads/develop/src/assets/particles/particles.json'
      )
      .subscribe((options) => {
        this.particlesOptions = options;
        // Initialize tsParticles engine
        this.ngParticlesService
          .init(async (engine) => {
            await loadSlim(engine);
          })
          .then(() => {
            // Trigger change detection to update the view
            this.cdr.detectChanges();
          });
      });
  }

  ngOnInit() {
    this.screenService.isMobile$.subscribe((isMobile) => {
      document.documentElement.classList.toggle('mobile-font-scale', isMobile);
    });
  }

  /**
   * Callback when particles are loaded
   * @param container
   */
  public particlesLoaded(container: any): void {
    // console.log('Particles container loaded:', container);
  }
}
