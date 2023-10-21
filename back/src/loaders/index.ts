import { FastifyInstance } from 'fastify';
import api from '@api';
import swagger from '@fastify/swagger';
import swaggerUI from '@fastify/swagger-ui';
import config from '@config';

export default async (server: FastifyInstance): Promise<void> => {
  server.register(swagger, {
    prefix: '/docs',
    swagger: {
      info: {
        title: 'Schedule API',
        version: '0.1.0',
      },
      consumes: ['application/json'],
      produces: ['application/json'],
      securityDefinitions: {
        Authorization: {
          type: 'apiKey',
          name: 'authorization',
          in: 'header',
        },
      },
      security: [
        {
          Authorization: [],
        },
      ],
    },
  });
  server.register(swaggerUI, {
    prefix: '/docs',
    uiConfig: {
      docExpansion: 'full',
      deepLinking: false,
    },
    uiHooks: {
      onRequest: (request, reply, next) => {
        next();
      },
    },
    staticCSP: true,
    transformStaticCSP: (header) => header,
    transformSpecification: (swaggerObject, request, reply) => {
      return swaggerObject;
    },
    transformSpecificationClone: true,
  });

  server.register(api, { prefix: '/api' });
};
