/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { Transform } from 'class-transformer';
import { Min, IsOptional, IsNumber } from 'class-validator';

export class PaginationDto {
    @IsOptional()
    @IsNumber()
    @Min(1)
    @Transform(({ value }) => parseInt(value, 10))
    page: number = 1;

    @IsOptional()
    @IsNumber()
    @Min(1)
    @Transform(({ value }) => parseInt(value, 10))
    limit: number = 10;
}
