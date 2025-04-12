import { IsOptional, IsArray, ArrayMinSize, IsInt, Min } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class GetStocksDto {
    @ApiProperty({ description: 'Product IDs', example: [1, 2, 3] })
    @IsOptional()
    @IsArray()
    @ArrayMinSize(1)
    @Type(() => Number)
    @IsInt({ each: true })
    @Min(1, { each: true })
    ids?: number[];
}
