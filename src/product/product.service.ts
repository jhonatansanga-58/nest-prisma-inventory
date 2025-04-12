import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Product } from '@prisma/client';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductService {
    constructor(private prisma: PrismaService) {}

    async getProducts(page: number, limit: number): Promise<Product[]> {
        const skip = (page - 1) * limit;
        return this.prisma.product.findMany({ skip, take: limit });
    }

    async searchProducts(name: string): Promise<Product[]> {
        return this.prisma.product.findMany({
            where: {
                name: {
                    contains: name,
                },
            },
        });
    }

    async getProductById(id: number): Promise<Product> {
        try {
            const product = await this.prisma.product.findUnique({ where: { id } });
            if (!product) {
                throw new NotFoundException(`Product with ID ${id} not found`);
            }
            return product;
        } catch {
            throw new BadRequestException('Failed to get product');
        }
    }

    async createProduct(data: CreateProductDto): Promise<Product> {
        try {
            return await this.prisma.product.create({
                data: {
                    name: data.name,
                    description: data.description,
                    price: data.price,
                    stock: data.stock,
                    categoryId: data.categoryId,
                },
            });
        } catch {
            throw new BadRequestException('Failed to create product');
        }
    }

    async updateProduct(id: number, data: UpdateProductDto): Promise<Product> {
        try {
            return await this.prisma.product.update({
                where: { id },
                data: {
                    name: data.name,
                    description: data.description,
                    price: data.price,
                    stock: data.stock,
                    categoryId: data.categoryId,
                },
            });
        } catch {
            throw new NotFoundException(`Product with ID ${id} not found`);
        }
    }

    async deleteProduct(id: number): Promise<Product> {
        try {
            return await this.prisma.product.delete({ where: { id } });
        } catch {
            throw new NotFoundException(`Product with ID ${id} not found`);
        }
    }

    async getProductStock(id: number) {
        try {
            const product = await this.prisma.product.findUnique({
                where: { id },
                select: { id: true, name: true, stock: true },
            });
            if (!product) {
                throw new NotFoundException(`Product with ID ${id} not found`);
            }
            return product;
        } catch {
            throw new BadRequestException('Failed to get product stock');
        }
    }

    async getAllStocks() {
        return await this.prisma.product.findMany({
            select: { id: true, name: true, stock: true },
        });
    }

    async getStocksByIds(ids: number[]) {
        return await this.prisma.product.findMany({
            where: { id: { in: ids } },
            select: { id: true, name: true, stock: true },
        });
    }

    async getProductsByCategory(categoryId: number): Promise<Product[]> {
        return this.prisma.product.findMany({
            where: { categoryId },
        });
    }
}
