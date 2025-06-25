import { Controller, Get, Param, Post } from '@nestjs/common';
import { DistrictService } from './district.service';

@Controller('district')
export class DistrictController {
  constructor(private readonly districtService: DistrictService) {}

  @Get(':id')
  getOneById(@Param('id') provinceId: number) {
    return this.districtService.getOneById(provinceId);
  }
  
  @Get()
  getAll() {
    return this.districtService.getAll();
  }

  @Post()
  addProvince() {
    return this.districtService.createDistrict();
  }
}
