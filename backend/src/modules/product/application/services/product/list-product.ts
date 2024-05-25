import { Product, ProductRepository } from 'src/modules/product/domain';

export class ListProducts {
  constructor(private readonly productRepository: ProductRepository) {}

  async execute(): Promise<Product[]> {
    const products = await this.productRepository.findAll();
    return products;
  }
}
