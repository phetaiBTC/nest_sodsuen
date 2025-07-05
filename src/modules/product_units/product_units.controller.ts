import { Controller, Post, Body, Get, Param, Put, Delete, Query } from '@nestjs/common';
import { ProductUnitsService } from './product_units.service';
import { CreateProductUnitDto } from './dto/create-product_unit.dto';
import { UpdateProductUnitDto } from './dto/update-product_unit.dto';
import { ProductUnitQueryDto } from './dto/ProductUnitQueryDto';
import { PaginationReponse } from 'src/common/pagination/pagination.reponse';
import { ProductListDto } from '../products/dto/product-list.dto';
import { ProductUnitListDto } from './dto/product-unit-list.dto';

@Controller('product-units')
export class ProductUnitsController {
  constructor(private readonly productUnitService: ProductUnitsService) {}

  @Post()
  create(@Body() dto: CreateProductUnitDto) {
    return this.productUnitService.create(dto);
  }

  @Get()
  findAll(@Query() query: ProductUnitQueryDto,): Promise<PaginationReponse<ProductUnitListDto>> {
    return this.productUnitService.findAll(+query.page, +query.limit, query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productUnitService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: UpdateProductUnitDto) {
    return this.productUnitService.update(+id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productUnitService.remove(+id);
  }
}
