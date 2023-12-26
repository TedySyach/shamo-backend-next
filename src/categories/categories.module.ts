import { Module } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CategoriesController } from './categories.controller';
import { ResponseFormatter } from 'src/helpers';

@Module({
  providers: [CategoriesService, ResponseFormatter],
  controllers: [CategoriesController],
})
export class CategoriesModule {}
