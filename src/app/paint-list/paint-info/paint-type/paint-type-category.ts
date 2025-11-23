import { inject, Injectable, signal } from '@angular/core';
import { PAINT_TYPE_CONFIG } from '../../../shared/app.tokens';

@Injectable({
  providedIn: 'root',
})
export class PaintTypeCategory {
  private readonly PAINT_TYPE_CONFIG = inject(PAINT_TYPE_CONFIG);
  private categories = signal<Record<string, Set<string>>>({});

  public categories$ = this.categories.asReadonly();

  // lookup table mapping set names to paint type categories
  private lookup: Record<string, Set<string>> | null = null;

  constructor() {
    this.lookup = this.buildLookup(this.PAINT_TYPE_CONFIG);
    this.categories.set(this.lookup);
  }

  private buildLookup(data: Array<Record<string, string[]>>) {
    this.lookup = {};

    for (const obj of data) {
      const key = Object.keys(obj)[0]; // category name
      this.lookup[key] = new Set(obj[key]); // convert array → Set
    }

    return this.lookup;
  }

  findCategory(value: string): string | null {
    const map = this.categories();
    for (const [category, set] of Object.entries(map)) {
      if (set.has(value)) return category;
    }
    return null;
  }
}
