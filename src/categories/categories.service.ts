import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CategoriesDto } from './dto/categories.dto';
import { ResponseFormatter } from 'src/helpers';

@Injectable()
export class CategoriesService {
  constructor(
    private prisma: PrismaService,
    private responseFormater: ResponseFormatter,
  ) {}

  async createCategories(body: CategoriesDto) {
    const addData = await this.prisma.productCategories.create({
      data: {
        name: body.name,
      },
    });

    return this.responseFormater.success(
      addData,
      'Berhasil Menambahkan Kategori',
    );
  }

  async listCategories() {
    const data = await this.prisma.productCategories.findMany();

    return this.responseFormater.success(data, 'Data Kategori');
  }

  async listCategoriesWithProduct(categoriesId: number) {
    const data = await this.prisma.productCategories.findUnique({
      where: { id: categoriesId },
      include: {
        product: {
          take: 10,
        },
      },
    });
    return this.responseFormater.success(data, 'Data Kategori dengan Product');
  }
}
