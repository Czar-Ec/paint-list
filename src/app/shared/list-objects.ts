export interface Brand {
  brandId: string;
  brandName: string;
  brandImageUrl: string;
  brandUrl: string;
}

export enum PaintType {
  PRIMER = 'PRIMER',
  BASE = 'BASE',
  CONTRAST = 'CONTRAST',
  LAYER = 'LAYER',
  SHADE = 'SHADE',
  TECHNICAL = 'TECHNICAL',
  METALLIC = 'METALLIC',
  COLOUR_SHIFT = 'COLOUR SHIFT',
  OTHER = 'OTHER'
}

export interface Paint {
  paintId: string;
  paintName: string;
  paintType: PaintType;
  approximateColour: string;
  numInInventory: number;
  tags: string[];
  paintBrand: Brand;
  refImage: string;
}