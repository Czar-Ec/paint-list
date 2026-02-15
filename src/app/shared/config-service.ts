import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { firstValueFrom, Observable, of } from 'rxjs';
import { Brand, Paint, PaintRecord } from './list-objects';
import { findCategory } from './utils';
@Injectable({
  providedIn: 'root',
})
export class ConfigService {
  private _config: any = {};

  private _paintBrandList: Brand[] = [];
  public paintBrandList$ = signal<Brand[]>([]);

  private _allPaints: Paint[] | null = null;
  public allPaints$ = signal<Paint[] | null>(null);

  get configuration() {
    if (!this._config) {
      throw new Error('Config not loaded yet!');
    }
    return this._config;
  }

  constructor(private http: HttpClient) {}

  /**
   * Loads configuration from the specified URL.
   * @param configUrl
   */
  public async loadConfig(configUrl: any): Promise<any> {
    return await firstValueFrom(this.http.get(configUrl)).then((res) => {
      this._config = res
      return res;
    })
  }

  /**
   * Load and merge multiple paint JSON files
   */
  public async loadAllPaints(): Promise<void> {
    const paintUrls = [
      'assets/dist/paints/army-painter.json',
      'assets/dist/paints/citadel.json',
      'assets/dist/paints/turbodork.json',
      'assets/dist/paints/two-thin-coats.json',
      'assets/dist/paints/vallejo.json',
    ];

    const allPaintArrays = await Promise.all(
      paintUrls.map((url) => firstValueFrom(this.http.get<PaintRecord[]>(url))),
    );

    this._allPaints = allPaintArrays.flat().map((paint) => ({
      id: paint.id,
      name: paint.name,
      code: paint.code == 'null' ? null : paint.code,
      set: paint.set,
      hex: paint.hex,
      paintBrand: this._paintBrandList.find((brand) => brand.brandId === paint.brandId)!,
      properties: {
        type: findCategory(this._config.paintTypeAltNames, paint.set) ?? 'OTHER',
      },
    }));

    // remove duplicates based on paint ID
    this._allPaints = Array.from(
      new Map(this._allPaints.flat().map((p) => [p.id, p])).values(),
    ).sort((a, b) => a.name.localeCompare(b.name));

    this.allPaints$.set(this._allPaints);
  }

  /**
   * Loads the list of paint brands from the provided endpoint.
   *
   * @param paintBrandList - The API endpoint or URL used to fetch the paint brand data.
   * @returns A promise that resolves once the paint brand list has been retrieved and stored.
   */
  public async loadPaintBrandList() {
    const res = await firstValueFrom(this.http.get<Brand[]>(this.configuration.paintBrandsJson));
    this._paintBrandList = res;
    this.paintBrandList$.set(this._paintBrandList);
  }
}
