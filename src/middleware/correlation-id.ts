import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import fastifyPlugin from 'fastify-plugin';
import * as uuid from 'uuid';

export async function correlationIdMiddleware(fastify: FastifyInstance, opts) {
    fastify.addHook('preHandler', async (request: FastifyRequest, reply: FastifyReply) => {
        if (request.headers['x-correlation-id']) {
            reply.header('x-correlation-id', request.headers['x-correlation-id']);
        } else {
            reply.header('x-correlation-id', uuid.v4());
        }
    });
}

fastifyPlugin(correlationIdMiddleware);
