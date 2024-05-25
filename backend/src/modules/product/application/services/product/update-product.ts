import { notFoundError } from 'src/modules/common/domain';
import {
  CategoryRepository,
  Product,
  ProductRepository,
} from 'src/modules/product/domain';
import { UpdateProductInputDto } from '../../dtos/product';

export class UpdateProduct {
  constructor(
    private readonly productRepository: ProductRepository,
    private readonly categoryRepository: CategoryRepository,
  ) {}

  async execute(input: UpdateProductInputDto): Promise<Product> {
    const product = await this.productRepository.findById(input.id);

    if (!product) {
      throw notFoundError('Produto não encontrado');
    }

    const category = await this.categoryRepository.findById(input.categoryId);

    if (!category) {
      throw notFoundError('Categoria não encontrada');
    }

    product.update({ ...input, category: category.toJSON() });

    return await this.productRepository.update(product);
  }
}
