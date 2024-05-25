import { ClientSideError } from './client-side.error';

export class NotFoundError extends ClientSideError {
  public static defaultCode = 'NOT_FOUND_ERROR';
  public static defaultMessage = 'Not Found';

  constructor(message = NotFoundError.defaultMessage) {
    super({ message, code: NotFoundError.defaultCode });
  }
}

export const notFoundError = (message?: string): NotFoundError =>
  new NotFoundError(message);
