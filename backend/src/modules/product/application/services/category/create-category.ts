import { notFoundError } from '~/modules/common/domain';
import { CategoryRepository, Category } from '~/modules/product/domain';
import { CreateCategoryInputDto } from '../../dtos';

export class CreateCategory {
  constructor(private readonly categoryRepository: CategoryRepository) {}

  async execute(input: CreateCategoryInputDto): Promise<Category> {
    const category = Category.create(input);

    const dbcategory = await this.categoryRepository.findByName(input.name);

    if (dbcategory) {
      throw notFoundError('Categoria já cadastrado na base');
    }

    return await this.categoryRepository.create(category);
  }
}
