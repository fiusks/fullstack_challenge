import { UserDto } from './user.dto';

export class SessionDto {
  constructor(
    public readonly user: UserDto,
    public readonly token: string,
  ) {}
}
