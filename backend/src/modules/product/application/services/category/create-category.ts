import { notFoundError } from 'src/modules/common/domain';
import { Category, CategoryRepository } from 'src/modules/product/domain';
import { CreateCategoryInputDto } from '../../dtos';

export class CreateCategory {
  constructor(private readonly categoryRepository: CategoryRepository) {}

  async execute(input: CreateCategoryInputDto): Promise<Category> {
    const category = Category.create(input);

    const dbcategory = await this.categoryRepository.findByName(input.name);

    if (!dbcategory) {
      throw notFoundError('Categoria já cadastrado na base');
    }

    return await this.categoryRepository.create(category);
  }
}
