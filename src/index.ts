import config from 'config';
import Fastify from 'fastify';
import swStats from 'swagger-stats';
import * as uuid from 'uuid';

import { correlationIdMiddleware } from '@/middleware/correlation-id.js';
import { incomingRoutes } from '@/routes/index.js';

import { swaggerStatsPlugin } from './middleware/swagger-stats.js';

const fastify = Fastify({
    genReqId: (req) => {
        return uuid.v4();
    },
    logger: true,
});

// register plugins
let swsMiddleware = swStats.getMiddleware(config.get('swaggerStats'));
await fastify.register(swaggerStatsPlugin, { swsExpressMiddleware: swsMiddleware });
await fastify.register(correlationIdMiddleware);

// register routes
await fastify.register(incomingRoutes);

// Run the server!
try {
    await fastify.listen({ port: 3000 });
} catch (err) {
    fastify.log.error(err);
    process.exit(1);
}
