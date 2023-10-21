import {
  AuthorizationHeader,
  errorSchema,
  SchemaToInterface,
} from '@DTO/index.dto';
import * as E from '@errors';

export const phoneSchema = {
  tags: ['manager'],
  summary: '사용자 휴대폰으로 인증번호 발송',
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

export const loginSchema = {
  tags: ['manager'],
  summary: '로그인',
  body: {
    type: 'object',
    required: ['businessRegistrationNumber', 'certificatedPhoneToken'],
    properties: {
      businessRegistrationNumber: { type: 'string' },
      certificatedPhoneToken: { type: 'string' },
    },
  },
  response: {
    200: {
      type: 'object',
      description: 'success response',
      required: ['accessToken', 'refreshToken'],
      properties: {
        accessToken: { type: 'string' },
        refreshToken: { type: 'string' },
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

export const refreshSchema = {
  tags: ['manager'],
  summary: '사용자 휴대폰으로 인증번호 발송',
  headers: AuthorizationHeader,
  response: {
    200: {
      type: 'object',
      description: 'success response',
      required: ['accessToken', 'refreshToken'],
      properties: {
        accessToken: { type: 'string' },
        refreshToken: { type: 'string' },
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

export type phoneInterface = SchemaToInterface<typeof phoneSchema>;
export type certificatePhoneInterface = SchemaToInterface<
  typeof certificatePhoneSchema
>;
export type loginInterface = SchemaToInterface<typeof loginSchema>;
export type refreshInterface = SchemaToInterface<typeof refreshSchema> & {
  Body: { userId: number };
};
