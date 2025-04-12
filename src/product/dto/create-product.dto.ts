import {
    IsString,
    IsNumber,
    MinLength,
    MaxLength,
    IsNotEmpty,
    Min,
    IsOptional,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class CreateProductDto {
    @ApiProperty({ description: 'Product name', example: 'Laptop', type: String })
    @IsString()
    @IsNotEmpty()
    @MinLength(3)
    @MaxLength(100)
    name: string;

    @ApiProperty({
        description: 'Product description',
        example: 'Laptop of high quality',
        type: String,
    })
    @IsString()
    @IsNotEmpty()
    @MinLength(10)
    @MaxLength(500)
    description: string;

    @ApiProperty({ description: 'Product price', example: 100, type: Number })
    @IsNumber()
    @IsNotEmpty()
    @Min(0)
    price: number;

    @ApiProperty({ description: 'Product stock', example: 10, type: Number })
    @IsNumber()
    @IsNotEmpty()
    @Min(0)
    stock: number;

    @ApiProperty({ description: 'Category ID', example: 1, type: Number, required: false })
    @IsOptional()
    @IsNumber()
    categoryId?: number;
}
