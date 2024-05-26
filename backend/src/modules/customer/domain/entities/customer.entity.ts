import { z } from 'zod';
import {
  BaseEntity,
  Email,
  Password,
  CPF,
  EntityId,
} from '~/modules/common/domain';
import { CustomerAddress } from '~/modules/customerAddress';

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

  public get phone(): string | null {
    return this.#phone;
  }

  public get birthday(): Date | null {
    return this.#birthday;
  }

  public get address(): CustomerAddress | null {
    return this.#address;
  }

  public updateProfile(props: Customer.CreateProps): void {
    this.#email = Email.create(props.email);
    this.#password = Password.create(props.password);
    this.#name = props.name;
    this.#cpf = CPF.create(props.cpf);
    this.#phone = props.phone;
    this.#birthday = props.birthday;
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
      address: this.#address?.toJSON() ?? null,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }

  readonly #username: string;
  #password: Password;
  #name: string;
  #email: Email;
  #cpf: CPF;
  #phone: string | null;
  #birthday: Date | null;
  #address: CustomerAddress | null;

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
    phone: string | null;
    birthday: Date | null;
    address: CustomerAddress.CreateProps | null;
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
    phone: string | null;
    birthday: Date | null;
    address: CustomerAddress | null;
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
    phone: string | null;
    birthday: Date | null;
    address: CustomerAddress.JSON | null;
    createdAt: Date;
    updatedAt: Date;
  };
}
