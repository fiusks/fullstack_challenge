import { ClientSideError } from '~/modules/common/domain';

export class UserAlreadyExistsError extends ClientSideError {
  constructor({
    email,
    cpf,
    username,
  }: {
    email: boolean;
    cpf: boolean;
    username: boolean;
  }) {
    let message = 'User already exists.';
    if (email) message += ' Email already in use.';
    if (cpf) message += ' CPF already in use.';
    if (username) message += ' Username already in use.';
    super({ message, status: 422, code: 'USER_ALREADY_EXISTS' });
  }
}
