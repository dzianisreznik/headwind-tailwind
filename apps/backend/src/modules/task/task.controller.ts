import { Controller, Get, Query } from '@nestjs/common';

import { Task } from './task.entity';
import { TaskService } from './task.service';

@Controller('tasks')
export class TaskController {
  constructor(private taskService: TaskService) {}

  @Get()
  getTasksByDate(@Query('date') date: string): Promise<Task[]> {
    return this.taskService.getTasksForSpecificDay(date);
  }
}
