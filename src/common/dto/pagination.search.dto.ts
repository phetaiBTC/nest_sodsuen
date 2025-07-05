import { IsOptional, IsString, IsNumberString } from 'class-validator';

export class BestQueryDto {
  @IsOptional()
  page: number = 1;

  @IsOptional()
  limit: number = 10;

  @IsOptional()
  @IsString()
  search?: string;
}
