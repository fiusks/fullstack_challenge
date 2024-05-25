import { UserDto } from '../dto';

export interface AccessTokenProvider {
  generateToken(user: UserDto): string;
}
