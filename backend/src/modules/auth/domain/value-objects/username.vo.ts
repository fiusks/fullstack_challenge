import { z } from 'zod';

export class Username {
  public static create(username: string): Username {
    return new Username(username);
  }

  public static get validator() {
    return z.string().min(4).max(24);
  }

  public toJSON(): Username.JSON {
    return this.#value;
  }

  public get value(): string {
    return this.#value;
  }

  readonly #value: string;

  constructor(username: string) {
    this.#value = username;
  }
}

export namespace Username {
  export type CreateProps = string;

  export type JSON = string;
}
