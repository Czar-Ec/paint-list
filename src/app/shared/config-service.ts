import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { Brand, Paint, PaintType } from './list-objects';
@Injectable({
  providedIn: 'root',
})
export class ConfigService {
  private _config: any = {};

  private _paintBrandList: Brand[] = [];

  private _paintList: Paint[] = [];
  public paintList$ = signal<Paint[]>([]);

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
   * Loads the list of paint brands from the provided endpoint.
   *
   * @param paintBrandList - The API endpoint or URL used to fetch the paint brand data.
   * @returns A promise that resolves once the paint brand list has been retrieved and stored.
   */
  public async loadPaintBrandList(paintBrandList: any) {
    const res = await firstValueFrom(this.http.get<Brand[]>(paintBrandList));
    this._paintBrandList = res;
  }

  /**
   * Loads the list of paints from the provided endpoint and maps the returned
   * data into the internal `Paint` model. Converts string paint type values into
   * the corresponding `PaintType` enum, resolves brand references, and stores the
   * processed result.
   *
   * @param paintList - URL or endpoint pointing to the paint data.
   * @returns A promise that resolves once the paint list has been stored.
   */
  public async loadPaintList(paintList: any) {
    const res = await firstValueFrom(this.http.get<any[]>(paintList));
    this._paintList = res.map(
      (el) =>
        ({
          paintId: el.paintId,
          paintName: el.paintName,
          paintType: el.paintType as PaintType,
          approximateColour: el.approximateColour,
          numInInventory: el.numInInventory,
          tags: el.tags,
          refImage: el.refImage,
          paintBrand: this._paintBrandList.find((brand) => brand.brandId == el.paintBrand),
        } as Paint)
    );

    this.paintList$.set(this._paintList);
  }
}
