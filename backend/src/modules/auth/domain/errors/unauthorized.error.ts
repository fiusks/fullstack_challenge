import { ClientSideError } from 'src/modules/common/domain';

export class UnauthorizedError extends ClientSideError {
  constructor() {
    super({ message: 'Unauthorized', status: 401, code: 'UNAUTHORIZED' });
  }
}
