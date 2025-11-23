export interface PaintRecord {
  id: string;
  name: string;
  code: string | null;
  set: string;
  hex: string;
  brandId: string;
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

export interface Paint {
  id: string;
  name: string;
  code: string | null;
  set: string;
  hex: string;
  paintBrand: Brand;
  properties?: any;
}

export interface PaintProperties {
  type: PaintType;
}