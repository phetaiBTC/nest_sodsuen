// src/products/dto/product-query.dto.ts
import { IsOptional, IsString, IsNumberString } from 'class-validator';
import { extend } from 'dayjs';
import e from 'express';
import { BestQueryDto } from 'src/common/dto/pagination.search.dto';

export class ProductQueryDto extends BestQueryDto {
  @IsOptional()
  @IsNumberString()
  category_id?: string;

  @IsOptional()
  @IsString()
  is_active?: string;
}
