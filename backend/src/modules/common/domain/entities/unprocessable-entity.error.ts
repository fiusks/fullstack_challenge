import { ClientSideError } from './client-side.error';

export class UnprocessableEntityError extends ClientSideError {
  public static defaultCode = 'UNPROCESSABLE_ENTITY_ERROR';
  public static defaultMessage = 'Could not process this request';

  constructor(message = UnprocessableEntityError.defaultMessage) {
    super({ message, code: UnprocessableEntityError.defaultCode, status: 422 });
  }
}

export const unprocessableEntityError = (
  message?: string,
): UnprocessableEntityError => new UnprocessableEntityError(message);
