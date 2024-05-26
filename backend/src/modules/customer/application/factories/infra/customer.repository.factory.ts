import { FastifyInstance } from 'fastify';
import { PrismaCustomerRepository } from '~/modules/customer/infra';

export const customerRepositoryFactory = (fastify: FastifyInstance) => {
  return new PrismaCustomerRepository(fastify.prisma);
};
