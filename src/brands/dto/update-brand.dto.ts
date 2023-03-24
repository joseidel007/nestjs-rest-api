import { PartialType } from '@nestjs/mapped-types';
import { IsOptional, IsString, IsUUID } from 'class-validator';
import { CreateBrandDto } from './create-brand.dto';

export class UpdateBrandDto extends PartialType(CreateBrandDto) {
    @IsString()
    @IsUUID()
    @IsOptional()
    readonly id?: string

    @IsString()
    @IsOptional()
    readonly name?: string
}
