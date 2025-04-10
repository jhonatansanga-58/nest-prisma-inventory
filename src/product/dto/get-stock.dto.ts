import { IsOptional, IsArray, ArrayMinSize, IsInt, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class GetStocksDto {
    @IsOptional()
    @IsArray()
    @ArrayMinSize(1)
    @Type(() => Number)
    @IsInt({ each: true })
    @Min(1, { each: true })
    ids?: number[];
}
