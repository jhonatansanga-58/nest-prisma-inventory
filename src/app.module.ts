import { Module } from '@nestjs/common';
import { ProductModule } from './product/product.module';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { CategoryModule } from './category/category.module';
@Module({
    imports: [ProductModule, PrismaModule, UserModule, AuthModule, CategoryModule],
    controllers: [],
    providers: [],
})
export class AppModule {}
