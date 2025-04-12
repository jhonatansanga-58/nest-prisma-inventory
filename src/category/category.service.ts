import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Category } from '@prisma/client';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoryService {
    constructor(private prisma: PrismaService) {}

    async getCategories(): Promise<Category[]> {
        return await this.prisma.category.findMany();
    }

    async getCategoryById(id: number): Promise<Category> {
        try {
            const category = await this.prisma.category.findUnique({ where: { id } });
            if (!category) {
                throw new NotFoundException(`Category with ID ${id} not found`);
            }
            return category;
        } catch {
            throw new BadRequestException('Failed to get category');
        }
    }

    async createCategory(data: CreateCategoryDto): Promise<Category> {
        try {
            return await this.prisma.category.create({ data });
        } catch {
            throw new BadRequestException('Failed to create category');
        }
    }

    async updateCategory(id: number, data: UpdateCategoryDto): Promise<Category> {
        try {
            return await this.prisma.category.update({
                where: { id },
                data,
            });
        } catch {
            throw new NotFoundException(`Category with ID ${id} not found`);
        }
    }

    async deleteCategory(id: number): Promise<Category> {
        try {
            return await this.prisma.category.delete({ where: { id } });
        } catch {
            throw new NotFoundException(`Category with ID ${id} not found`);
        }
    }
}
