import { FastifyInstance } from 'fastify';
import { userRepositoryFactory, ValidateSigninService } from '../application';
import { BcryptHash, FastifyJwtAccessTokenProvider } from '../infra';

export async function loginRoute(fastify: FastifyInstance) {
  fastify.post('/login', async (request, reply) => {
    const { email, password } = request.body as {
      email: string;
      password: string;
    };

    const userRepository = userRepositoryFactory(fastify);
    const hash = new BcryptHash();
    const accessTokenProvider = new FastifyJwtAccessTokenProvider(fastify);
    const validateSignin = new ValidateSigninService(
      userRepository,
      accessTokenProvider,
      hash,
    );

    const session = await validateSignin.execute({ email, password });
    reply.status(201).send(session);
  });
}
