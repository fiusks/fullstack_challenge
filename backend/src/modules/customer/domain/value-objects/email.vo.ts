import { z } from 'zod';

export class Email {
  public static create(props: Email.CreateProps): Email {
    this.validator.parse(props);
    return new Email({ email: props });
  }

  public static validator = z.string().email();

  public get email(): string {
    return this.#email;
  }

  public toJSON(): Email.JSON {
    return this.#email;
  }

  #email: string;

  constructor(props: Email.Props) {
    this.#email = props.email;
  }
}

export namespace Email {
  export type CreateProps = string;

  export type Props = {
    email: string;
  };

  export type JSON = string;
}
