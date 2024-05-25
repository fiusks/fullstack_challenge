import { FastifyInstance } from 'fastify';
import { PrismaCustomerRepository } from '../../../../customer';
import { PrismaCustomerAddressRepository } from '../../../infra';

export const customerAddressRepositoryFactory = (fastify: FastifyInstance) => {
  return new PrismaCustomerAddressRepository(fastify.prisma);
};

export const customerRepositoryFactory = (fastify: FastifyInstance) => {
  return new PrismaCustomerRepository(fastify.prisma);
};
