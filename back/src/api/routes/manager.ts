import { FastifyInstance, FastifyPluginAsync } from 'fastify';
import managerService from '@services/managerService';
import onError from '@hooks/onError';
import * as User from '@DTO/manager.dto';
import checkUser from '@hooks/checkUser';

const api: FastifyPluginAsync = async (server: FastifyInstance) => {
  server.post<User.phoneInterface>(
    '/phone',
    { onError, schema: User.phoneSchema },
    async (request, reply) => {
      const result = await managerService.sendCertificationCode(request.body);
      reply.code(200).send(result);
    }
  );

  server.post<User.certificatePhoneInterface>(
    '/phone/certificationCode',
    { onError, schema: User.certificatePhoneSchema },
    async (request, reply) => {
      const result = await managerService.certificatePhone(request.body);
      reply.code(200).send(result);
    }
  );

  server.post<User.registerInterface>(
    '/register',
    { onError, schema: User.registerSchema },
    async (request, reply) => {
      const result = await managerService.create(request.body);
      reply.code(201).send(result);
    }
  );

  server.post<User.loginInterface>(
    '/login',
    { onError, schema: User.loginSchema },
    async (request, reply) => {
      const result = await managerService.login(request.body);
      reply.code(200).send(result);
    }
  );

  server.post<User.refreshInterface>(
    '/refresh',
    {
      schema: User.refreshSchema,
      onError,
      preValidation: checkUser,
    },
    async (request, reply) => {
      const result = await managerService.refresh(request.body);
      reply.code(200).send(result);
    }
  );
};

export default api;
