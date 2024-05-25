// src/modules/auth/routes/authRoutes.ts

import { FastifyInstance } from 'fastify';
import { RegisterUserService } from '../application/services/register-user.service';
import { userRepositoryFactory } from '../application';
import { BcryptHash, FastifyJwtAccessTokenProvider } from '../infra';

export async function signUpRoute(fastify: FastifyInstance) {
  fastify.post('/register', async (request, reply) => {
    const { email, username, password, cpf, name } = request.body as {
      email: string;
      name: string;
      username: string;
      password: string;
      cpf: string;
    };

    const userRepository = userRepositoryFactory(fastify);
    const hash = new BcryptHash();
    const accessTokenProvider = new FastifyJwtAccessTokenProvider(fastify);
    const registerUser = new RegisterUserService(
      userRepository,
      hash,
      accessTokenProvider,
    );

    const session = await registerUser.execute({
      email,
      username,
      name,
      password,
      cpf,
    });

    reply.send(session);
  });
}
