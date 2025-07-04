import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Like, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { formatTimeUtil } from 'src/common/util/formatTime.util';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category) private readonly categoryRepository: Repository<Category>
  ) { }
  async create(createCategoryDto: CreateCategoryDto) {
    const unit = this.categoryRepository.create(createCategoryDto);
    await this.categoryRepository.save(unit);
    return {
      message: 'Category created successfully',
      unit
    }
  }

  async findAll() {
    const units = await this.categoryRepository.find();
    const mapper = units.map((unit) => ({
      ...unit,
      createdAt: formatTimeUtil(unit.createdAt),
      updatedAt: formatTimeUtil(unit.updatedAt),
    }))
    return mapper
  }

  async findOne(id: number) {
    const unit = await this.categoryRepository.findOne({ where: { id } });
    if (!unit) throw new NotFoundException('Category not found');
    return unit;
  }

  async update(id: number, updateUnitDto: UpdateCategoryDto) {
    const unit = await this.findOne(id);
    if (!unit) throw new NotFoundException('Category not found');
    await this.categoryRepository.update(id, updateUnitDto);
    return {
      message: 'Unit updated successfully',
      unit
    }
  }

  async remove(id: number) {
    const unit = await this.findOne(id);
    if (!unit) throw new NotFoundException('Category not found');
    this.categoryRepository.delete(id);
    return {
      message: 'Category deleted successfully'
    }
  }

  async search(name: string) {
    const units = await this.categoryRepository.find({
      where: {
        name: Like(`%${name}%`)
      }
    });
    const mapper = units.map((unit) => ({
      ...unit,
      createdAt: formatTimeUtil(unit.createdAt),
      updatedAt: formatTimeUtil(unit.updatedAt),
    }))
    return mapper
  }
}
