import { Component, effect, inject, Input } from '@angular/core';
import { ConfigService } from '../../../shared/config-service';

@Component({
  selector: 'app-paint-brand',
  imports: [],
  templateUrl: './paint-brand.html',
  styleUrl: './paint-brand.scss',
})
export class PaintBrand {
  @Input() brandId!: string;

  public brandImageUrl: string = '';
  public brandUrl: string = '';

  private readonly configService = inject(ConfigService);

  constructor() {
    effect(() => {
      const brandList = this.configService.paintBrandList$();
      const brand = brandList.find((b) => b.brandId === this.brandId);
      if (brand) {
        this.brandImageUrl = brand.brandImageUrl;
        this.brandUrl = brand.brandUrl;
      } else {
        this.brandImageUrl = '';
        this.brandUrl = '';
      }
    });
  }
}
