// src/product/product.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Product } from '@prisma/client';

@Injectable()
export class ProductService {
    constructor(private prisma: PrismaService) {}

    async getAllProducts(): Promise<Product[]> {
        return this.prisma.product.findMany();
    }

    async getProductById(id: number): Promise<Product> {
        const product = await this.prisma.product.findUnique({ where: { id } });
        if (!product) {
            throw new NotFoundException(`Product with ID ${id} not found`);
        }
        return product;
    }

    async createProduct(data: Product): Promise<Product> {
        return this.prisma.product.create({ data });
    }
    async updateProduct(id: number, data: Product): Promise<Product> {
        try {
            return this.prisma.product.update({ where: { id }, data });
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (error) {
            throw new NotFoundException(`Product with ID ${id} not found`);
        }
    }

    async deleteProduct(id: number): Promise<Product> {
        try {
            return await this.prisma.product.delete({ where: { id } });
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (error) {
            throw new NotFoundException(`Product with ID ${id} not found`);
        }
    }
}
