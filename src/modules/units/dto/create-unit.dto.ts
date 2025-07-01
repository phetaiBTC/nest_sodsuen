import { IsString, IsNotEmpty, IsOptional } from "class-validator";
export class CreateUnitDto {
    @IsString()
    @IsNotEmpty()
    name: string
    @IsOptional()
    @IsString()
    description?: string
    @IsString()
    @IsNotEmpty()
    symbol: string
}
