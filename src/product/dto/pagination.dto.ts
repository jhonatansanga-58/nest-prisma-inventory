/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { Transform } from 'class-transformer';
import { Min, IsOptional, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class PaginationDto {
    @ApiProperty({ description: 'Page number', example: 1 })
    @IsOptional()
    @IsNumber()
    @Min(1)
    @Transform(({ value }) => parseInt(value, 10))
    page: number = 1;

    @ApiProperty({ description: 'Limit per page', example: 10 })
    @IsOptional()
    @IsNumber()
    @Min(1)
    @Transform(({ value }) => parseInt(value, 10))
    limit: number = 10;
}
