// src/products/dto/create-product.dto.ts

import {
  IsString,
  IsNumber,
  IsOptional,
  IsBoolean,
  IsArray,
  ValidateNested,
  IsEmpty,
} from 'class-validator';
import { Type } from 'class-transformer';
import { CreateProductUnitDto } from '../../product_units/dto/create-product_unit.dto'; // ปรับ path ให้ถูก
import { IsNotEmpty } from 'class-validator';

export class CreateProductDto {
  @IsEmpty()
  product_code: string;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsNumber()
  @IsNotEmpty()
  category_id: number;

  @IsNumber()
  @IsNotEmpty()
  base_unit_id: number;

  @IsNumber()
  @IsNotEmpty()
  base_cost: number;

  @IsNumber()
  @IsNotEmpty()
  base_price: number;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  barcode?: string;

//   @IsString()
//   @IsOptional()
//   @IsNotEmpty()
//   sku?: string;

  @IsNumber()
  @IsOptional()
  @IsNotEmpty()
  min_stock_level?: number;

  @IsNumber()
  @IsOptional()
  @IsNotEmpty()
  max_stock_level?: number;

  @IsNumber()
  @IsOptional()
  @IsNotEmpty()
  reorder_point?: number;

  @IsBoolean()
  @IsOptional()
  @IsNotEmpty()
  is_active?: boolean;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateProductUnitDto)
  units: CreateProductUnitDto[];
}
