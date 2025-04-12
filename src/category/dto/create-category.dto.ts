import { IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class CreateCategoryDto {
    @ApiProperty({ description: 'Category name', example: 'Electronics', type: String })
    @IsString()
    @MinLength(3)
    name: string;

    @ApiProperty({
        description: 'Category description',
        example: 'Electronics of high quality',
        type: String,
    })
    @IsString()
    @MinLength(3)
    description: string;
}
