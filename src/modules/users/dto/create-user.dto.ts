import { IsString, IsEmail, IsNotEmpty, IsNumber, Length } from 'class-validator';
export class CreateUserDto {
    @IsEmail()
    @IsNotEmpty()
    email: string;
    @IsString()
    @IsNotEmpty()
    password: string;
    @IsString()
    @IsNotEmpty()
    username: string;
    @IsNumber()
    @IsNotEmpty()
    districtId: number;
    @IsNumber()
    @IsNotEmpty()
    roleId: number;
    @IsNotEmpty()
    @Length(11, 11)
    phone: string;
}
