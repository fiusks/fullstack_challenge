import { Category } from 'src/modules/product/domain';

export class UpdateCategoryInputDto {
  public readonly id: string;
  public readonly name: string;
  public readonly description: string;

  constructor(category: Category, categoryId: string) {
    this.id = categoryId;
    this.description = category.description;
    this.name = category.name;
  }
}
