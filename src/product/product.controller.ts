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
    UseGuards,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { GetStocksDto } from './dto/get-stock.dto';
import { PaginationDto } from './dto/pagination.dto';
import { JwtAuthGuard } from '../auth/jwt/jwt.guard';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('Products')
@ApiBearerAuth()
@Controller('products')
@UseGuards(JwtAuthGuard)
export class ProductController {
    constructor(private readonly productService: ProductService) {}

    @Get()
    @ApiOperation({ summary: 'Get all products' })
    @ApiResponse({ status: 200, description: 'Products retrieved successfully' })
    @ApiResponse({ status: 401, description: 'Unauthorized' })
    @ApiResponse({ status: 404, description: 'Products not found' })
    async getProducts(@Query() paginationDto: PaginationDto) {
        const { page, limit } = paginationDto;
        return this.productService.getProducts(page, limit);
    }

    @Get('search')
    @ApiOperation({ summary: 'Search products by name' })
    @ApiResponse({ status: 200, description: 'Products retrieved successfully' })
    @ApiResponse({ status: 401, description: 'Unauthorized' })
    @ApiResponse({ status: 404, description: 'Products not found' })
    async searchProducts(@Query('name') name: string) {
        return this.productService.searchProducts(name);
    }

    @Get('category/:categoryId')
    @ApiOperation({ summary: 'Get products by category ID' })
    @ApiResponse({ status: 200, description: 'Products retrieved successfully' })
    @ApiResponse({ status: 401, description: 'Unauthorized' })
    @ApiResponse({ status: 404, description: 'Products not found' })
    async getProductsByCategory(@Param('categoryId', ParseIntPipe) categoryId: number) {
        return this.productService.getProductsByCategory(categoryId);
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get a product by ID' })
    @ApiResponse({ status: 200, description: 'Product retrieved successfully' })
    @ApiResponse({ status: 401, description: 'Unauthorized' })
    @ApiResponse({ status: 404, description: 'Product not found' })
    async getProductById(@Param('id', ParseIntPipe) id: number) {
        return this.productService.getProductById(id);
    }

    @Get(':id/stock')
    @ApiOperation({ summary: 'Get product stock by ID' })
    @ApiResponse({ status: 200, description: 'Product stock retrieved successfully' })
    @ApiResponse({ status: 401, description: 'Unauthorized' })
    @ApiResponse({ status: 404, description: 'Product not found' })
    async getStock(@Param('id', ParseIntPipe) id: number) {
        return this.productService.getProductStock(id);
    }

    @Post()
    @ApiOperation({ summary: 'Create a new product' })
    @ApiResponse({ status: 201, description: 'Product created successfully' })
    @ApiResponse({ status: 401, description: 'Unauthorized' })
    @ApiResponse({ status: 400, description: 'Bad Request' })
    async createProduct(@Body() product: CreateProductDto) {
        return this.productService.createProduct(product);
    }

    @Post('stocks')
    @ApiOperation({ summary: 'Get product stock by ID' })
    @ApiResponse({ status: 200, description: 'Product stock retrieved successfully' })
    @ApiResponse({ status: 401, description: 'Unauthorized' })
    async getStocks(@Body() body: GetStocksDto) {
        if (Array.isArray(body.ids) && body.ids.length > 0) {
            return this.productService.getStocksByIds(body.ids);
        }
        return this.productService.getAllStocks();
    }

    @Put(':id')
    @ApiOperation({ summary: 'Update a product by ID' })
    @ApiResponse({ status: 200, description: 'Product updated successfully' })
    @ApiResponse({ status: 401, description: 'Unauthorized' })
    @ApiResponse({ status: 404, description: 'Product not found' })
    @ApiResponse({ status: 400, description: 'Bad Request' })
    async updateProduct(@Param('id', ParseIntPipe) id: number, @Body() product: UpdateProductDto) {
        return this.productService.updateProduct(id, product);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Delete a product by ID' })
    @ApiResponse({ status: 200, description: 'Product deleted successfully' })
    @ApiResponse({ status: 401, description: 'Unauthorized' })
    @ApiResponse({ status: 404, description: 'Product not found' })
    async deleteProduct(@Param('id', ParseIntPipe) id: string) {
        return this.productService.deleteProduct(parseInt(id));
    }
}
