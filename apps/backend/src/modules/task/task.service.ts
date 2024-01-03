import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, Repository } from 'typeorm';

import { Task } from './task.entity';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private taskRepository: Repository<Task>,
  ) {}

  async getTasksForSpecificDay(date: string): Promise<Task[]> {
    const startDate = new Date(date);
    startDate.setHours(0, 0, 0, 0);

    const endDate = new Date(date);
    endDate.setHours(23, 59, 59, 999);

    const tasks = await this.taskRepository.find({
      where: {
        dateCreated: Between(startDate.toISOString(), endDate.toISOString()),
      },
      order: {
        order: 'ASC',
      },
    });

    return tasks;
  }
}
