// src/products/dto/product-query.dto.ts
import { IsOptional, IsString, IsNumberString } from 'class-validator';
import { extend } from 'dayjs';
import e from 'express';
import { BestQueryDto } from 'src/common/dto/pagination.search.dto';

export class ProductUnitQueryDto extends BestQueryDto {
  @IsOptional()
  product_id?: number;

  @IsOptional()
  unit_id?: number;
}
