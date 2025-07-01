import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUnitDto } from './dto/create-unit.dto';
import { UpdateUnitDto } from './dto/update-unit.dto';
import { Like, Repository } from 'typeorm';
import { Unit } from './entities/unit.entity';
import { InjectRepository } from '@nestjs/typeorm';

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

  findAll() {
    return this.unitRepository.find();
  }

  async findOne(id: number) {
    const unit = await this.unitRepository.findOne({ where: { id } });
    if (!unit) throw new NotFoundException('Unit not found');
    return unit;
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
    return this.unitRepository.find({
      where: {
        name: Like(`%${name}%`)
      }
    });
  }
}
