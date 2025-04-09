// src/product/product.service.ts
import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Product } from '@prisma/client';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductService {
    constructor(private prisma: PrismaService) {}

    async getAllProducts(): Promise<Product[]> {
        return this.prisma.product.findMany();
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
            return await this.prisma.product.create({ data });
        } catch {
            throw new BadRequestException('Failed to create product');
        }
    }

    async updateProduct(id: number, data: UpdateProductDto): Promise<Product> {
        try {
            return await this.prisma.product.update({ where: { id }, data });
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
}
