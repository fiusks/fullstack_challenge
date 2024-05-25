// src/modules/customer/routes/customerRoutes.ts
import { FastifyInstance } from 'fastify';
import {
  CreateCustomerAddressDto,
  createCustomerAddressServiceFactory,
  deleteCustomerAddressServiceFactory,
  findCustomerAddressServiceFactory,
  updateCustomerAddressServiceFactory,
} from '../application';
import {
  createCustomerAddressSchema,
  deleteCustomerAddressSchema,
  findCustomerAddressSchema,
} from './schemas';

export default async function customerAddressRoutes(fastify: FastifyInstance) {
  const customerAddressBasePath = 'customer-address';

  fastify.register(
    (customerAddressRoutes, opts, done) => {
      customerAddressRoutes.get<{ Params: { id: string } }>('/:customerId', {
        schema: { params: { findCustomerAddressSchema } },
        handler: async (request, reply) => {
          const { id } = request.params;
          const address =
            await findCustomerAddressServiceFactory(fastify).execute(id);

          reply.send(address).status(200);
        },
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

      customerAddressRoutes.delete<{ Params: { id: string } }>('/:id', {
        schema: { params: deleteCustomerAddressSchema },
        handler: async (request, reply) => {
          const { id } = request.params;
          await deleteCustomerAddressServiceFactory(fastify).execute(id);

          reply.send().status(200);
        },
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
