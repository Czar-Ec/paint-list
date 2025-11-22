import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { PaintRecord } from '../../shared/list-objects';
import { PaintBrand } from './paint-brand/paint-brand';

@Component({
  selector: 'app-paint-info',
  imports: [MatCardModule, MatChipsModule, PaintBrand
    // PaintTypeComponent
  ],
  templateUrl: './paint-info.html',
  styleUrl: './paint-info.scss',
})
export class PaintInfo {
  @Input() paint!: PaintRecord;
}
