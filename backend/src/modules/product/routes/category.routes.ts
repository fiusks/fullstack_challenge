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

export default async function categoryRoutes(fastify: FastifyInstance) {
  const customerAddressBasePath = 'category';

  fastify.register(
    (customerAddressRoutes, opts, done) => {
      customerAddressRoutes.get('/', async (request, reply) => {
        const address = await listCategoryServiceFactory(fastify).execute();

        reply.send(address).status(200);
      });

      customerAddressRoutes.post<{ Body: CreateCategoryInputDto }>('/', {
        schema: { body: createCategorySchema },
        handler: async (request, reply) => {
          const newAddress = await createCategoryServiceFactory(
            fastify,
          ).execute(request.body);

          reply.send(newAddress).status(200);
        },
      });

      customerAddressRoutes.delete('/:id', async (request, reply) => {
        await deleteCategoryServiceFactory(fastify).execute(
          request.params['id'],
        );

        reply.send().status(200);
      });

      customerAddressRoutes.put<{ Body: UpdateCategoryInputDto }>('/', {
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
    { prefix: customerAddressBasePath },
  );
}