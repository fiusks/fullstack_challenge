import { FastifyInstance } from 'fastify';
import {
  CreateCustomerAddress,
  DeleteCustomerAddress,
  UpdateCustomerAddress,
} from '../../../domain';

import {
  customerAddressRepositoryFactory,
  customerRepositoryFactory,
} from '../infra';

export const deleteCustomerAddressServiceFactory = (
  fastify: FastifyInstance,
) => {
  return new DeleteCustomerAddress(customerAddressRepositoryFactory(fastify));
};

export const findCustomerAddressServiceFactory = (fastify: FastifyInstance) => {
  return new DeleteCustomerAddress(customerAddressRepositoryFactory(fastify));
};

export const createCustomerAddressServiceFactory = (
  fastify: FastifyInstance,
) => {
  return new CreateCustomerAddress(
    customerAddressRepositoryFactory(fastify),
    customerRepositoryFactory(fastify),
  );
};

export const updateCustomerAddressServiceFactory = (
  fastify: FastifyInstance,
) => {
  return new UpdateCustomerAddress(customerAddressRepositoryFactory(fastify));
};
