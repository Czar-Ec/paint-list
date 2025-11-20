import { Component, effect, inject, Signal } from '@angular/core';
import { ConfigService } from '../shared/config-service';
import { Paint } from '../shared/list-objects';
import { CommonModule } from '@angular/common';
import { PaintInfo } from './paint-info/paint-info';
import { FilterService } from '../shared/filter-service';

@Component({
  selector: 'app-paint-list',
  imports: [CommonModule, PaintInfo],
  templateUrl: './paint-list.html',
  styleUrl: './paint-list.scss',
})
export class PaintList {
  paintList: Signal<Paint[]>;

  private readonly filterService = inject(FilterService);

  constructor() {
    this.paintList = this.filterService.filteredList$;
  }
}
