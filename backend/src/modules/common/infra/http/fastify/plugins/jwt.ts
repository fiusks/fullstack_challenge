import fp from 'fastify-plugin';
import fastifyJwt from '@fastify/jwt';
import env from '~/env';
import { UnauthorizedError } from '~/modules/auth/domain';

declare module 'fastify' {
  export interface FastifyInstance {
    authenticate: (
      request: FastifyRequest,
      reply: FastifyReply,
    ) => Promise<void>;
  }
}

const authenticate = fp(async function (fastify) {
  fastify.register(fastifyJwt, {
    secret: env.JWT_SECRET_KEY,
  });

  fastify.decorate('authenticate', async function (request, reply) {
    console.log('🚀 ~ authenticate:');
    try {
      await request.jwtVerify();
    } catch (err) {
      const unauthorizedError = new UnauthorizedError();
      reply.send(unauthorizedError).status(unauthorizedError.status);
    }
  });
});

export default authenticate;
