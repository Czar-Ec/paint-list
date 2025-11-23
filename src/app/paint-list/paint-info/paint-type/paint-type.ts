import { Component, Input } from '@angular/core';
import { MatChipsModule } from '@angular/material/chips';
import { PaintType } from '../../../shared/list-objects';

@Component({
  selector: 'app-paint-type',
  imports: [MatChipsModule],
  templateUrl: './paint-type.html',
  styleUrl: './paint-type.scss',
})
export class PaintTypeComponent {
  @Input() paintType!: PaintType;

  public PaintType = PaintType;
}
