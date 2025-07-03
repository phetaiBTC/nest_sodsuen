import { Module } from '@nestjs/common';
import { ProductUnitsService } from './product_units.service';
import { ProductUnitsController } from './product_units.controller';
import { Type } from 'class-transformer';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductUnit } from './entities/product_unit.entity';
import { Unit } from '../units/entities/unit.entity';
import { Product } from '../products/entities/product.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ProductUnit, Product, Unit])],
  controllers: [ProductUnitsController],
  providers: [ProductUnitsService],
})
export class ProductUnitsModule {}
