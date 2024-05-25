import { z } from 'zod';

export class Email {
  public static create(email: string): Email {
    return new Email(Email.validator.parse(email));
  }

  public static get validator() {
    return z.string().email();
  }

  public toJSON(): Email.JSON {
    return this.#value;
  }

  public get value(): string {
    return this.#value;
  }

  readonly #value: string;

  constructor(email: string) {
    this.#value = email;
  }
}

export namespace Email {
  export type CreateProps = string;

  export type JSON = string;
}
