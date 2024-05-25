import fastify from 'fastify';
import prismaPlugin from './modules/common/infra/http/fastify';

const app = fastify();

app.register(prismaPlugin);

app.listen({ port: 3333 }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`app listening at ${address}`);
});
