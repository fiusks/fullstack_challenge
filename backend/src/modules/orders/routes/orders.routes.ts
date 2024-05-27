import { FastifyInstance } from 'fastify';
import { createOrderSchema } from './schemas';
import { CheckoutService } from '../application/services/checkout.service';
import { CreateOrderDto } from '../application/dtos';
import { PrismaOrderRepository } from '../infra';
import { customerRepositoryFactory } from '~/modules/customer/application';
import { productRepositoryFactory } from '~/modules/product/application/factories';
import { UserDto } from '~/modules/auth/application';

export default async function ordersRoutes(fastify: FastifyInstance) {
  const ordersRoute = 'orders';

  fastify.register(
    (customerAddressRoutes, opts, done) => {
      customerAddressRoutes.post<{ Body: CreateOrderDto }>('/', {
        onRequest: [fastify.authenticate],
        schema: {
          body: createOrderSchema,
        },
        handler: async (request, reply) => {
          const body = request.body;
          const user = request.user;
          console.log('🚀 ~ handler: ~ user:', user);
          const order = await new CheckoutService(
            new PrismaOrderRepository(fastify.prisma),
            productRepositoryFactory(fastify),
            customerRepositoryFactory(fastify),
          ).execute(body, user as UserDto);

          reply.send(order).status(201);
        },
      });

      done();
    },
    { prefix: ordersRoute },
  );
}
