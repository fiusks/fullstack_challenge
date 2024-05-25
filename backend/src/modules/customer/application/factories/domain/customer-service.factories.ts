import { FastifyInstance } from 'fastify';

import {
  CreateCustomerService,
  DeleteCustomerService,
  FindCustomerByUsername,
  UpdateCustomerService,
} from '../../service';
import { customerRepositoryFactory } from '../infra';

export const deleteCustomerServiceFactory = (fastify: FastifyInstance) => {
  return new DeleteCustomerService(customerRepositoryFactory(fastify));
};

export const findCustomerServiceFactory = (fastify: FastifyInstance) => {
  return new FindCustomerByUsername(customerRepositoryFactory(fastify));
};

export const createCustomerServiceFactory = (fastify: FastifyInstance) => {
  return new CreateCustomerService(customerRepositoryFactory(fastify));
};

export const updateCustomerServiceFactory = (fastify: FastifyInstance) => {
  return new UpdateCustomerService(customerRepositoryFactory(fastify));
};
