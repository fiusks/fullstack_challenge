// src/modules/customer/routes/customerRoutes.ts
import { FastifyInstance } from 'fastify';
import {
  createProductServiceFactory,
  deleteProductServiceFactory,
  listProductServiceFactory,
  updateProductServiceFactory,
} from '../application/factories';
import {
  createProductSchema,
  deleteProductSchema,
  updateProductSchema,
} from './schemas/product';
import { ProductInputDto } from '../application/dtos';

export default async function productRoutes(fastify: FastifyInstance) {
  const customerAddressBasePath = 'product';

  fastify.register(
    (customerAddressRoutes, opts, done) => {
      customerAddressRoutes.get('/', async (request, reply) => {
        const address = await listProductServiceFactory(fastify).execute();

        reply.send(address).status(200);
      });

      customerAddressRoutes.post<{ Body: ProductInputDto }>('/', {
        schema: { body: createProductSchema },
        handler: async (request, reply) => {
          const newAddress = await createProductServiceFactory(fastify).execute(
            request.body,
          );

          reply.send(newAddress).status(200);
        },
      });

      customerAddressRoutes.delete<{ Params: { id: string } }>('/:id', {
        schema: { params: deleteProductSchema },
        handler: async (request, reply) => {
          const { id } = request.params;
          await deleteProductServiceFactory(fastify).execute(id);

          reply.send().status(200);
        },
      });

      customerAddressRoutes.put<{ Body: ProductInputDto }>('/', {
        schema: { body: updateProductSchema },
        handler: async (request, reply) => {
          const updatedAddress = updateProductServiceFactory(fastify).execute(
            request.body['id'],
          );

          reply.send(updatedAddress).status(200);
        },
      });

      done();
    },
    { prefix: customerAddressBasePath },
  );
}
