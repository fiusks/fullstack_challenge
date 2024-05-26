import { notFoundError } from '~/modules/common/domain';
import { CategoryRepository } from '~/modules/product/domain';

export class DeleteCategory {
  constructor(private readonly categoryRepository: CategoryRepository) {}

  async execute(id: string): Promise<void> {
    const category = await this.categoryRepository.findById(id);

    if (!category) {
      throw notFoundError('Categoria não encontrada');
    }

    category.desactivate();

    await this.categoryRepository.update(category);
  }
}
