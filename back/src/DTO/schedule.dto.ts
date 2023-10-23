import {
  AuthorizationHeader,
  errorSchema,
  SchemaToInterface,
} from '@DTO/index.dto';
import * as E from '@errors';

export const getWeekSchedulesSchema = {
  tags: ['schedule'],
  summary: '스케줄 조회',
  headers: AuthorizationHeader,
  querystring: {
    type: 'object',
    required: ['date'],
    properties: {
      date: { type: 'string', format: 'date-time' },
    },
  },
  response: {
    200: {
      type: 'object',
      description: 'success response',
      required: ['schedules'],
      properties: {
        schedules: {
          type: 'array',
          items: {
            type: 'object',
            required: ['id', 'name', 'startTime', 'endTime', 'date'],
            properties: {
              id: { type: 'number' },
              name: { type: 'string' },
              startTime: { type: 'number' },
              endTime: { type: 'number' },
              date: { type: 'string', format: 'date-time' },
            },
          },
        },
      },
      ...errorSchema(
        E.NotFoundError,
        E.UserAuthorizationError,
        E.StoreAuthorizationError,
        E.NoAuthorizationInHeaderError,
        E.UncorrectTokenError
      ),
    },
  },
} as const;

export const createScheduleSchema = {
  tags: ['schedule'],
  summary: '스케줄 생성',
  headers: AuthorizationHeader,
  body: {
    type: 'object',
    required: ['workerId', 'name', 'start', 'end', 'date'],
    properties: {
      workerId: { type: 'number' },
      name: { type: 'string' },
      start: { type: 'number' },
      end: { type: 'number' },
      date: { type: 'string', format: 'date-time' },
    },
  },
  response: {
    201: {
      type: 'object',
      description: 'success response',
      required: ['scheduleId'],
      properties: {
        scheduleId: { type: 'number' },
      },
    },
    ...errorSchema(
      E.NotFoundError,
      E.UserAuthorizationError,
      E.StoreAuthorizationError,
      E.NoAuthorizationInHeaderError,
      E.UncorrectTokenError
    ),
  },
} as const;

export type getWeekSchedulesInterface = SchemaToInterface<
  typeof getWeekSchedulesSchema
> & {
  Body: {
    userId: number;
  };
};

export type createScheduleInterface = SchemaToInterface<
  typeof createScheduleSchema
> & { Body: { userId: number } };
