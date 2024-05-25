import { BaseEntity, EntityId } from '../../../common/domain/';
import { z } from 'zod';

export class CustomerAddress extends BaseEntity {
  public static get validator() {
    return BaseEntity.validator.extend({
      customerId: EntityId.validator,
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
    this.validator.parse(props);

    return new CustomerAddress({
      ...props,
      id: EntityId.create(props.id),
      customerId: EntityId.create(props.customerId),
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }

  public updateProfile(props: Partial<CustomerAddress.CreateProps>): void {
    if (props.city) {
      this.#city = props.city;
    }
    if (props.street) {
      this.#street = props.street;
    }
    if (props.neighborhood) {
      this.#neighborhood = props.neighborhood;
    }
    if (props.number) {
      this.#number = props.number;
    }
    if (props.complement) {
      this.#complement = props.complement;
    }
    if (props.zipCode) {
      this.#zipCode = props.zipCode;
    }
    if (props.state) {
      this.#state = props.state;
    }
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