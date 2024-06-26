import { notFoundError } from '~/modules/common/domain';
import { Category, CategoryRepository } from '~/modules/product/domain';
import { UpdateCategoryInputDto } from '../../dtos';

export class UpdateCategory {
  constructor(private readonly categoryRepository: CategoryRepository) {}

  async execute(input: UpdateCategoryInputDto): Promise<Category> {
    const category = await this.categoryRepository.findById(input.id);

    if (!category) {
      throw notFoundError('Categoria não encontrada');
    }

    category.update(input);

    return await this.categoryRepository.update(category);
  }
}
