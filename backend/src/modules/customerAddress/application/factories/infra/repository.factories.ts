import { FastifyInstance } from 'fastify';
import { PrismaCustomerAddressRepository } from '../../../infra';

export const customerAddressRepositoryFactory = (fastify: FastifyInstance) => {
  return new PrismaCustomerAddressRepository(fastify.prisma);
};
