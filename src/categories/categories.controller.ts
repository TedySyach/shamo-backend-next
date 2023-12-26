import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CategoriesDto } from './dto/categories.dto';
import { ResponseFormatter } from 'src/helpers';
import { AdminGuard } from 'src/auth/guard';

@Controller('categories')
export class CategoriesController {
  constructor(private categoriesService: CategoriesService) {}

  // Admin
  @Post('create')
  @UseGuards(AdminGuard)
  async createCategories(@Body() body: CategoriesDto) {
    const data = await this.categoriesService.createCategories(body);

    return data;
  }

  @Get()
  async getAll() {
    const output = await this.categoriesService.listCategories();
    return output;
  }

  @Get('product')
  async getProductPerCategories(@Query('id') id: any) {
    const categoriesId = parseInt(id);

    const data =
      await this.categoriesService.listCategoriesWithProduct(categoriesId);
    return data;
  }
}
