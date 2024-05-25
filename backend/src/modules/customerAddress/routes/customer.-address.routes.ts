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
  const customerAddressBasePath = 'customer-address';

  fastify.register(
    (customerAddressRoutes, opts, done) => {
      customerAddressRoutes.get('/:customerId', async (request, reply) => {
        const address = await findCustomerAddressServiceFactory(
          fastify,
        ).execute(request.params['customerId']);

        reply.send(address).status(200);
      });

      customerAddressRoutes.post<{ Body: CreateCustomerAddressDto }>('/', {
        schema: { body: createCustomerAddressSchema },
        handler: async (request, reply) => {
          const newAddress = await createCustomerAddressServiceFactory(
            fastify,
          ).execute(request.body);

          reply.send(newAddress).status(200);
        },
      });

      customerAddressRoutes.delete('/:id', async (request, reply) => {
        await deleteCustomerAddressServiceFactory(fastify).execute(
          request.params['id'],
        );

        reply.send().status(200);
      });

      customerAddressRoutes.put<{ Body: CreateCustomerAddressDto }>('/', {
        schema: { body: createCustomerAddressSchema },
        handler: async (request, reply) => {
          const updatedAddress = updateCustomerAddressServiceFactory(
            fastify,
          ).execute(request.body['id']);

          reply.send(updatedAddress).status(200);
        },
      });

      done();
    },
    { prefix: customerAddressBasePath },
  );
}
