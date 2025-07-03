import { IsNumber, IsOptional, IsString, IsBoolean } from 'class-validator';

export class CreateProductUnitDto {
  @IsNumber()
  product_id: number;

  @IsNumber()
  unit_id: number;

  @IsNumber()
  conversion_rate: number;

  @IsNumber()
  @IsOptional()
  cost_per_unit?: number;

  @IsNumber()
  @IsOptional()
  selling_price?: number;

  @IsString()
  @IsOptional()
  barcode?: string;

  @IsBoolean()
  @IsOptional()
  is_default?: boolean;

  @IsBoolean()
  @IsOptional()
  is_active?: boolean;
}
