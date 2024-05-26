import { FastifyInstance } from 'fastify';
import { PrismaCustomerAddressRepository } from '~/modules/customerAddress/infra';

export const customerAddressRepositoryFactory = (fastify: FastifyInstance) => {
  return new PrismaCustomerAddressRepository(fastify.prisma);
};
