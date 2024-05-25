import { FastifyInstance } from 'fastify';

import { categoryRepositoryFactory } from '../infra';
import {
  CreateCategory,
  DeleteCategory,
  FindAllCategories,
  UpdateCategory,
} from '../../services';

export const deleteCategoryServiceFactory = (fastify: FastifyInstance) => {
  return new DeleteCategory(categoryRepositoryFactory(fastify));
};

export const listCategoryServiceFactory = (fastify: FastifyInstance) => {
  return new FindAllCategories(categoryRepositoryFactory(fastify));
};

export const createCategoryServiceFactory = (fastify: FastifyInstance) => {
  return new CreateCategory(categoryRepositoryFactory(fastify));
};

export const updateCategoryServiceFactory = (fastify: FastifyInstance) => {
  return new UpdateCategory(categoryRepositoryFactory(fastify));
};
