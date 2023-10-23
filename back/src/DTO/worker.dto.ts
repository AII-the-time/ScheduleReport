import {
  AuthorizationHeader,
  errorSchema,
  SchemaToInterface,
} from '@DTO/index.dto';
import * as E from '@errors';

export const phoneSchema = {
  tags: ['manager'],
  summary: '사용자 휴대폰으로 인증번호 발송',
  headers: AuthorizationHeader,
  body: {
    type: 'object',
    required: ['phone'],
    properties: {
      phone: {
        type: 'string',
      },
    },
  },
  response: {
    200: {
      type: 'object',
      description: 'success response',
      required: ['tokenForCertificatePhone'],
      properties: {
        tokenForCertificatePhone: { type: 'string' },
      },
    },
  },
} as const;

export const certificatePhoneSchema = {
  tags: ['manager'],
  summary: '인증 번호 확인',
  headers: AuthorizationHeader,
  body: {
    type: 'object',
    required: ['phone', 'certificationCode', 'phoneCertificationToken'],
    properties: {
      phone: { type: 'string' },
      certificationCode: { type: 'string' },
      phoneCertificationToken: { type: 'string' },
    },
  },
  response: {
    200: {
      type: 'object',
      description: 'success response',
      required: ['certificatedPhoneToken'],
      properties: {
        certificatedPhoneToken: { type: 'string' },
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

export const getWorkerListSchema = {
  tags: ['manager'],
  summary: '근무자 리스트 조회',
  headers: AuthorizationHeader,
  response: {
    200: {
      type: 'object',
      description: 'success response',
      required: ['workerList'],
      properties: {
        workerList: {
          type: 'array',
          items: {
            type: 'object',
            required: ['name', 'phoneNumber'],
            properties: {
              name: { type: 'string' },
              phoneNumber: { type: 'string' },
            },
          },
        },
      },
    },
  },
  ...errorSchema(
    E.NotFoundError,
    E.UserAuthorizationError,
    E.StoreAuthorizationError,
    E.NoAuthorizationInHeaderError
  ),
} as const;

export const registerWorkerSchema = {
  tags: ['worker'],
  summary: '근무자 등록',
  headers: AuthorizationHeader,
  body: {
    type: 'object',
    required: ['name', 'certificatedPhoneToken', 'managerId'],
    properties: {
      certificatedPhoneToken: { type: 'string' },
      managerId: { type: 'number' },
      name: { type: 'string' },
    },
  },
  response: {
    201: {
      type: 'object',
      description: 'success response',
      required: ['workerId'],
      properties: {
        workerId: { type: 'number' },
      },
    },
    ...errorSchema(
      E.NotFoundError,
      E.UserAuthorizationError,
      E.StoreAuthorizationError,
      E.NoAuthorizationInHeaderError
    ),
  },
} as const;

export type phoneInterface = SchemaToInterface<typeof phoneSchema> & {
  Body: { userId: number };
};
export type certificatePhoneInterface = SchemaToInterface<
  typeof certificatePhoneSchema
> & { Body: { userId: number } };
export type getWorkerListInterface = SchemaToInterface<
  typeof getWorkerListSchema
> & {
  Body: {
    userId: number;
  };
};
export type registerWorkerInterface = SchemaToInterface<
  typeof registerWorkerSchema
> & {
  Body: {
    userId: number;
  };
};
