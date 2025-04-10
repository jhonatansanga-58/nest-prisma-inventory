import {
    Controller,
    Get,
    Param,
    Post,
    Body,
    Put,
    Delete,
    ParseIntPipe,
    Query,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { GetStocksDto } from './dto/get-stock.dto';
import { PaginationDto } from './dto/pagination.dto';
@Controller('products')
export class ProductController {
    constructor(private readonly productService: ProductService) {}

    @Get()
    async getProducts(@Query() paginationDto: PaginationDto) {
        const { page, limit } = paginationDto;
        return this.productService.getProducts(page, limit);
    }

    @Get('search')
    async searchProducts(@Query('name') name: string) {
        return this.productService.searchProducts(name);
    }

    @Get(':id')
    async getProductById(@Param('id', ParseIntPipe) id: number) {
        return this.productService.getProductById(id);
    }

    @Get(':id/stock')
    async getStock(@Param('id', ParseIntPipe) id: number) {
        return this.productService.getProductStock(id);
    }

    @Post()
    async createProduct(@Body() product: CreateProductDto) {
        return this.productService.createProduct(product);
    }

    @Post('stocks')
    async getStocks(@Body() body: GetStocksDto) {
        if (Array.isArray(body.ids) && body.ids.length > 0) {
            return this.productService.getStocksByIds(body.ids);
        }
        return this.productService.getAllStocks();
    }

    @Put(':id')
    async updateProduct(@Param('id', ParseIntPipe) id: number, @Body() product: UpdateProductDto) {
        return this.productService.updateProduct(id, product);
    }

    @Delete(':id')
    async deleteProduct(@Param('id', ParseIntPipe) id: string) {
        return this.productService.deleteProduct(parseInt(id));
    }
}
