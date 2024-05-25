import { FastifyInstance } from 'fastify';
import { AccessTokenProvider } from '../../application/interfaces';
import { UserDto } from '../../application/dto';

export class FastifyJwtAccessTokenProvider implements AccessTokenProvider {
  constructor(private readonly fastify: FastifyInstance) {}

  public generateToken(user: UserDto): string {
    return this.fastify.jwt.sign({ sub: user.email });
  }
}
