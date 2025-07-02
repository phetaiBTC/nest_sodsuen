import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateSupplierDto } from './dto/create-supplier.dto';
import { UpdateSupplierDto } from './dto/update-supplier.dto';
import { Like, Repository } from 'typeorm';
import { Supplier } from './entities/supplier.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { formatTimeUtil } from 'src/common/util/formatTime.util';

@Injectable()
export class SuppliersService {
  constructor(
    @InjectRepository(Supplier)
    private readonly supplierRepository: Repository<Supplier>
  ) { }
  async create(createSupplierDto: CreateSupplierDto) {
    const supplier = this.supplierRepository.create(createSupplierDto);
    await this.supplierRepository.save(supplier);
    return {
      message: 'Supplier created successfully',
      supplier
    }
  }

  async findAll() {
    const suppliers = await this.supplierRepository.find();
    const mapper = suppliers.map((supplier) => ({
      ...supplier,
      createdAt: formatTimeUtil(supplier.createdAt),
      updatedAt: formatTimeUtil(supplier.updatedAt),
    }))
    return mapper
  }

  async findOne(id: number) {
    const supplier = await this.supplierRepository.findOne({ where: { id } });
    if (!supplier) throw new NotFoundException('Supplier not found');
    return {
      ...supplier,
      createdAt: formatTimeUtil(supplier.createdAt),
      updatedAt: formatTimeUtil(supplier.updatedAt),
    }
  }

  async update(id: number, updateSupplierDto: UpdateSupplierDto) {
    const supplier = await this.findOne(id)
    if (!supplier) throw new NotFoundException('Supplier not found');
    const supplierUpdate = this.supplierRepository.create(updateSupplierDto);
    await this.supplierRepository.update(id, supplierUpdate);
    return {
      message: 'Supplier updated successfully',
      supplierUpdate
    };
  }

  async remove(id: number) {
    const supplier = await this.findOne(id)
    if (!supplier) throw new NotFoundException('Supplier not found');
    await this.supplierRepository.delete(id);
    return {
      message: 'Supplier deleted successfully'
    };
  }
  async search(name: string) {
    const suppliers = await this.supplierRepository.find({
      where: {
        name: Like(`%${name}%`)
      }
    });
    const mapper = suppliers.map((supplier) => ({
      ...supplier,
      createdAt: formatTimeUtil(supplier.createdAt),
      updatedAt: formatTimeUtil(supplier.updatedAt),
    }))
    return mapper
  }

  async is_active(id: number) {
    const supplier = await this.findOne(id)
    if (!supplier) throw new NotFoundException('Supplier not found');
    const supplierUpdate = this.supplierRepository.create({ is_active: !supplier.is_active });
    await this.supplierRepository.update(id, supplierUpdate);
    return {
      message: 'Supplier updated successfully',
      supplierUpdate
    };
  }
}
