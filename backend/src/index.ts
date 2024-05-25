import fastify from 'fastify';
import prismaPlugin from './modules/plugin/prisma';

const app = fastify();

app.register(prismaPlugin);

app.get('/category', async (request, reply) => {
  const users = await app.prisma.category.findMany();
  return users;
});

app.listen({ port: 3333 }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`app listening at ${address}`);
});
