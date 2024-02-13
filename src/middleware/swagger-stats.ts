import fastifyExpress from '@fastify/express';
import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import fastifyPlugin from 'fastify-plugin';

declare module 'http' {
    interface IncomingMessage {
        sws?: any;
    }
}

export async function swaggerStatsPlugin(fastify: FastifyInstance, opts) {
    await fastify.register(fastifyExpress);
    fastify.use(opts.swsExpressMiddleware);

    fastify.addHook('onResponse', (request: FastifyRequest, reply: FastifyReply, done) => {
        request.raw.sws = request.raw.sws || ({} as any);
        if (
            'routeOptions' in reply &&
            'config' in (reply.routeOptions as { config: { url: string } }).config &&
            'url' in (reply.routeOptions as { config: { url: string } }).config
        ) {
            request.raw.sws.route_path = (reply.routeOptions as { config: { url: string } }).config.url;
        }
        done();
    });
}

fastifyPlugin(swaggerStatsPlugin);
