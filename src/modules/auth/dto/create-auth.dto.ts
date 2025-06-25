import { IsOptional, IsString } from "class-validator";
export class CreateAuthDto {
    @IsString()
    @IsOptional()
    email: string;
    @IsString()
    @IsOptional()
    password: string;
}
