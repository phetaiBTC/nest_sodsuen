import { Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { DistrictService } from './district.service';
import { Public } from 'src/common/decorators/auth.decorator';

@Controller('district')
export class DistrictController {
  constructor(private readonly districtService: DistrictService) { }

  @Get(':id')
  getOneById(@Param('id') provinceId: number) {
    return this.districtService.getOneById(provinceId);
  }

  @Get()
  getAll() {
    return this.districtService.getAll();
  }
}
