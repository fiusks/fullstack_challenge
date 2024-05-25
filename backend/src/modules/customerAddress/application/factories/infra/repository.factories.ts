import { FastifyInstance } from 'fastify';
import { PrismaCustomerRepository } from 'src/modules/customer/infra';
import { PrismaCustomerAddressRepository } from 'src/modules/customerAddress/infra';

export const customerAddressRepositoryFactory = (fastify: FastifyInstance) => {
  return new PrismaCustomerAddressRepository(fastify.prisma);
};

export const customerRepositoryFactory = (fastify: FastifyInstance) => {
  return new PrismaCustomerRepository(fastify.prisma);
};
