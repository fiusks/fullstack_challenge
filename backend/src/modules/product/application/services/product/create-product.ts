import { notFoundError } from 'src/modules/common/domain';
import {
  CategoryRepository,
  Product,
  ProductRepository,
} from 'src/modules/product/domain';
import { ProductInputDto } from '../../dtos/product';

export class CreateProduct {
  constructor(
    private readonly productRepository: ProductRepository,
    private readonly categoryRepository: CategoryRepository,
  ) {}

  async create(input: ProductInputDto): Promise<Product> {
    const dbProduct = await this.productRepository.findByName(input.name);

    if (!dbProduct) {
      throw notFoundError('Produto já cadastrado na base');
    }

    const category = await this.categoryRepository.findById(input.categoryId);

    if (!category) {
      throw notFoundError('Categoria não encontrada');
    }
    const product = Product.create({
      ...input,
      category: category.toJSON(),
    });

    return await this.productRepository.create(product);
  }
}
