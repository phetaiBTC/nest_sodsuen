import { Controller, Delete, Get, Post} from '@nestjs/common';
import { ProvinceService } from './province.service';
import { Public } from 'src/common/decorators/auth.decorator';

@Controller('province')
export class ProvinceController {
  constructor(private readonly provinceService: ProvinceService) {}
  @Get()
  getAll() {
    return this.provinceService.getAll();
  }

}
