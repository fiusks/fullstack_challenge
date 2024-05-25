// src/modules/customer/routes/customerRoutes.ts
import { FastifyInstance } from 'fastify';
import {
  CreateCustomerAddressDto,
  createCustomerAddressServiceFactory,
  deleteCustomerAddressServiceFactory,
  findCustomerAddressServiceFactory,
  updateCustomerAddressServiceFactory,
} from '../application';
import { createCustomerAddressSchema } from './schemas';

export default async function customerRoutes(fastify: FastifyInstance) {
  const customerAddressBasePath = './customer-address';

  fastify.register(
    (customerAddressRoutes, opts, done) => {
      customerAddressRoutes.get('/:customerId', async (request, reply) => {
        const address = findCustomerAddressServiceFactory(fastify).execute(
          request.params['customerId'],
        );

        reply.send(address).status(200);
      });

      customerAddressRoutes.post<{ Body: CreateCustomerAddressDto }>('/', {
        schema: { body: createCustomerAddressSchema },
        handler: async (request, reply) => {
          const find = createCustomerAddressServiceFactory(fastify);

          const result = await find.execute(request.body['id']);

          reply.send(result).status(200);
        },
      });

      customerAddressRoutes.delete('/:id', async (request, reply) => {
        const find = deleteCustomerAddressServiceFactory(fastify);

        const result = await find.execute(request.params['id']);

        reply.send(result).status(200);
      });

      customerAddressRoutes.put<{ Body: CreateCustomerAddressDto }>('/', {
        schema: { body: createCustomerAddressSchema },
        handler: async (request, reply) => {
          const find = updateCustomerAddressServiceFactory(fastify);

          const result = await find.execute(request.body['id']);

          reply.send(result).status(200);
        },
      });

      done();
    },
    { prefix: customerAddressBasePath },
  );
}
