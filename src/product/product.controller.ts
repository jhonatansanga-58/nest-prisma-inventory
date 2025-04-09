import { Controller, Get, Param, Post, Body, Put, Delete, ParseIntPipe } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Controller('products')
export class ProductController {
    constructor(private readonly productService: ProductService) {}

    @Get()
    async getAllProducts() {
        return this.productService.getAllProducts();
    }

    @Get(':id')
    async getProductById(@Param('id', ParseIntPipe) id: number) {
        return this.productService.getProductById(id);
    }

    @Post()
    async createProduct(@Body() product: CreateProductDto) {
        return this.productService.createProduct(product);
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
