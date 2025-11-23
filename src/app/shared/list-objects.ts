export interface PaintRecord {
  id: string;
  name: string;
  code: string | null;
  set: string;
  hex: string;
  brandId: string;
  properties?: any;
}

export interface Brand {
  brandId: string;
  brandName: string;
  brandImageUrl: string;
  brandUrl: string;
}

export enum PaintType {
  PRIMER = 'PRIMER',
  AIR='AIR',
  BASE = 'BASE',
  CONTRAST = 'CONTRAST',
  LAYER = 'LAYER',
  SHADE = 'SHADE',
  TECHNICAL = 'TECHNICAL',
  METALLIC = 'METALLIC',
  COLOUR_SHIFT = 'COLOUR_SHIFT',
  OTHER = 'OTHER'
}

// export interface Paint {
//   paintId: string;
//   paintName: string;
//   paintType: PaintType;
//   approximateColour: string;
//   numInInventory: number;
//   tags: string[];
//   paintBrand: Brand;
//   refImage: string;
//   notes?: string;
// }