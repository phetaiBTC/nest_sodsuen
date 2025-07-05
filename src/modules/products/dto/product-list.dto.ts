import { ProductUnit } from "src/modules/product_units/entities/product_unit.entity";

export interface ProductListDto {
  product_id: number;
  product_code: string;
  name: string;
  description: string;
  category: string;           
  base_unit: string;         
  base_cost: number;
  base_price: number;
  barcode: string;
  min_stock_level: number;
  max_stock_level: number;
  reorder_point: number;
  is_active: boolean;
  image: string;
  product_units: ProductUnit[];
  createdAt: string;
  updatedAt: string;
}
