import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Province } from './entities/province.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProvinceService {
    constructor(
        @InjectRepository(Province)
        private readonly provinceRepository: Repository<Province>
    ) {}
    getAll() {
        return this.provinceRepository.find();
    }
}
