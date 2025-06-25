import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { District } from './entities/district.entity';
import { Repository } from 'typeorm';

@Injectable()
export class DistrictService {
    constructor(
        @InjectRepository(District)
        private readonly districtRepository: Repository<District>
    ) { }
    getOneById(provinceId: number) {

            return this.districtRepository.find({ where: { province: { id: provinceId } } });

    }
    getAll() {
        return this.districtRepository.find();
    }
}
