import { IsBoolean, IsEmail, IsNotEmpty, IsString } from "class-validator";

export class CreateSupplierDto {
    @IsString()
    @IsNotEmpty()
    name: string

    @IsString()
    @IsNotEmpty()
    contact_person: string

    @IsString()
    @IsNotEmpty()
    phone: string

    @IsString()
    @IsNotEmpty()
    address: string

    @IsEmail()
    @IsNotEmpty()
    email: string

    @IsString()
    @IsNotEmpty()
    payment_terms: string

    @IsNotEmpty()
    @IsBoolean()
    is_active: boolean
}
