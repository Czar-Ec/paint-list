import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit, signal } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button'
import { NgParticlesService, NgxParticlesModule } from '@tsparticles/angular';
import type { ISourceOptions } from '@tsparticles/engine';
import { loadSlim } from '@tsparticles/slim';

@Component({
  selector: 'app-root',
  imports: [NgxParticlesModule, MatCardModule, MatButtonModule],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App implements OnInit {
  protected readonly title = signal('PaintList');

  public id = 'tsparticles';
  public particlesOptions: ISourceOptions | undefined;

  constructor(
    private readonly ngParticlesService: NgParticlesService,
    private readonly http: HttpClient,
    private cdr: ChangeDetectorRef
  ) {
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

  ngOnInit() {}

  /**
   * Callback when particles are loaded
   * @param container
   */
  public particlesLoaded(container: any): void {
    // console.log('Particles container loaded:', container);
  }
}
