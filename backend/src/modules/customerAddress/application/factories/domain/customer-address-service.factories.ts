import { FastifyInstance } from 'fastify';
import {
  CreateCustomerAddress,
  DeleteCustomerAddress,
  FindCustomerAddress,
  UpdateCustomerAddress,
} from '../../services';
import { customerAddressRepositoryFactory } from '../infra';
import { customerRepositoryFactory } from 'src/modules/customer/application/factories';

export const deleteCustomerAddressServiceFactory = (
  fastify: FastifyInstance,
) => {
  return new DeleteCustomerAddress(customerAddressRepositoryFactory(fastify));
};

export const findCustomerAddressServiceFactory = (fastify: FastifyInstance) => {
  return new FindCustomerAddress(customerAddressRepositoryFactory(fastify));
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
