import {
    IsString,
    IsNumber,
    MinLength,
    MaxLength,
    IsNotEmpty,
    Min,
    IsOptional,
} from 'class-validator';

export class CreateProductDto {
    @IsString()
    @IsNotEmpty()
    @MinLength(3)
    @MaxLength(100)
    name: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(10)
    @MaxLength(500)
    description: string;

    @IsNumber()
    @IsNotEmpty()
    @Min(0)
    price: number;

    @IsNumber()
    @IsNotEmpty()
    @Min(0)
    stock: number;

    @IsOptional()
    @IsNumber()
    categoryId?: number;
}
