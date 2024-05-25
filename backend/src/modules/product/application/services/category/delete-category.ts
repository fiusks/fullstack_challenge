import { notFoundError } from 'src/modules/common/domain';
import { CategoryRepository } from 'src/modules/product/domain';

export class DeleteCategory {
  constructor(private readonly categoryRepository: CategoryRepository) {}

  async delete(id: string): Promise<void> {
    const category = await this.categoryRepository.findById(id);

    if (!category) {
      throw notFoundError('Categoria não encontrada');
    }

    category.desactivate();

    await this.categoryRepository.update(category);
  }
}
