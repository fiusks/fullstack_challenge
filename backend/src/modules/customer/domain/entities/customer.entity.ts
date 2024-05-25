import { z } from 'zod';

import { CPF, Email, Password } from '../value-objects';
import { EntityId } from '../../../common/domain/value-objects/entity-id.vo';
import { BaseEntity } from '../../../common/domain/entities/base-entity';
import { CustomerAddress } from '../../../customerAddress/domain';

export class Customer extends BaseEntity {
  public static get validator() {
    return BaseEntity.baseValidator.extend({
      email: Email.validator.transform((email) => Email.create(email)),
      username: z.string(),
      password: Password.validator.transform((password) =>
        Password.create(password),
      ),
      name: z.string(),
      cpf: z.string().transform((cpf) => CPF.create(cpf)),
      phone: z.string().nullable().optional(),
      birthday: z.date().nullable().optional(),
      address: CustomerAddress.validator.nullable().optional(),
    });
  }

  public static create(props: Customer.CreateProps): Customer {
    const customerId = props.id
      ? EntityId.create(props.id)
      : EntityId.generate();
    return new Customer({
      createdAt: new Date(),
      updatedAt: new Date(),
      ...props,
      id: customerId,
      address: props.address ? CustomerAddress.create(props.address) : null,
    });
  }

  public get email(): Email {
    return this.#email;
  }

  public get username(): string {
    return this.#username;
  }

  public get password(): Password {
    return this.#password;
  }

  public get name(): string {
    return this.#name;
  }

  public get cpf(): CPF {
    return this.#cpf;
  }

  public get phone(): string {
    return this.#phone;
  }

  public get birthday(): Date {
    return this.#birthday;
  }

  public get address(): CustomerAddress {
    return this.#address;
  }

  public updateProfile(props: Partial<Customer.CreateProps>): void {
    if (props.email) {
      this.#email = Email.create(props.email);
    }
    if (props.password) {
      this.#password = Password.create(props.password);
    }
    if (props.name) {
      this.#name = props.name;
    }
    if (props.cpf) {
      this.#cpf = CPF.create(props.cpf);
    }
    if (props.phone) {
      this.#phone = props.phone;
    }
    if (props.birthday) {
      this.#birthday = props.birthday;
    }
  }

  public toJSON(): Customer.JSON {
    return {
      id: this.id.toJSON(),
      email: this.#email.toJSON(),
      username: this.#username,
      password: this.#password.toJSON(),
      name: this.#name,
      cpf: this.#cpf.toJSON(),
      phone: this.#phone,
      birthday: this.#birthday,
      address: this.#address.toJSON(),
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }

  readonly #username: string;
  #password: Password;
  #name: string;
  #email: Email;
  #cpf: CPF;
  #phone: string;
  #birthday: Date;
  #address: CustomerAddress;

  constructor(props: Customer.Props) {
    super(props.id, props.createdAt, props.updatedAt);
    this.#username = props.username;
    this.#birthday = props.birthday;
    this.#name = props.name;
    this.#email = Email.create(props.email);
    this.#password = Password.create(props.password);
    this.#phone = props.phone;
    this.#cpf = CPF.create(props.cpf);
    this.#address = props.address;
  }
}

export namespace Customer {
  export type CreateProps = {
    id?: string;
    email: string;
    username: string;
    password: string;
    name: string;
    cpf: string;
    phone?: string;
    birthday?: Date;
    address?: CustomerAddress.CreateProps;
    createdAt?: Date;
    updatedAt?: Date;
  };

  export type Props = {
    id: EntityId;
    email: string;
    username: string;
    password: string;
    name: string;
    cpf: string;
    phone?: string;
    birthday?: Date;
    address: CustomerAddress;
    createdAt: Date;
    updatedAt: Date;
  };

  export type JSON = {
    id: EntityId.JSON;
    email: Email.JSON;
    username: string;
    password: Password.JSON;
    name: string;
    cpf: CPF.JSON;
    phone?: string;
    birthday?: Date;
    address: CustomerAddress.JSON;
    createdAt: Date;
    updatedAt: Date;
  };
}
