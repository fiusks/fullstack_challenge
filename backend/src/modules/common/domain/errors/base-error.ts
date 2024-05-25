export abstract class BaseError extends Error {
  public readonly name: string;
  public readonly code: string;
  public readonly status: number;
  public readonly stack?: string;

  constructor({ code, message, stack, status, cause }: BaseError.CreateProps) {
    // @ts-ignore
    super(message, { cause });

    this.code = code;
    this.status = status;
    this.stack = stack;
    this.name = this.constructor.name;
  }

  public getStatus(): number {
    return this.status;
  }

  public get statusCode(): number {
    return this.status;
  }

  public abstract isClientSideException(): boolean;

  public abstract isServerSideException(): boolean;
}

export namespace BaseError {
  export type CreateProps = {
    message: string;
    status: number;
    code: string;
    stack?: string;
    cause?: unknown;
  };
}
