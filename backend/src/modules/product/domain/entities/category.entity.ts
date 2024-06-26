import { z } from 'zod';
import { BaseEntity, EntityId } from '~/modules/common/domain';

export class Category extends BaseEntity {
  public static get validator() {
    return BaseEntity.baseValidator.extend({
      name: z.string().max(20),
      description: z.string().max(200),
      enabled: z.boolean().default(true),
    });
  }

  public static create(props: Category.CreateProps): Category {
    return new Category(Category.validator.parse(props));
  }

  public get name(): string {
    return this.#name;
  }

  public get enabled(): boolean {
    return this.#enabled;
  }

  public get description(): string {
    return this.#description;
  }

  public update(props: Category.CreateProps): void {
    this.#name = props.name;
    this.#description = props.description;
  }

  public desactivate() {
    this.#enabled = false;
  }

  public toJSON(): Category.JSON {
    return {
      id: this.id.toJSON(),
      name: this.name,
      description: this.description,
      enabled: this.enabled,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }

  #name: string;
  #description: string;
  #enabled: boolean;

  constructor(props: Category.Props) {
    super(props.id, props.createdAt, props.updatedAt);
    this.#name = props.name;
    this.#description = props.description;
    this.#enabled = props.enabled;
  }
}

export namespace Category {
  export type CreateProps = {
    id?: string;
    name: string;
    description: string;
    enabled?: boolean;
    createdAt?: Date;
    updatedAt?: Date;
  };

  export type Props = {
    id: EntityId;
    name: string;
    description: string;
    enabled: boolean;
    createdAt: Date;
    updatedAt: Date;
  };

  export type JSON = {
    id: EntityId.JSON;
    name: string;
    description: string;
    enabled: boolean;
    createdAt: Date;
    updatedAt: Date;
  };
}
