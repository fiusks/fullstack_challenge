import { Category, CategoryRepository } from '~/modules/product/domain';

export class FindAllCategories {
  constructor(private readonly categoryRepository: CategoryRepository) {}

  async execute(): Promise<Category[]> {
    return await this.categoryRepository.findAll();
  }
}
