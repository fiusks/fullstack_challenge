import { Product } from '~/modules/product/domain';

export class UpdateProductInputDto {
  public readonly id: string;
  public readonly description: string;
  public readonly price: number;
  public readonly stockQuantity: number;
  public readonly image: string;
  public readonly categoryId: string;
  public readonly name: string;

  constructor(product: Product, categoryId: string) {
    this.id = product.id.id;
    this.categoryId = categoryId;
    this.name = product.name;
    this.description = product.description;
    this.price = product.price;
    this.stockQuantity = product.stockQuantity;
    this.image = product.image;
  }
}
