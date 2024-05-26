import { PrismaClient } from '@prisma/client';

import { Product, ProductRepository } from '~/modules/product/domain';
import { PrismaProductModel } from './product-model';

export class PrismaProductRepository implements ProductRepository {
  constructor(private readonly prismaService: PrismaClient) {}

  private convert(prismaProduct: PrismaProductModel): Product {
    return Product.create(prismaProduct);
  }

  async create(product: Product): Promise<Product> {
    const newProduct = await this.prismaService.product.create({
      data: {
        description: product.description,
        image: product.image,
        name: product.name,
        enabled: product.enabled,
        price: product.stockQuantity,
        stockQuantity: product.stockQuantity,
        registrationDate: product.createdAt,
        categoryId: product.category.id.id,
      },
      include: { category: true },
    });

    return this.convert(newProduct);
  }

  async findAll(): Promise<Product[]> {
    const products = await this.prismaService.product.findMany({
      include: { category: true },
    });

    return products.map((product) => this.convert(product));
  }

  async findById(id: string): Promise<Product | null> {
    const dbProduct = await this.prismaService.product.findUnique({
      where: { id },
      include: { category: true },
    });

    if (!dbProduct) return null;

    return this.convert(dbProduct);
  }

  async findByName(name: string): Promise<Product | null> {
    const dbProduct = await this.prismaService.product.findFirst({
      where: { name },
      include: { category: true },
    });

    if (!dbProduct) return null;

    return this.convert(dbProduct);
  }

  async findManyByCategoryId(categoryId: string): Promise<Product[]> {
    const products = await this.prismaService.product.findMany({
      where: { categoryId },
      include: { category: true },
    });

    return products.map((product) => this.convert(product));
  }

  async update(product: Product): Promise<Product> {
    const updatedProduct = await this.prismaService.product.update({
      where: { id: product.id.id },
      data: {
        description: product.description,
        image: product.image,
        name: product.name,
        price: product.stockQuantity,
        stockQuantity: product.stockQuantity,
      },
      include: { category: true },
    });

    return this.convert(updatedProduct);
  }
}
