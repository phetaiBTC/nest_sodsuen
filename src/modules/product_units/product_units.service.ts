import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductUnit } from './entities/product_unit.entity';
import { CreateProductUnitDto } from './dto/create-product_unit.dto';
import { Product } from '../products/entities/product.entity';
import { Unit } from '../units/entities/unit.entity';
import { UpdateProductUnitDto } from './dto/update-product_unit.dto';

@Injectable()
export class ProductUnitsService {
  constructor(
    @InjectRepository(ProductUnit)
    private readonly productUnitRepo: Repository<ProductUnit>,

    @InjectRepository(Product)
    private readonly productRepo: Repository<Product>,

    @InjectRepository(Unit)
    private readonly unitRepo: Repository<Unit>,
  ) {}

async create(dto: CreateProductUnitDto) {
    const is_product = await this.productRepo.findOne({ where: { product_id: dto.product_id } });
    if (!is_product) {
      throw new NotFoundException(`Product with ID ${dto.product_id} not found`);
    }

    const is_unit = await this.unitRepo.findOne({ where: { id: dto.unit_id } });
    if (!is_unit) {
      throw new NotFoundException(`Unit with ID ${dto.unit_id} not found`); 
    }

    const newUnit = this.productUnitRepo.create(dto);
    return this.productUnitRepo.save(newUnit);

}


  async findAll() {
    return await this.productUnitRepo.find({ relations: ['unit', 'product'] });
  }

  async findOne(id: number) {
    const result = await this.productUnitRepo.findOne({ where: { id }, relations: ['unit', 'product'] });
  
    if (!result) {
      throw new NotFoundException(`Product unit with ID ${id} not found`);
    }
  
    return result;
  }

  async update(id: number, dto: UpdateProductUnitDto) {
        const is_product = await this.productRepo.findOne({ where: { product_id: dto.product_id } });
    if (!is_product) {
      throw new NotFoundException(`Product with ID ${dto.product_id} not found`);
    }

    const is_unit = await this.unitRepo.findOne({ where: { id: dto.unit_id } });
    if (!is_unit) {
      throw new NotFoundException(`Unit with ID ${dto.unit_id} not found`); 
    }
    return this.productUnitRepo.update(id, dto);
  }

  async remove(id: number) {
    await this.productUnitRepo.delete(id);
    return { message: 'Product unit deleted successfully' };
  }
}
