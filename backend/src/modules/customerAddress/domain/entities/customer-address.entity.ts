import { BaseEntity, EntityId } from '../../../common/domain/';
import { z } from 'zod';

export class CustomerAddress extends BaseEntity {
  public static get validator() {
    return BaseEntity.baseValidator.extend({
      customerId: EntityId.validator.transform(EntityId.create),
      zipCode: z.string(),
      street: z.string(),
      neighborhood: z.string(),
      city: z.string(),
      number: z.string(),
      complement: z.string(),
      state: z.string(),
    });
  }

  public static create(props: CustomerAddress.CreateProps): CustomerAddress {
    return new CustomerAddress(this.validator.parse(props));
  }

  public update(props: CustomerAddress.CreateProps): void {
    this.#city = props.city;
    this.#street = props.street;
    this.#neighborhood = props.neighborhood;
    this.#number = props.number;
    this.#complement = props.complement;
    this.#zipCode = props.zipCode;
    this.#state = props.state;
  }

  public toJSON(): CustomerAddress.JSON {
    return {
      id: this.id.toJSON(),
      customerId: this.customerId.toJSON(),
      zipCode: this.#zipCode,
      street: this.#street,
      neighborhood: this.#neighborhood,
      city: this.#city,
      number: this.#number,
      complement: this.#complement,
      state: this.state,
      createdAt: this.createdAt.toISOString(),
      updatedAt: this.updatedAt.toISOString(),
    };
  }

  public get customerId(): EntityId {
    return this.#customerId;
  }

  public get zipCode(): string {
    return this.#zipCode;
  }

  public get street(): string {
    return this.#street;
  }

  public get neighborhood(): string {
    return this.#neighborhood;
  }

  public get city(): string {
    return this.#city;
  }

  public get number(): string {
    return this.#number;
  }

  public get complement(): string {
    return this.#complement;
  }

  public get state(): string {
    return this.#state;
  }

  readonly #customerId: EntityId;
  #zipCode: string;
  #street: string;
  #neighborhood: string;
  #city: string;
  #number: string;
  #complement: string;
  #state: string;

  constructor(props: CustomerAddress.Props) {
    super(props.id, props.createdAt, props.updatedAt);
    this.#customerId = props.customerId;
    this.#zipCode = props.zipCode;
    this.#street = props.street;
    this.#neighborhood = props.neighborhood;
    this.#city = props.city;
    this.#number = props.number;
    this.#complement = props.complement;
    this.#state = props.state;
  }
}

export namespace CustomerAddress {
  export type CreateProps = {
    id?: string;
    customerId: string;
    zipCode: string;
    street: string;
    neighborhood: string;
    city: string;
    number: string;
    complement: string;
    state: string;
    createdAt?: Date;
    updatedAt?: Date;
  };

  export type Props = {
    id: EntityId;
    customerId: EntityId;
    zipCode: string;
    street: string;
    neighborhood: string;
    city: string;
    number: string;
    complement: string;
    state: string;
    createdAt: Date;
    updatedAt: Date;
  };

  export type JSON = {
    id: EntityId.JSON;
    customerId: EntityId.JSON;
    zipCode: string;
    street: string;
    neighborhood: string;
    city: string;
    number: string;
    complement: string;
    state: string;
    createdAt: string;
    updatedAt: string;
  };
}
