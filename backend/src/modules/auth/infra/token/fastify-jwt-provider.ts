import { FastifyInstance } from 'fastify';
import { AccessTokenProvider, UserDto } from '../../application';

export class FastifyJwtAccessTokenProvider implements AccessTokenProvider {
  constructor(private readonly fastify: FastifyInstance) {}

  public generateToken(user: UserDto): string {
    return this.fastify.jwt.sign({ sub: user.email });
  }
}
