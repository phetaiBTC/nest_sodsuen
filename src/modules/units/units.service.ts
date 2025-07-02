import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUnitDto } from './dto/create-unit.dto';
import { UpdateUnitDto } from './dto/update-unit.dto';
import { Like, Repository } from 'typeorm';
import { Unit } from './entities/unit.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { formatTimeUtil } from 'src/common/util/formatTime.util';

@Injectable()
export class UnitsService {
  constructor(
    @InjectRepository(Unit) private readonly unitRepository: Repository<Unit>
  ) { }
  async create(createUnitDto: CreateUnitDto) {
    const unit = this.unitRepository.create(createUnitDto);
    await this.unitRepository.save(unit);
    return {
      message: 'Unit created successfully',
      unit
    }
  }

  async findAll() {
    const units = await this.unitRepository.find();
    const mapper = units.map((unit) => ({
      id: unit.id,
      name: unit.name,
      symbol: unit.symbol,
      description: unit.description,
      createdAt: formatTimeUtil(unit.createdAt),
      updatedAt: formatTimeUtil(unit.updatedAt),
    }))
    return mapper
  }

  async findOne(id: number) {
    const unit = await this.unitRepository.findOne({ where: { id } });
    if (!unit) throw new NotFoundException('Unit not found');
    return {
      ...unit,
      createdAt: formatTimeUtil(unit.createdAt),
      updatedAt: formatTimeUtil(unit.updatedAt),
    };
  }

  async update(id: number, updateUnitDto: UpdateUnitDto) {
    const unit = await this.findOne(id);
    if (!unit) throw new NotFoundException('Unit not found');
    await this.unitRepository.update(id, updateUnitDto);
    return {
      message: 'Unit updated successfully',
      unit
    }
  }

  async remove(id: number) {
    const unit = await this.findOne(id);
    if (!unit) throw new NotFoundException('Unit not found');
    this.unitRepository.delete(id);
    return {
      message: 'Unit deleted successfully'
    }
  }

  async search(name: string) {
    const units = await this.unitRepository.find({
      where: {
        name: Like(`%${name}%`)
      }
    });
    const mapper = units.map((unit) => ({
      id: unit.id,
      name: unit.name,
      symbol: unit.symbol,
      description: unit.description,
      createdAt: formatTimeUtil(unit.createdAt),
      updatedAt: formatTimeUtil(unit.updatedAt),
    }))
    return mapper
  }
}
