import { Product } from '~/modules/product/domain';

export class ProductInputDto {
  public readonly description: string;
  public readonly enabled: boolean;
  public readonly price: number;
  public readonly stockQuantity: number;
  public readonly image: string;
  public readonly categoryId: string;
  public readonly name: string;

  constructor(product: Product, categoryId: string) {
    this.name = product.name;
    this.description = product.description;
    this.enabled = product.enabled;
    this.price = product.price;
    this.stockQuantity = product.stockQuantity;
    this.image = product.image;
    this.categoryId = categoryId;
  }
}
