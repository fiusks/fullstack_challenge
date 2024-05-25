import { z } from 'zod';

export class OrderItemAmount {
  public static get validator() {
    return z.number().positive();
  }

  public static create(value: number): OrderItemAmount {
    this.validator.parse({ value });

    return new OrderItemAmount(value);
  }

  public toJSON(): OrderItemAmount.JSON {
    return this.#value;
  }

  public get value(): number {
    return this.#value;
  }

  readonly #value: number;

  constructor(value: number) {
    this.#value = value;
  }
}

export namespace OrderItemAmount {
  export type CreateProps = number;

  export type Props = {
    value: number;
  };

  export type JSON = number;
}
