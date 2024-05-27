import { FastifyInstance } from 'fastify';
import {
  UpdateCustomerDto,
  deleteCustomerServiceFactory,
  findCustomerServiceFactory,
  updateCustomerServiceFactory,
} from '../application';
import { updateCustomerSchema } from './schemas';

export default async function customerRoutes(fastify: FastifyInstance) {
  const customerBasePath = 'customers';

  fastify.register(
    (customerAddressRoutes, opts, done) => {
      customerAddressRoutes.get<{ Params: { customerId: 'string' } }>('/', {
        onRequest: [fastify.authenticate],
        schema: { params: { customerId: { type: 'string' } } },
        handler: async (request, reply) => {
          const customerId = (request.user as any).sub;
          const customer =
            await findCustomerServiceFactory(fastify).execute(customerId);

          reply.send(customer).status(200);
        },
      });

      customerAddressRoutes.delete<{ Params: { id: string } }>(
        '/:id',
        async (request, reply) => {
          const { id } = request.params;
          await deleteCustomerServiceFactory(fastify).execute(id);
          reply.send().status(200);
        },
      );

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
    { prefix: customerBasePath },
  );
}
