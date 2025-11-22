import { CommonModule } from '@angular/common';
import { Component, computed, inject, Signal } from '@angular/core';
import { FilterService } from '../shared/filter-service';
import { PaintRecord } from '../shared/list-objects';
import { PaintInfo } from './paint-info/paint-info';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-paint-list',
  imports: [CommonModule, PaintInfo, MatProgressSpinnerModule],
  templateUrl: './paint-list.html',
  styleUrl: './paint-list.scss',
})
export class PaintList {
  paintList: Signal<PaintRecord[] | null>;

  private readonly filterService = inject(FilterService);

  public isLoading: Signal<boolean>;

  constructor() {
    this.paintList = this.filterService.filteredList$;
    this.isLoading = computed(() => this.paintList() === null);
  }
}
