// src/product_units/dto/product-unit-list.dto.ts
export class ProductUnitListDto {
  id: number;
  product_id: number;
  product: any;
  unit_id: number;
  unit: any;
  conversion_rate: number;
  cost_per_unit: number;
  selling_price: number;
  barcode: string;
  is_default: boolean;
  is_active: boolean;
  createdAt: string;
  updatedAt: string;
}
