import { FastifyInstance } from 'fastify';

export async function incomingRoutes(fastify: FastifyInstance, opts) {
    fastify.addHook('preHandler', async (request, reply) => {
        console.log({ 'request-id': request.id, 'correlation-id': reply.getHeader('x-correlation-id') });
    });

    fastify.get('/', async (request, reply) => {
        return { hello: 'world' };
    });
}
