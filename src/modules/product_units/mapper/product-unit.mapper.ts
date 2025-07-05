// src/product_units/mapper/product-unit.mapper.ts
import { ProductUnit } from '../entities/product_unit.entity';
import { ProductUnitListDto } from '../dto/product-unit-list.dto';
import { formatTimeUtil } from 'src/common/util/formatTime.util';

export function mapProductUnitToDto(unit: ProductUnit): ProductUnitListDto {
return {
  id: unit.id,
  product_id: unit.product_id,
  product: unit.product,
  unit_id: unit.unit_id,
  unit: unit.unit,
  conversion_rate: unit.conversion_rate,
  cost_per_unit: unit.cost_per_unit,
  selling_price: unit.selling_price,
  barcode: unit.barcode,
  is_default: unit.is_default,
  is_active: unit.is_active,
  createdAt: formatTimeUtil(unit.createdAt),
  updatedAt: formatTimeUtil(unit.updatedAt),

};
}
