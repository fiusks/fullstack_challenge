import { z } from 'zod';

export class Password {
  public static create(password: string): Password {
    return new Password(password);
  }

  public static get validator() {
    return z.string().min(8).max(18);
  }

  public toJSON(): Password.JSON {
    return this.#value;
  }

  public get value(): string {
    return this.#value;
  }

  readonly #value: string;

  constructor(password: string) {
    this.#value = password;
  }
}

export namespace Password {
  export type CreateProps = string;

  export type JSON = string;
}
