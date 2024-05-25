import env from './env';

import fastify from 'fastify';
import prismaPlugin from './modules/common/infra/http/fastify/plugins/prisma';
import productRoutes from './modules/product/routes/product.routes';
import categoryRoutes from './modules/product/routes/category.routes';
import customerRoutes from './modules/customer/routes/customer.routes';
import fastifyJwt from '@fastify/jwt';
import { loginRoute, signUpRoute } from './modules/auth/routes';
import customerAddressRoutes from './modules/customerAddress/routes/customer-address.routes';

const app = fastify();

app.register(prismaPlugin);
app.register(fastifyJwt, {
  secret: 'my-super-secret',
});

signUpRoute(app);
loginRoute(app);

customerAddressRoutes(app);
productRoutes(app);
categoryRoutes(app);
customerRoutes(app);

app.listen({ port: env.PORT }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`app listening at ${address}`);
});
