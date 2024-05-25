import { FastifyInstance } from 'fastify';
import {
  CreateCustomerDto,
  UpdateCustomerDto,
  createCustomerServiceFactory,
  deleteCustomerServiceFactory,
  findCustomerServiceFactory,
  updateCustomerServiceFactory,
} from '../application';
import { createCustomerSchema, updateCustomerSchema } from './schemas';

export default async function customerRoutes(fastify: FastifyInstance) {
  const customerAddressBasePath = 'customer';

  fastify.register(
    (customerAddressRoutes, opts, done) => {
      customerAddressRoutes.get('/:customerId', async (request, reply) => {
        const address = await findCustomerServiceFactory(fastify).execute(
          //@ts-ignore
          request.params['customerId'],
        );

        reply.send(address).status(200);
      });

      customerAddressRoutes.post<{ Body: CreateCustomerDto }>('/', {
        schema: { body: createCustomerSchema },
        handler: async (request, reply) => {
          const newAddress = await createCustomerServiceFactory(
            fastify,
          ).execute(request.body);

          reply.send(newAddress).status(200);
        },
      });

      customerAddressRoutes.delete('/:id', async (request, reply) => {
        await deleteCustomerServiceFactory(fastify).execute(
          //@ts-ignore
          request.params['id'],
        );

        reply.send().status(200);
      });

      customerAddressRoutes.put<{ Body: UpdateCustomerDto }>('/', {
        schema: { body: updateCustomerSchema },
        handler: async (request, reply) => {
          const updatedAddress = updateCustomerServiceFactory(fastify).execute(
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
