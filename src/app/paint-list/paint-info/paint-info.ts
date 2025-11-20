import { Component, Input } from '@angular/core';
import { Paint } from '../../shared/list-objects';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { PaintTypeComponent } from './paint-type/paint-type';

@Component({
  selector: 'app-paint-info',
  imports: [MatCardModule, MatChipsModule, PaintTypeComponent],
  templateUrl: './paint-info.html',
  styleUrl: './paint-info.scss',
})
export class PaintInfo {
  @Input() paint!: Paint;
}
