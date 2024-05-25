import { notFoundError } from 'src/modules/common/domain';
import { ProductRepository } from 'src/modules/product/domain';

export class DeleteProduct {
  constructor(private readonly productRepository: ProductRepository) {}

  async delete(id: string): Promise<void> {
    const product = await this.productRepository.findById(id);

    if (!product) {
      throw notFoundError('Produto não encontrado');
    }

    product.desactivate();

    await this.productRepository.update(product);
  }
}
