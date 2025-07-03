import { PartialType } from '@nestjs/mapped-types';
import { CreateProductUnitDto } from './create-product_unit.dto';

export class UpdateProductUnitDto extends PartialType(CreateProductUnitDto) {}
