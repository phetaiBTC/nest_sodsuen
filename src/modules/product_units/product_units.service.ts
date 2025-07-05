import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductUnit } from './entities/product_unit.entity';
import { CreateProductUnitDto } from './dto/create-product_unit.dto';
import { Product } from '../products/entities/product.entity';
import { Unit } from '../units/entities/unit.entity';
import { UpdateProductUnitDto } from './dto/update-product_unit.dto';
import { ProductQueryDto } from '../products/dto/best.query.dto';
import { ProductUnitQueryDto } from './dto/ProductUnitQueryDto';
import { paginateQueryBuilder } from 'src/common/pagination/pagination.builder';
import { PaginationReponse } from 'src/common/pagination/pagination.reponse';
import { mapProductUnitToDto } from './mapper/product-unit.mapper';
import { ProductListDto } from '../products/dto/product-list.dto';
import { ProductUnitListDto } from './dto/product-unit-list.dto';

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
    if (!dto.product_id) {
      throw new NotFoundException('Product ID is required');
    }
    const is_product = await this.productRepo.findOne({
      where: { product_id: dto.product_id },
    });
    if (!is_product) {
      throw new NotFoundException(
        `Product with ID ${dto.product_id} not found`,
      );
    }

    const is_unit = await this.unitRepo.findOne({ where: { id: dto.unit_id } });
    if (!is_unit) {
      throw new NotFoundException(`Unit with ID ${dto.unit_id} not found`);
    }
    const duplicate = await this.productUnitRepo.findOne({
      where: {
        product_id: dto.product_id,
        unit_id: dto.unit_id,
        is_active: true,
      },
    });

    if (duplicate) {
      throw new ConflictException('This unit already exists for the product.');
    }
    if (dto.is_default) {
      await this.productUnitRepo.update(
        { product_id: dto.product_id, is_default: true },
        { is_default: false },
      );
    }

    const newUnit = this.productUnitRepo.create(dto);
    const withRelations = await this.productUnitRepo.save(newUnit);
    return mapProductUnitToDto(withRelations);
  }

  async findAll(
    page: number,
    limit: number,
    query: ProductUnitQueryDto,
  ): Promise<PaginationReponse<ProductUnitListDto>> {
    const queryBuilder = this.productUnitRepo
      .createQueryBuilder('product_unit')
      .leftJoinAndSelect('product_unit.unit', 'unit')
      .leftJoinAndSelect('product_unit.product', 'product');

    if (query.search) {
      queryBuilder.andWhere(
        `(product_unit.barcode LIKE :search OR unit.name LIKE :search OR product.name LIKE :search)`,
        { search: `%${query.search}%` },
      );
    }

    if (query.product_id) {
      queryBuilder.andWhere('product_unit.product_id = :product_id', {
        product_id: query.product_id,
      });
    }

    if (query.unit_id) {
      queryBuilder.andWhere('product_unit.unit_id = :unit_id', {
        unit_id: query.unit_id,
      });
    }

    const { data: units, pagination } = await paginateQueryBuilder(
      queryBuilder,
      page,
      limit,
    );
    const mapped: ProductUnitListDto[] = units.map(mapProductUnitToDto);

    return { data: mapped, pagination };
  }

  async findOne(id: number) {
    const result = await this.productUnitRepo.findOne({
      where: { id },
      relations: ['unit', 'product'],
    });

    if (!result) {
      throw new NotFoundException(`Product unit with ID ${id} not found`);
    }
    const mapped = await mapProductUnitToDto(result);

    return mapped;
  }

  async update(id: number, dto: UpdateProductUnitDto) {
    const is_product = await this.productRepo.findOne({
      where: { product_id: dto.product_id },
    });
    if (!is_product) {
      throw new NotFoundException(
        `Product with ID ${dto.product_id} not found`,
      );
    }

    const is_unit = await this.unitRepo.findOne({ where: { id: dto.unit_id } });
    if (!is_unit) {
      throw new NotFoundException(`Unit with ID ${dto.unit_id} not found`);
    }
    const duplicateUnit = await this.productUnitRepo.findOne({
      where: { product_id: dto.product_id, unit_id: dto.unit_id },
    });

    if (duplicateUnit && duplicateUnit.id !== id) {
      throw new ConflictException(`Unit already exists for this product.`);
    }
    if (dto.is_default) {
      await this.productUnitRepo.update(
        { product_id: dto.product_id, is_default: true },
        { is_default: false },
      );
    }
    return this.productUnitRepo.update(id, dto);
  }

  async remove(id: number) {
    await this.productUnitRepo.delete(id);
    return { message: 'Product unit deleted successfully' };
  }
}
