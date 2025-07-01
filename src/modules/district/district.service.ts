import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { District } from './entities/district.entity';
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';

@Injectable()
export class DistrictService {
    constructor(
        @InjectRepository(District)
        private readonly districtRepository: Repository<District>,
        @InjectRepository(User)
        private readonly userRepository: Repository<User>
    ) { }
    getOneById(provinceId: number) {

        return this.districtRepository.find({ where: { province: { id: provinceId } } });

    }
    async getAll() {
        const district = await this.districtRepository.find({ relations: ['province'] });
        const mapper = district.map((district) => ({
            id: district.id,
            name: district.name,
            name_en: district.name_en,
            province: {
                id: district.province.id
            }
        }))
        return mapper

    }

    // async createDistrict() {
    //    
    //     for (let i = 0; i < district.length; i++) {
    //         const ceateDistrict = this.districtRepository.create(district[i]);
    //         await this.districtRepository.save(ceateDistrict);
    //     }
    //     return "success";
    // }

    // async deleteAll() {
    //     const user = await this.userRepository.find();
    //     if (!user) throw new NotFoundException('User not found');
    //     for (let i = 0; i < user.length; i++) {
    //         await this.userRepository.delete(user[i].id);
    //     }
    //     const district = await this.districtRepository.find();
    //     if (!district) throw new NotFoundException('District not found');
    //     for (let i = 0; i < district.length; i++) {
    //         await this.districtRepository.delete(district[i].id);
    //     }
    //     return "success";
    // }
}
