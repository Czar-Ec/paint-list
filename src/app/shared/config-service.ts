import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { Brand, PaintRecord } from './list-objects';
@Injectable({
  providedIn: 'root',
})
export class ConfigService {
  private _config: any = {};

  private _paintBrandList: Brand[] = [];
  public paintBrandList$ = signal<Brand[]>([]);

  private _allPaints: PaintRecord[] = [];
  public allPaints$ = signal<PaintRecord[]>([]);

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
  public async loadConfig(configUrl: any) {
    const config = await firstValueFrom(this.http.get(configUrl));
    this._config = config;
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
      paintUrls.map((url) => firstValueFrom(this.http.get<PaintRecord[]>(url)))
    );

    this._allPaints = allPaintArrays.flat().map((paint) => ({
      id: paint.id,
      name: paint.name,
      code: paint.code,
      set: paint.set,
      hex: paint.hex,
      brandId: paint.brandId,
    }));

    // remove duplicates based on paint ID
    this._allPaints = Array.from(new Map(allPaintArrays.flat().map((p) => [p.id, p])).values());

    this.allPaints$.set(this._allPaints);
  }

  /**
   * Loads the list of paint brands from the provided endpoint.
   *
   * @param paintBrandList - The API endpoint or URL used to fetch the paint brand data.
   * @returns A promise that resolves once the paint brand list has been retrieved and stored.
   */
  public async loadPaintBrandList(paintBrandList: any) {
    const res = await firstValueFrom(this.http.get<Brand[]>(paintBrandList));
    this._paintBrandList = res;
    this.paintBrandList$.set(this._paintBrandList);
  }
}
