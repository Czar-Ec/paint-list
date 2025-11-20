import { effect, inject, Injectable, signal } from '@angular/core';
import { Paint } from './list-objects';
import { ConfigService } from './config-service';

@Injectable({
  providedIn: 'root',
})
export class FilterService {
  // Stores the complete list of paints for filtering operations.
  private _fullPaintList: Paint[] = [];

  private filteredPaintList: Paint[] = [];

  public filteredList$ = signal<Paint[]>([]);

  public configService = inject(ConfigService);

  constructor() {
    effect(() => {
      this._fullPaintList = this.configService.paintList$();
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
        paint.paintName.toLowerCase().includes(filter) ||
        paint.paintType.toLowerCase().includes(filter) ||
        paint.tags.some((tag) => tag.toLowerCase().includes(filter)) ||
        paint.numInInventory.toString().includes(filter) ||
        (paint.notes?.toLowerCase().includes(filter) ?? false) ||
        paint.paintBrand.brandName.toLowerCase().includes(filter)
      );
    });

    this.filteredList$.set(this.filteredPaintList);
  }
}
