// src/modules/customer/routes/customerRoutes.ts
import { FastifyInstance } from 'fastify';
import {
  createCategoryServiceFactory,
  deleteCategoryServiceFactory,
  listCategoryServiceFactory,
  updateCategoryServiceFactory,
} from '../application/factories';
import {
  CreateCategoryInputDto,
  UpdateCategoryInputDto,
} from '../application/dtos';
import { createCategorySchema, updateCategorySchema } from './schemas/category';
import { deleteCategorySchema } from './schemas/category/delete-category.schema';

export default async function categoryRoutes(fastify: FastifyInstance) {
  const categoriesBasePath = 'categories';

  fastify.register(
    (categoriesRoutes, opts, done) => {
      categoriesRoutes.get('/', async (request, reply) => {
        const address = await listCategoryServiceFactory(fastify).execute();

        reply.send(address).status(200);
      });

      categoriesRoutes.post<{ Body: CreateCategoryInputDto }>('/', {
        schema: { body: createCategorySchema },
        handler: async (request, reply) => {
          const newAddress = await createCategoryServiceFactory(
            fastify,
          ).execute(request.body);

          reply.send(newAddress).status(200);
        },
      });

      categoriesRoutes.delete<{
        Params: { id: string };
      }>('/:id', {
        schema: {
          params: deleteCategorySchema,
        },

        handler: async (request, reply) => {
          const { id } = request.params;

          await deleteCategoryServiceFactory(fastify).execute(id);

          reply.send().status(200);
        },
      });

      categoriesRoutes.put<{ Body: UpdateCategoryInputDto }>('/', {
        schema: { body: updateCategorySchema },
        handler: async (request, reply) => {
          const updatedAddress = updateCategoryServiceFactory(fastify).execute(
            request.body,
          );

          reply.send(updatedAddress).status(200);
        },
      });

      done();
    },
    { prefix: categoriesBasePath },
  );
}
