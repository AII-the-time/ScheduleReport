import { FastifyInstance, FastifyPluginAsync } from 'fastify';
import workerService from '@services/workerService';
import onError from '@hooks/onError';
import * as Worker from '@DTO/worker.dto';
import checkUser from '@hooks/checkUser';

const api: FastifyPluginAsync = async (server: FastifyInstance) => {
  server.post<Worker.phoneInterface>(
    '/phone',
    { onError, schema: Worker.phoneSchema, preValidation: checkUser },
    async (request, reply) => {
      const result = await workerService.sendCertificationCode(request.body);
      reply.code(200).send(result);
    }
  );

  server.post<Worker.certificatePhoneInterface>(
    '/phone/certificationCode',
    {
      onError,
      schema: Worker.certificatePhoneSchema,
      preValidation: checkUser,
    },
    async (request, reply) => {
      const result = await workerService.certificatePhone(request.body);
      reply.code(200).send(result);
    }
  );

  server.post<Worker.registerWorkerInterface>(
    '/register',
    { onError, schema: Worker.registerWorkerSchema, preValidation: checkUser },
    async (request, reply) => {
      const result = await workerService.createWorker(request.body);
      reply.code(201).send(result);
    }
  );

  server.get<Worker.getWorkerListInterface>(
    '/getWorkerList',
    { onError, schema: Worker.getWorkerListSchema, preValidation: checkUser },
    async (request, reply) => {
      const result = await workerService.getWorkerList(request.body);
      reply.code(200).send(result);
    }
  );
};

export default api;
