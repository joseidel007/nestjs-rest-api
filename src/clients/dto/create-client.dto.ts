import { IsString, MinLength, IsOptional, IsUUID, IsNumber } from 'class-validator';
export class CreateClientDto {

    @IsUUID()
    @IsOptional()
    id: string

    @IsString()
    @MinLength(1)
    name: string;

    @IsString()
    @MinLength(1)
    lastName: string;

    @IsNumber()
    // @MinLength(1)
    age: number;

    @IsString()
    code: string


}
