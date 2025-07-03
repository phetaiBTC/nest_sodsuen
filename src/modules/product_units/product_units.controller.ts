import { Controller, Post, Body, Get, Param, Put, Delete } from '@nestjs/common';
import { ProductUnitsService } from './product_units.service';
import { CreateProductUnitDto } from './dto/create-product_unit.dto';
import { UpdateProductUnitDto } from './dto/update-product_unit.dto';

@Controller('product-units')
export class ProductUnitsController {
  constructor(private readonly productUnitService: ProductUnitsService) {}

  @Post()
  create(@Body() dto: CreateProductUnitDto) {
    return this.productUnitService.create(dto);
  }

  @Get()
  findAll() {
    return this.productUnitService.findAll();
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
