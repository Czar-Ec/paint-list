import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-paint-brand',
  imports: [],
  templateUrl: './paint-brand.html',
  styleUrl: './paint-brand.scss',
})
export class PaintBrand {
  @Input() brandImageUrl!: string;
  @Input() brandUrl!: string;
}
