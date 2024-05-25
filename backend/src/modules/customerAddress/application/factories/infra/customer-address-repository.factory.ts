import { FastifyInstance } from 'fastify';
import { PrismaCustomerAddressRepository } from '../../../infra';

export default function customerAddressRepositoryFactory(
  fastify: FastifyInstance,
) {
  return new PrismaCustomerAddressRepository(fastify.prisma);
}
