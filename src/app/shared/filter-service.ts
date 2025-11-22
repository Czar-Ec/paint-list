import { effect, inject, Injectable, signal } from '@angular/core';
import { ConfigService } from './config-service';
import { PaintRecord } from './list-objects';

@Injectable({
  providedIn: 'root',
})
export class FilterService {
  // Stores the complete list of paints for filtering operations.
  private _fullPaintList: PaintRecord[] = [];

  private filteredPaintList: PaintRecord[] = [];

  public filteredList$ = signal<PaintRecord[] | null>([]);

  public configService = inject(ConfigService);

  constructor() {
    effect(() => {
      this._fullPaintList = this.configService.allPaints$();
      this.filteredPaintList = this._fullPaintList;
      this.filteredList$.set(this.filteredPaintList);
    });
  }

  /**
   * Updates the filtered paint list based on the provided filter string.
   * @param filterStr
   */
  public updateFilter(filterStr: string) {
    if (!filterStr) {
      // if no filter string, reset to full list
      this.filteredPaintList = this._fullPaintList;
      this.filteredList$.set(this.filteredPaintList);
      return;
    }

    const lowerFilterStr = filterStr.toLowerCase();
    this.filteredPaintList = this._fullPaintList.filter((paint) => {
      const filter = lowerFilterStr; // already lowercase

      return (
        paint.name.toLowerCase().includes(filter) ||
        paint.set.toLowerCase().includes(filter) ||
        paint.brandId.toLowerCase().includes(filter)
      );
    });

    this.filteredList$.set(this.filteredPaintList);
  }
}
