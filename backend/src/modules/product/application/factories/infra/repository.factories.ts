import { FastifyInstance } from 'fastify';
import {
  PrismaCategoryRepository,
  PrismaProductRepository,
} from '../../../infra';

export const productRepositoryFactory = (fastify: FastifyInstance) => {
  return new PrismaProductRepository(fastify.prisma);
};

export const categoryRepositoryFactory = (fastify: FastifyInstance) => {
  return new PrismaCategoryRepository(fastify.prisma);
};
