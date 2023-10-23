import { FastifyInstance, FastifyPluginAsync } from 'fastify';
import scheduleService from '@services/scheduleService';
import onError from '@hooks/onError';
import * as Schedule from '@DTO/schedule.dto';
import checkUser from '@hooks/checkUser';

const api: FastifyPluginAsync = async (server: FastifyInstance) => {
  server.post<Schedule.createScheduleInterface>(
    '/createSchedule',
    {
      onError,
      schema: Schedule.createScheduleSchema,
      preValidation: checkUser,
    },
    async (request, reply) => {
      const result = await scheduleService.createSchedule(request.body);
      reply.code(201).send(result);
    }
  );

  server.get<Schedule.getWeekSchedulesInterface>(
    '/getWeekSchedule',
    {
      onError,
      schema: Schedule.getWeekSchedulesSchema,
      preValidation: checkUser,
    },
    async (request, reply) => {
      const result = await scheduleService.getWeekSchedule(request.query);
      reply.code(200).send(result);
    }
  );
};

export default api;
