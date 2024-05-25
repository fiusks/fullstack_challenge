import { FastifyInstance } from 'fastify';
import { PrismaCustomerRepository } from 'src/modules/customer/infra';

export const customerRepositoryFactory = (fastify: FastifyInstance) => {
  return new PrismaCustomerRepository(fastify.prisma);
};
