import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { Product } from './entities/product.entity';
import { ProductUnit } from '../product_units/entities/product_unit.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { TRANSACTION_MANAGER_SERVICE } from 'src/common/constants/inject-key';
import { TransactionManagerService } from 'src/common/transation/transition.service';
import { UpdateProductDto } from './dto/update-product.dto';
import { compressAndSaveImage } from 'src/common/util/compressAndSaveImage.util';
import { formatTimeUtil } from 'src/common/util/formatTime.util';
import { paginateQueryBuilder } from 'src/common/pagination/pagination.builder';
import { PaginationReponse } from 'src/common/pagination/pagination.reponse';
import { ProductListDto } from './dto/product-list.dto';
import { mapProductToDto } from './mapper/product.mapper';
import { ProductQueryDto } from './dto/best.query.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,

    @InjectRepository(ProductUnit)
    private productUnitRepository: Repository<ProductUnit>,

    private dataSource: DataSource,

    @Inject(TRANSACTION_MANAGER_SERVICE)
    private transactionManager: TransactionManagerService,
  ) {}

  async create(createProductDto: CreateProductDto) {
    const { units, ...productData } = createProductDto;

    return this.transactionManager.runInTransaction(
      this.dataSource,
      async (manager) => {
        // const filename = await compressAndSaveImage(
        //   image.buffer,
        //   image.originalname,
        // );
        const lastProduct = await manager.findOne(Product, {
          where: {},
          order: { createdAt: 'DESC' },
        });

        let generatedCode = 'P001';
        // let generatedSku = 'P0001';
        if (lastProduct) {
          console.log('id of last product', lastProduct);
          const lastProductCode = lastProduct.product_code;
          const lastProductNumber = parseInt(lastProductCode.slice(1), 10);
          const newProductNumber = lastProductNumber + 1;

          const paddedCode = newProductNumber.toString().padStart(3, '0');
          generatedCode = `P${paddedCode}`;
          console.log('id of new product', generatedCode);
        }

        let productExists = await manager.findOne(Product, {
          where: { product_code: generatedCode },
        });

        while (productExists) {
          const newProductNumber = parseInt(generatedCode.slice(1), 10) + 1;
          const paddedCode = newProductNumber.toString().padStart(3, '0');
          generatedCode = `P${paddedCode}`;
          productExists = await manager.findOne(Product, {
            where: { product_code: generatedCode },
          });
        }

        const product = manager.create(Product, {
          ...productData,
          product_code: generatedCode,
          // image: filename,
        });
        const savedProduct = await manager.save(product);
        let productUnits: ProductUnit[] = [];
        if (units && units.length > 0) {
          productUnits = units.map((unit) =>
            manager.create(ProductUnit, {
              ...unit,
              // product,
              product_id: savedProduct.product_id,
            }),
          );

          await manager.save(ProductUnit, productUnits);
        }

        return {
          ...savedProduct,
          product_units: productUnits,

          createdAt: formatTimeUtil(savedProduct.createdAt),
          updatedAt: formatTimeUtil(savedProduct.updatedAt),
        };
      },
    );
  }

  async findAll(
    page: number,
    limit: number,
    query: ProductQueryDto,
  ): Promise<PaginationReponse<ProductListDto>> {

    const queryBuilder = this.productRepository
      .createQueryBuilder('product')
      .leftJoinAndSelect('product.category', 'category')
      .leftJoinAndSelect('product.base_unit', 'base_unit')
      .leftJoinAndSelect('product.product_units', 'product_units')
      // .leftJoinAndSelect('product_units.product', 'unit_product')
      .leftJoinAndSelect('product_units.unit', 'unit');

    if (query.search) {
      queryBuilder.andWhere(
        `(product.name LIKE :search OR product.product_code LIKE :search OR category.name LIKE :search)`,
        { search: `%${query.search}%` },
      );
    }

    if (query.category_id) {
      queryBuilder.andWhere('product.category_id = :category_id', {
        category_id: query.category_id,
      });
    }

    if (query.is_active !== undefined) {
      const isActive = ['true', '1'].includes(query.is_active.toLowerCase?.());
      queryBuilder.andWhere('product.is_active = :is_active', {
        is_active: isActive,
      });
    }

    const { data: products, pagination } = await paginateQueryBuilder(
      queryBuilder,
      page,
      limit,
    );

    const mapper: ProductListDto[] = products.map(mapProductToDto);

    return {
      data: mapper,
      pagination,
    };
  }

  async findOne(id: number): Promise<ProductListDto> {
    const product = await this.productRepository.findOne({
      where: { product_id: id },
      relations: ['product_units', 'category', 'base_unit', 'product_units.unit'],
    });

    if (!product) {
      throw new NotFoundException('Product not found');
    }
    const mappedProduct = await mapProductToDto(product);

    return mappedProduct;
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    return this.transactionManager.runInTransaction(
      this.dataSource,
      async (manager) => {
        const existingProduct = await manager.findOne(Product, {
          where: { product_id: id },
          relations: ['product_units'],
        });

        if (!existingProduct) {
          throw new NotFoundException('Product not found');
        }

        // อัปเดตข้อมูลสินค้า
        const updatedProduct = manager.merge(
          Product,
          existingProduct,
          updateProductDto,
        );
        await manager.save(updatedProduct);

        // อัปเดต units
        // if (updateProductDto.units && updateProductDto.units.length > 0) {
        //   const existingUnitIds = existingProduct.product_units.map((u) => u.id);
        //   const incomingUnitIds = updateProductDto.units
        //     .filter((u) => u.id)
        //     .map((u) => u.id);

        //   // 🧹 ลบ units ที่หายไป (ไม่ได้ส่งมา)
        //   const unitsToRemove = existingUnitIds.filter(
        //     (id) => !incomingUnitIds.includes(id),
        //   );
        //   if (unitsToRemove.length > 0) {
        //     await manager.delete(ProductUnit, unitsToRemove);
        //   }

        //   // 🛠️ สร้างใหม่หรืออัปเดต
        //   const unitsToSave = updateProductDto.units.map((unit) => {
        //     return manager.create(ProductUnit, {
        //       ...unit,
        //       product: updatedProduct,
        //       product_id: updatedProduct.product_id,
        //     });
        //   });

        //   await manager.save(ProductUnit, unitsToSave);
        // }

        return updatedProduct;
      },
    );
  }

  async delete(id: number) {
    return this.transactionManager.runInTransaction(
      this.dataSource,
      async (manager) => {
        const product = await manager.findOne(Product, {
          where: { product_id: id },
          relations: ['product_units'],
        });

        if (!product) {
          throw new NotFoundException('Product not found');
        }

        // ลบ product_units ทั้งหมดแบบ bulk
        await manager.delete(ProductUnit, { product: { product_id: id } });

        // ใช้ soft delete (แนะนำ)
        await manager.softDelete(Product, { product_id: id });

        return { message: 'Product and related units deleted successfully' };
      },
    );
  }

  async createWithImage(id: number, image: Express.Multer.File) {
    const product = await this.productRepository.findOne({
      where: { product_id: id },
    });

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    const filename = await compressAndSaveImage(
      image.buffer,
      image.originalname,
    );

    product.image = filename;
    await this.productRepository.save(product);

    return product; // or return mapProductToDto(product);
  }
}
