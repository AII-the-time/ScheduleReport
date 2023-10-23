import { Prisma, PrismaClient } from '@prisma/client';
import * as Schedule from '@DTO/schedule.dto';
import * as E from '@errors';
const prisma = new PrismaClient();

export default {
  async createSchedule({
    workerId,
    name,
    start,
    end,
    date,
  }: Schedule.createScheduleInterface['Body']): Promise<
    Schedule.createScheduleInterface['Reply']['201']
  > {
    const workSchdule = await prisma.schedule.create({
      data: {
        workerId: workerId,
        startTime: start!,
        endTime: end!,
        date: date,
        workerName: name,
      },
    });
    return { scheduleId: workSchdule.id };
  },

  async getWeekSchedule({
    date,
  }: Schedule.getWeekSchedulesInterface['Querystring']): Promise<
    Schedule.getWeekSchedulesInterface['Reply']['200']
  > {
    const rowDate = new Date(date);
    const krDate = new Date(
      new Date(rowDate.getTime() + 9 * 60 * 60 * 1000)
        .toISOString()
        .split('T')[0]
    );
    const yoyil = krDate.getDay();
    const utcStartDate = new Date(
      krDate.getTime() - yoyil * 24 * 60 * 60 * 1000 - 9 * 60 * 60 * 1000
    );
    const utcEndDate = new Date(
      utcStartDate.getTime() + 6 * 24 * 60 * 60 * 1000
    );
    const scheduleList = await prisma.schedule.findMany({
      where: {
        date: {
          gte: utcStartDate,
          lt: utcEndDate,
        },
      },
      orderBy: {
        date: 'asc',
      },
    });

    const list = scheduleList.map((schedule) => {
      return {
        id: schedule.id,
        name: schedule.workerName,
        startTime: schedule.startTime,
        endTime: schedule.endTime,
        date: new Date(schedule.date).toISOString(),
      };
    });
    return { schedules: list };
  },
};
