import {
  AuthorizationHeader,
  errorSchema,
  SchemaToInterface,
} from '@DTO/index.dto';
import * as E from '@errors';

export const getAllSchedulesSchema = {
  tags: ['schedule'],
  summary: '스케줄 조회',
  headers: AuthorizationHeader,
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
            required: ['id', 'name', 'start', 'end'],
            properties: {
              id: { type: 'number' },
              name: { type: 'string' },
              start: { type: 'string' },
              end: { type: 'string' },
            },
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
} as const;

export const createScheduleSchema = {
  tags: ['schedule'],
  summary: '스케줄 생성',
  headers: AuthorizationHeader,
  body: {
    type: 'object',
    required: ['name', 'start', 'end'],
    properties: {
      name: { type: 'string' },
      start: { type: 'string' },
      end: { type: 'string' },
    },
  },
  response: {
    200: {
      type: 'object',
      description: 'success response',
      required: ['schedule'],
      properties: {
        schedule: {
          type: 'object',
          required: ['id', 'name', 'start', 'end'],
          properties: {
            id: { type: 'number' },
            name: { type: 'string' },
            start: { type: 'string' },
            end: { type: 'string' },
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

export type getAllSchedulesInterface = SchemaToInterface<
  typeof getAllSchedulesSchema
>;
export type createScheduleInterface = SchemaToInterface<
  typeof createScheduleSchema
> & { Body: { name: string; start: string; end: string } };
