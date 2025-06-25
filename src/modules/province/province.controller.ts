import { Controller, Delete, Get, Post} from '@nestjs/common';
import { ProvinceService } from './province.service';

@Controller('province')
export class ProvinceController {
  constructor(private readonly provinceService: ProvinceService) {}
  @Get()
  getAll() {
    return this.provinceService.getAll();
  }

  @Post()
  addProvince() {
    return this.provinceService.addProvince();
  }

  @Delete()
  deleteAll() {
    return this.provinceService.deleteAll();
  }
}
