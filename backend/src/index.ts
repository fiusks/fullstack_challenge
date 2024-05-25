import fastify from 'fastify';
import customerAddressRoutes from './modules/customerAddress/routes/customer.-address.routes';
import prismaPlugin from './modules/common/infra/http/fastify/plugins/prisma';
import productRoutes from './modules/product/routes/product.routes';
import categoryRoutes from './modules/product/routes/category.routes';
import customerRoutes from './modules/customer/routes/customer.routes';

const app = fastify();

app.register(prismaPlugin);

customerAddressRoutes(app);
productRoutes(app);
categoryRoutes(app);
customerRoutes(app);

app.listen({ port: 3333 }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`app listening at ${address}`);
});
