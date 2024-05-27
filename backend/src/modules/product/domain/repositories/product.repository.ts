import { Product } from '../entities';

export interface ProductRepository {
  create(product: Product): Promise<Product>;
  findById(id: string): Promise<Product | null>;
  findByName(name: string): Promise<Product | null>;
  findManyByCategoryId(categoryId: string): Promise<Product[]>;
  findAll(): Promise<Product[]>;
  findByIds(ids: string[]): Promise<Product[]>;
  update(product: Product): Promise<Product>;
}
