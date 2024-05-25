import { FastifyInstance } from 'fastify';
import { FindCustomerAddress } from '../../../domain';
import customerAddressRepositoryFactory from '../infra/customer-address-repository.factory';

export default function findCustomerAddressServiceFactory(
  fastify: FastifyInstance,
) {
  return new FindCustomerAddress(customerAddressRepositoryFactory(fastify));
}
