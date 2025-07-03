import { Injectable, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { Product } from './entities/product.entity';
import { ProductUnit } from '../product_units/entities/product_unit.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { TRANSACTION_MANAGER_SERVICE } from 'src/common/constants/inject-key';
import { TransactionManagerService } from 'src/common/transation/transition.service';
import { UpdateProductDto } from './dto/update-product.dto';
import { compressAndSaveImage } from 'src/common/util/compressAndSaveImage.util';

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
          order: { created_at: 'DESC' },
        });

        let generatedCode = 'P001';
        // let generatedSku = 'P0001';
        if (lastProduct) {
          const lastProductCode = lastProduct.product_code;
          const lastProductNumber = parseInt(lastProductCode.slice(1), 10);
          const newProductNumber = lastProductNumber + 1;
          const paddedCode = newProductNumber.toString().padStart(3, '0');
          generatedCode = `P${paddedCode}`;
        }

        const product = manager.create(Product, {
          ...productData,
          product_code: generatedCode,
          // image: filename,
        });
        await manager.save(product);

        if (units && units.length > 0) {
          const productUnits = units.map((unit) =>
            manager.create(ProductUnit, {
              ...unit,
              product,
            }),
          );

          await manager.save(ProductUnit, productUnits);
        }

        return product;
      },
    );
  }

  async findAll() {
    return this.productRepository.find({
      relations: ['product_units', 'category', 'base_unit'],
    });
  }

  async findOne(id: number) {
    return this.productRepository.findOne({
      where: { product_id: id },
      relations: ['product_units', 'category', 'base_unit'],
    });
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
          throw new Error('Product not found');
        }
        const updatedProduct = manager.merge(
          Product,
          existingProduct,
          updateProductDto,
        );
        await manager.save(updatedProduct);

        // if (updateProductDto.units && updateProductDto.units.length > 0) {
        //   const updatedUnits = updateProductDto.units.map((unit) =>
        //     manager.merge(ProductUnit, unit)
        //   );
        //   await manager.save(ProductUnit, updatedUnits);
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
          throw new Error('Product not found');
        }

        if (product.product_units && product.product_units.length > 0) {
          await manager.remove(ProductUnit, product.product_units);
        }

        await manager.delete(Product, { product_id: id });

        return { message: 'Product and related units deleted successfully' };
      },
    );
  }

  async createWithImage(id: number, image: Express.Multer.File) {
    const product = await this.productRepository.findOne({
      where: { product_id: id },
    });
    if (!product) throw new Error('Product not found');
    const filename = await compressAndSaveImage(
      image.buffer,
      image.originalname,
    );

    product.image = filename;
    await this.productRepository.save(product);
    return product;
  }
}
