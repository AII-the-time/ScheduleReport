import { Prisma, PrismaClient } from '@prisma/client';
import * as Worker from '@DTO/worker.dto';
import * as E from '@errors';
import {
  TokenForCertificatePhone,
  CertificatedPhoneToken,
  LoginToken,
} from '@utils/jwt';
const prisma = new PrismaClient();

export default {
  async sendCertificationCode({
    phone,
  }: Worker.phoneInterface['Body']): Promise<
    Worker.phoneInterface['Reply']['200']
  > {
    //TODO: 인증번호 생성
    const certificationCode = '123456';
    const token = new TokenForCertificatePhone(phone, certificationCode).sign();
    return { tokenForCertificatePhone: token };
  },

  async certificatePhone({
    phone,
    certificationCode,
    phoneCertificationToken,
  }: Worker.certificatePhoneInterface['Body']): Promise<
    Worker.certificatePhoneInterface['Reply']['200']
  > {
    if (
      !TokenForCertificatePhone.verify(
        phoneCertificationToken,
        phone,
        certificationCode
      )
    ) {
      throw new E.UserAuthorizationError('인증번호가 일치하지 않습니다.');
    }
    const token = new CertificatedPhoneToken(phone).sign();
    return { certificatedPhoneToken: token };
  },

  async createWorker({
    name,
    certificatedPhoneToken,
    userId,
  }: Worker.registerWorkerInterface['Body']): Promise<
    Worker.registerWorkerInterface['Reply'][201]
  > {
    const certificatedPhone = CertificatedPhoneToken.decode(
      certificatedPhoneToken
    );
    const worker = await prisma.worker.create({
      data: {
        name: name,
        phoneNumber: certificatedPhone.phone,
        managerId: userId,
      },
    });
    return { workerId: worker.id };
  },

  async getWorkerList({
    userId,
  }: Worker.getWorkerListInterface['Body']): Promise<
    Worker.getWorkerListInterface['Reply']['200']
  > {
    const workers = await prisma.worker.findMany({
      where: {
        managerId: userId,
      },
    });
    const list = workers.map((worker) => {
      return {
        id: worker.id,
        name: worker.name,
        phoneNumber: worker.phoneNumber,
      };
    });

    return { workerList: list };
  },
};
