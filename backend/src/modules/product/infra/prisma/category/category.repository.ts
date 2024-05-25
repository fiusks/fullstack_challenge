import { PrismaClient } from '@prisma/client';
import { Category, CategoryRepository } from 'src/modules/product/domain';
import { PrismaCategoryModel } from './category.model';

export class PrismaCategoryRepository implements CategoryRepository {
  constructor(private readonly prismaService: PrismaClient) {}

  private convert(prismaCategory: PrismaCategoryModel): Category {
    return Category.create(prismaCategory);
  }

  async create(category: Category): Promise<Category> {
    const newCategory = await this.prismaService.category.create({
      data: {
        description: category.description,
        enabled: true,
        name: category.name,
        id: category.id.id,
      },
    });

    return this.convert(newCategory);
  }

  async findAll(): Promise<Category[]> {
    const allCategories = await this.prismaService.category.findMany({});

    return allCategories.map((category) => this.convert(category));
  }

  async findById(id: string): Promise<Category | null> {
    const dbCategory = await this.prismaService.category.findFirst({
      where: { id },
    });

    if (!dbCategory) return null;

    return this.convert(dbCategory);
  }

  async findByName(name: string): Promise<Category | null> {
    const dbCategory = await this.prismaService.category.findFirst({
      where: { name },
    });

    if (!dbCategory) return null;

    return this.convert(dbCategory);
  }

  async update(category: Category): Promise<Category> {
    const dbCategory = await this.prismaService.category.update({
      where: { id: category.id.id },
      data: {
        description: category.description,
        name: category.name,
      },
    });

    return this.convert(dbCategory);
  }
}
