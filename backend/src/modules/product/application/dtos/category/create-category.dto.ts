import { Category } from '~/modules/product';

export class CreateCategoryInputDto {
  public readonly name: string;
  public readonly description: string;
  public readonly enabled: boolean;

  constructor(category: Category) {
    this.description = category.description;
    this.enabled = category.enabled;
    this.name = category.name;
  }
}
