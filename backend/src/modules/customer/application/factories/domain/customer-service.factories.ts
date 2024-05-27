import { FastifyInstance } from 'fastify';

import {
  DeleteCustomerService,
  FindCustomerById,
  UpdateCustomerService,
} from '../../service';
import { customerRepositoryFactory } from '../infra';

export const deleteCustomerServiceFactory = (fastify: FastifyInstance) => {
  return new DeleteCustomerService(customerRepositoryFactory(fastify));
};

export const findCustomerServiceFactory = (fastify: FastifyInstance) => {
  return new FindCustomerById(customerRepositoryFactory(fastify));
};

export const updateCustomerServiceFactory = (fastify: FastifyInstance) => {
  return new UpdateCustomerService(customerRepositoryFactory(fastify));
};
