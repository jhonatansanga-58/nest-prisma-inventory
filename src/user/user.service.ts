import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { User } from '@prisma/client';

@Injectable()
export class UserService {
    constructor(private prisma: PrismaService) {}

    async createUser(dto: CreateUserDto): Promise<User> {
        const hashedPassword = await bcrypt.hash(dto.password, 10);
        try {
            return await this.prisma.user.create({
                data: {
                    email: dto.email,
                    password: hashedPassword,
                    name: dto.name,
                },
            });
        } catch {
            throw new BadRequestException('Email already exists');
        }
    }

    async findByEmail(email: string): Promise<User> {
        const user = await this.prisma.user.findUnique({ where: { email } });
        if (!user) {
            throw new BadRequestException('User not found');
        }
        return user;
    }
}
