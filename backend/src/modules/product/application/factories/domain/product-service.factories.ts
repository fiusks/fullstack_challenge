import { FastifyInstance } from 'fastify';

import { productRepositoryFactory, categoryRepositoryFactory } from '../infra';
import {
  CreateProduct,
  DeleteProduct,
  ListProducts,
  UpdateProduct,
} from '../../services';

export const deleteProductServiceFactory = (fastify: FastifyInstance) => {
  return new DeleteProduct(productRepositoryFactory(fastify));
};

export const listProductServiceFactory = (fastify: FastifyInstance) => {
  return new ListProducts(productRepositoryFactory(fastify));
};

export const createProductServiceFactory = (fastify: FastifyInstance) => {
  return new CreateProduct(
    productRepositoryFactory(fastify),
    categoryRepositoryFactory(fastify),
  );
};

export const updateProductServiceFactory = (fastify: FastifyInstance) => {
  return new UpdateProduct(
    productRepositoryFactory(fastify),
    categoryRepositoryFactory(fastify),
  );
};
