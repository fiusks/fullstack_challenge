import { z } from 'zod';

export class CPF {
  public static get validator() {
    return z
      .string()
      .min(11)
      .max(14)
      .transform((cpf) => cpf.replace(/[^\d]+/g, ''));
  }

  public static get refinedValidator() {
    return CPF.validator.refine(CPF.cpfRefineChecker.check);
  }

  public static get cpfRefineChecker() {
    return {
      check: (cpf: z.output<typeof CPF.validator>) => {
        if (cpf.length !== 11) return false;

        if (cpf.split('').every((value) => value === cpf[0])) return false;

        let sum = 0;
        let remainder;

        for (let i = 1; i <= 9; i++)
          sum = sum + parseInt(cpf.substring(i - 1, i)) * (11 - i);
        remainder = (sum * 10) % 11;

        if (remainder === 10 || remainder === 11) remainder = 0;
        if (remainder !== parseInt(cpf.substring(9, 10))) return false;

        sum = 0;
        for (let i = 1; i <= 10; i++)
          sum = sum + parseInt(cpf.substring(i - 1, i)) * (12 - i);
        remainder = (sum * 10) % 11;

        if (remainder === 10 || remainder === 11) remainder = 0;
        if (remainder !== parseInt(cpf.substring(10, 11))) return false;

        return true;
      },
      errorParams: {
        message: 'CPF is Invalid',
        path: ['cpf'],
      },
    };
  }

  public static create(props: CPF.CreateProps): CPF {
    this.refinedValidator.parse(props);
    return new CPF({ cpf: props });
  }

  public toJSON(): CPF.JSON {
    return this.#cpf;
  }

  get cpf(): string {
    return this.#cpf;
  }

  #cpf: string;

  constructor(props: CPF.Props) {
    this.#cpf = props.cpf;
  }
}

export namespace CPF {
  export type CreateProps = string;

  export type Props = {
    cpf: string;
  };

  export type JSON = string;
}
