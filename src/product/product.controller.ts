import { Controller, Get, Param, Post, Body, Put, Delete } from '@nestjs/common';
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
    async getProductById(@Param('id') id: string) {
        return this.productService.getProductById(parseInt(id));
    }

    @Post()
    async createProduct(@Body() product: CreateProductDto) {
        return this.productService.createProduct(product);
    }

    @Put(':id')
    async updateProduct(@Param('id') id: string, @Body() product: UpdateProductDto) {
        return this.productService.updateProduct(parseInt(id), product);
    }

    @Delete(':id')
    async deleteProduct(@Param('id') id: string) {
        return this.productService.deleteProduct(parseInt(id));
    }
}
