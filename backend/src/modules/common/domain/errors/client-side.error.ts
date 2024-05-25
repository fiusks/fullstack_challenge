import { BaseError } from './base.error';

const DEFAULT_STATUS = 400;
const DEFAULT_MESSAGE = 'Bad Request';
const STARTING_STATUS = 400;
const ENDING_STATUS = 499;

export class ClientSideError extends BaseError {
  constructor({
    code,
    message = DEFAULT_MESSAGE,
    cause,
    status = DEFAULT_STATUS,
  }: ClientSideError.CreateProps) {
    if (status < STARTING_STATUS || status > ENDING_STATUS) {
      status = DEFAULT_STATUS;
    }

    super({ message, code, status, cause });
  }

  public isClientSideException(): boolean {
    return true;
  }

  public isServerSideException(): boolean {
    return false;
  }
}

export namespace ClientSideError {
  export type CreateProps = {
    message?: string;
    status?: number;
    code: string;
    cause?: unknown;
  };
}
