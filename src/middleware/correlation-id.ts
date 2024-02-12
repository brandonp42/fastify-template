import { FastifyInstance } from 'fastify';
import * as uuid from 'uuid';

export async function correlationIdMiddleware(fastify: FastifyInstance, opts) {
    fastify.addHook('preHandler', async (request, reply) => {
        if (request.headers['x-correlation-id']) {
            reply.header('x-correlation-id', request.headers['x-correlation-id']);
        } else {
            reply.header('x-correlation-id', uuid.v4());
        }
    });
}

correlationIdMiddleware[Symbol.for('skip-override')] = true;
