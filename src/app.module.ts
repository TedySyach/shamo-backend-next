import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { ProductModule } from './product/product.module';
import { ProductCategoriesModule } from './product_categories/product_categories.module';
import { ProductGaleriesModule } from './product_galeries/product_galeries.module';
import { TransactionModule } from './transaction/transaction.module';
import { TransactionDetailsModule } from './transaction_details/transaction_details.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthModule,
    UserModule,
    ProductModule,
    ProductCategoriesModule,
    ProductGaleriesModule,
    TransactionModule,
    TransactionDetailsModule,
    PrismaModule,
  ],
})
export class AppModule {}
