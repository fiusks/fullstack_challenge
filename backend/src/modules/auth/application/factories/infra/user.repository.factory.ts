import { FastifyInstance } from 'fastify';
import { PrismaUserRepository } from '../../../infra';

export const userRepositoryFactory = (fastify: FastifyInstance) => {
  return new PrismaUserRepository(fastify.prisma);
};
