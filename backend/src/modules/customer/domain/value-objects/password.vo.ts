import { z } from 'zod';

export class Password {
  public static create(props: string): Password {
    this.validator.parse(props);
    return new Password({ password: props });
  }

  public static validator = z.string().min(6);

  #password: string;

  public toJSON(): Password.JSON {
    return this.#password;
  }

  public get password(): string {
    return this.#password;
  }

  constructor(props: Password.Props) {
    this.#password = props.password;
  }
}
export namespace Password {
  export type CreateProps = string;

  export type Props = {
    password: string;
  };

  export type JSON = string;
}
