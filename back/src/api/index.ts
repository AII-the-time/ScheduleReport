import { FastifyInstance, FastifyPluginAsync, FastifySchema } from 'fastify';
import test from '@routes/apiTest';

const api: FastifyPluginAsync = async (server: FastifyInstance) => {
  server.register(test, { prefix: '/' });
};

export default api;
