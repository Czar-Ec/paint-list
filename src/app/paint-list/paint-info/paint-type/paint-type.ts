import { Component, inject, Input, OnInit } from '@angular/core';
import { MatChipsModule } from '@angular/material/chips';
import { PaintType } from '../../../shared/list-objects';
import { PaintTypeCategory } from './paint-type-category';

@Component({
  selector: 'app-paint-type',
  imports: [MatChipsModule],
  templateUrl: './paint-type.html',
  styleUrl: './paint-type.scss',
})
export class PaintTypeComponent implements OnInit {
  @Input() set!: string

  PaintType = PaintType

  public paintType = PaintType.OTHER;

  private readonly paintTypeCategoryService = inject(PaintTypeCategory);

  ngOnInit() {
    this.paintType = this.paintTypeCategoryService.findCategory(this.set) as PaintType;

    if (!this.paintType) {
      this.paintType = PaintType.OTHER;
    }
  }
}
