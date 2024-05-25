import { BaseError } from './base.error';

const DEFAULT_STATUS = 500;
const DEFAULT_MESSAGE = 'Internal Server Error';
const DEFAULT_CODE = 'INTERNAL_SERVER_ERROR';
const STARTING_STATUS = 500;
const ENDING_STATUS = 599;

export class ServerSideError extends BaseError {
  constructor({
    code = DEFAULT_CODE,
    message = DEFAULT_MESSAGE,
    status = DEFAULT_STATUS,
    stack,
    cause,
  }: ServerSideError.CreateProps) {
    if (status < STARTING_STATUS || status > ENDING_STATUS) {
      status = DEFAULT_STATUS;
    }

    super({ message, code, status, stack, cause });
  }

  public isClientSideException(): boolean {
    return false;
  }

  public isServerSideException(): boolean {
    return true;
  }
}

export namespace ServerSideError {
  export type CreateProps = {
    message?: string;
    status?: number;
    code?: string;
    stack?: string;
    cause?: unknown;
  };
}
