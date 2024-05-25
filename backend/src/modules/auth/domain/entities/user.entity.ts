import { BaseEntity, CPF, Email, EntityId } from 'src/modules/common/domain';
import { z } from 'zod';
import { Username } from '../value-objects';

export class User extends BaseEntity {
  public static get validator() {
    return BaseEntity.baseValidator.extend({
      email: Email.validator.transform(Email.create),
      username: z.string().transform(Username.create),
      hashedPassword: z.string(),
      cpf: z.string().transform(CPF.create),
      createdAt: z.date().optional().default(new Date()),
      updatedAt: z.date().optional().default(new Date()),
    });
  }

  public static create(props: User.CreateProps): User {
    return new User(User.validator.parse(props));
  }

  public get email(): Email {
    return this.#email;
  }

  public get hashedPassword(): string {
    return this.#hashedPassword;
  }

  public get username(): Username {
    return this.#username;
  }

  public get cpf(): CPF {
    return this.#cpf;
  }

  public toJSON(): User.JSON {
    return {
      id: this.id.toJSON(),
      email: this.#email.toJSON(),
      username: this.#username.toJSON(),
      cpf: this.#cpf.toJSON(),
      createdAt: this.createdAt.toISOString(),
      updatedAt: this.updatedAt.toISOString(),
    };
  }

  #username: Username;
  #hashedPassword: string;
  #email: Email;
  #cpf: CPF;

  constructor(props: User.Props) {
    super(props.id, props.createdAt, props.updatedAt);
    this.#username = props.username;
    this.#email = props.email;
    this.#hashedPassword = props.hashedPassword;
  }
}

export namespace User {
  export type CreateProps = {
    id?: string;
    email: string;
    username: string;
    hashedPassword: string;
    cpf: string;
    createdAt?: Date;
    updatedAt?: Date;
  };

  export type Props = {
    id: EntityId;
    email: Email;
    username: Username;
    hashedPassword: string;
    cpf: CPF;
    createdAt: Date;
    updatedAt: Date;
  };

  export type JSON = {
    id: EntityId.JSON;
    email: Email.JSON;
    username: string;
    cpf: CPF.JSON;
    createdAt: string;
    updatedAt: string;
  };
}
