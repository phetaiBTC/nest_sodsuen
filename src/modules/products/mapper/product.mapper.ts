// src/products/mapper/product.mapper.ts
import { Product } from '../entities/product.entity';
import { ProductListDto } from '../dto/product-list.dto';
import { formatTimeUtil } from 'src/common/util/formatTime.util';

export function mapProductToDto(product: Product): ProductListDto {
  return {
    product_id: product.product_id,
    product_code: product.product_code,
    name: product.name,
    description: product.description,
    category: product.category?.name,
    base_unit: product.base_unit?.name,
    base_cost: product.base_cost,
    base_price: product.base_price,
    barcode: product.barcode,
    min_stock_level: product.min_stock_level,
    max_stock_level: product.max_stock_level,
    reorder_point: product.reorder_point,
    is_active: product.is_active,
    image: product.image,
    product_units: product.product_units.map((unit) => ({
      ...unit,
      product: unit.product,
      unit: unit.unit,
    })),
    createdAt: formatTimeUtil(product.createdAt),
    updatedAt: formatTimeUtil(product.updatedAt),
  };
}
