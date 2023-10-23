import { FastifyInstance, FastifyPluginAsync, FastifySchema } from 'fastify';
import test from '@routes/apiTest';
import manager from '@routes/manager';
import worker from '@routes/worker';
import schedule from '@routes/schedule';

const api: FastifyPluginAsync = async (server: FastifyInstance) => {
  server.register(test, { prefix: '/' });
  server.register(manager, { prefix: '/manager' });
  server.register(worker, { prefix: '/worker' });
  server.register(schedule, { prefix: '/schedule' });
};

export default api;
