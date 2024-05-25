import { BaseEntity, EntityId } from '../../../common/domain';
import { z } from 'zod';
import { Category } from './category.entity';

export class Product extends BaseEntity {
  public static get validator() {
    return BaseEntity.validator.extend({
      name: z.string(),
      description: z.string(),
      enabled: z.boolean().default(true),
      price: z.number(),
      stockQuantity: z.number(),
      image: z.string(),
      category: Category.validator,
    });
  }

  public static create(props: Product.CreateProps): Product {
    this.validator.parse(props);

    return new Product({
      ...props,
      id: EntityId.create(props.id),
      category: Category.create(props.category),
      enabled: props.enabled ?? true,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }

  public update(props: Product.CreateProps): void {
    this.#category = Category.create(props.category);
    this.#name = props.name;
    this.#description = props.description;
    this.#price = props.price;
    this.#stockQuantity = props.stockQuantity;
    this.#image = props.image;
  }

  public desactivate() {
    this.#enabled = false;
  }

  public toJSON(): Product.JSON {
    return {
      id: this.id.toJSON(),
      name: this.name,
      description: this.description,
      enabled: this.enabled,
      price: this.price,
      stockQuantity: this.stockQuantity,
      image: this.image,
      category: this.category.toJSON(),
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }

  public increaseStock(stockQuantity: number): void {
    this.#stockQuantity += stockQuantity;
  }

  public equals(other: Product): boolean {
    return this.id.equals(other.id);
  }

  public decreaseStock(stockQuantity: number): void {
    if (this.#stockQuantity < stockQuantity) {
      throw new Error('Insufficient stock');
    }
    this.#stockQuantity -= stockQuantity;
  }

  public get name(): string {
    return this.#name;
  }

  public get description(): string {
    return this.#description;
  }

  public get enabled(): boolean {
    return this.#enabled;
  }

  public get price(): number {
    return this.#price;
  }

  public get stockQuantity(): number {
    return this.#stockQuantity;
  }

  public get image(): string {
    return this.#image;
  }

  public get category(): Category {
    return new Category(this.#category);
  }

  #name: string;
  #description: string;
  #enabled: boolean;
  #price: number;
  #stockQuantity: number;
  #image: string;
  #category: Category.Props;

  constructor(props: Product.Props) {
    super(props.id, props.createdAt, props.updatedAt);
    this.#name = props.name;
    this.#description = props.description;
    this.#enabled = props.enabled;
    this.#price = props.price;
    this.#stockQuantity = props.stockQuantity;
    this.#image = props.image;
    this.#category = props.category;
  }
}

export namespace Product {
  export type CreateProps = {
    id?: string;
    name: string;
    description: string;
    enabled?: boolean;
    price: number;
    stockQuantity: number;
    image: string;
    category: Category.CreateProps;
    createdAt?: Date;
    updatedAt?: Date;
  };

  export type Props = {
    id: EntityId;
    name: string;
    description: string;
    enabled: boolean;
    price: number;
    stockQuantity: number;
    image: string;
    category: Category.Props;
    createdAt: Date;
    updatedAt: Date;
  };

  export type JSON = {
    id: EntityId.JSON;
    name: string;
    description: string;
    enabled: boolean;
    price: number;
    stockQuantity: number;
    image: string;
    category: Category.JSON;
    createdAt: Date;
    updatedAt: Date;
  };
}
