import env from './env';
// import 'module-alias/register';

import cors from '@fastify/cors';
// import helmet from '@fastify/helmet';
// import ratelimit from '@fastify/rate-limit';
import fastify from 'fastify';

import { signUpRoute, loginRoute } from './modules/auth';
import authenticate from './modules/common/infra/http/fastify/plugins/jwt';
import prismaPlugin from './modules/common/infra/http/fastify/plugins/prisma';
import customerRoutes from './modules/customer/routes/customer.routes';
import customerAddressRoutes from './modules/customerAddress/routes/customer-address.routes';
import categoryRoutes from './modules/product/routes/category.routes';
import productRoutes from './modules/product/routes/product.routes';
import ordersRoutes from './modules/orders/routes/orders.routes';

const app = fastify();

app.register(prismaPlugin);
app.register(authenticate);

// TODO setupSecurity(app); <-- CORS, helmet, rate-limit, jwt

// or customize CORS options
app.register(cors, {
  // TODO add cors to environment variables
  // origin: ['http://localhost:3000'], // Allow requests from this origin
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allow these methods
  credentials: true, // Allow credentials (cookies, authorization headers, etc.)
});
// app.register(ratelimit, {
//   max: 1_000,
//   timeWindow: '1 minute',
// });
// fastify.register(helmet);

// TODO setupRoutes(app);
signUpRoute(app);
loginRoute(app);

customerAddressRoutes(app);
productRoutes(app);
categoryRoutes(app);
customerRoutes(app);

ordersRoutes(app);

app.listen({ port: env.PORT }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`app listening at ${address}`);
});
