import { Component, Input } from '@angular/core';
import { PaintType } from '../../../shared/list-objects';
import { MatChipsModule } from '@angular/material/chips';

@Component({
  selector: 'app-paint-type',
  imports: [MatChipsModule],
  templateUrl: './paint-type.html',
  styleUrl: './paint-type.scss',
})
export class PaintTypeComponent {
  @Input() paintType!: PaintType

  PaintType = PaintType
}
