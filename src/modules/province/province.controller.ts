import { Controller, Get} from '@nestjs/common';
import { ProvinceService } from './province.service';

@Controller('province')
export class ProvinceController {
  constructor(private readonly provinceService: ProvinceService) {}
  @Get()
  getAll() {
    return this.provinceService.getAll();
  }
}
