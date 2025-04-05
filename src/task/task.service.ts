import { Injectable, NotFoundException, BadRequestException,ForbiddenException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { AddTagDto } from './dto/add-tag.dto';
import { NotificationService } from  '../notification/notification.service'; // Import Notification Service

@Injectable()
export class TaskService {
    constructor(
        private prisma: PrismaService,
        private notificationService: NotificationService, // Inject NotificationService
      ) {}

  async create(createTaskDto: CreateTaskDto) {
    const { name, columnId } = createTaskDto;
    
    const columnExists = await this.prisma.column.findUnique({
      where: { id: columnId },
    });
    if (!columnExists) {
      throw new NotFoundException(`Column with id ${columnId} not found`);
    }

    try {
      return await this.prisma.task.create({
        data: {
          name,
          columnId,
        },
      });
    } catch (error) {
      throw new BadRequestException('Failed to create task');
    }
  }

  async update(id: string, updateTaskDto: UpdateTaskDto) {
    const task = await this.prisma.task.findUnique({
      where: { id },
    });
    
    if (!task) {
      throw new NotFoundException('Task not found');
    }

    try {
      return await this.prisma.task.update({
        where: { id },
        data: updateTaskDto,
      });
    } catch (error) {
      throw new BadRequestException('Failed to update task');
    }
  }

  async remove(id: string) {
    const task = await this.prisma.task.findUnique({
      where: { id },
    });
  
    if (!task) {
      throw new NotFoundException('Task not found');
    }
  
    try {
      await this.prisma.task.update({
        where: { id },
        data: {
          tags: {
            set: [], 
          },
        },
      });

      await this.prisma.tag.deleteMany({
        where: {
          tasks: {
            none: {}, 
          },
        },
      });
  
  
      return await this.prisma.task.delete({
        where: { id },
      });
    } catch (error) {
      throw new BadRequestException('Failed to delete task');
    }
  }

  async findOne(id: string) {
    const task = await this.prisma.task.findUnique({
      where: { id },
    });
    
    if (!task) {
      throw new NotFoundException('Task not found');
    }
    
    return task;
  }


  async addTagToTask(addTagDto: AddTagDto) {
    const task = await this.prisma.task.findUnique({ where: { id: addTagDto.taskId } });
    if (!task) throw new NotFoundException('Task not found');

    return this.prisma.task.update({
      where: { id: addTagDto.taskId },
      data: {
        tags: {
          connect: { id: addTagDto.tagId },
        },
      },
    });
  }
  
  async assignUserToTask(taskId: string, userId: string) {
    const task = await this.prisma.task.findUnique({
      where: { id: taskId },
    });
  
    if (!task) {
      throw new NotFoundException('Task not found');
    }
  
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });
  
    if (!user) {
      throw new NotFoundException('User not found');
    }
  
    await this.prisma.task.update({
      where: { id: taskId },
      data: {
        assignees: {
          connect: { id: userId },
        },
      },
    });
  
    
    await this.notificationService.create({
      userId: userId,
      message: `You have been assigned to the task: ${task.name}`,
    });
  
    return { message: `User ${user.id} has been assigned to the task.` };
  }

  async assignUserInBoardToTask(taskId: string, userId: string) {
    const task = await this.prisma.task.findUnique({
      where: { id: taskId },
      include: {
        column: {
          include: {
            board: true, 
          },
        },
      },
    });

    if (!task) {
      throw new NotFoundException('Task not found');
    }

    const isUserMemberOfBoard = await this.prisma.boardMember.findFirst({
      where: {
        userId: userId,
        boardId: task.column.boardId,
      },
    });

    if (!isUserMemberOfBoard) {
      throw new ForbiddenException('User is not a member of the board');
    }

    await this.prisma.task.update({
      where: { id: taskId },
      data: {
        assignees: {
          connect: { id: userId }, 
        },
      },
    });

    await this.notificationService.create({
      userId: userId,
      message: `You have been assigned to the task: ${task.name}`,
    });
    
    return { message: `User ${userId} has been assigned to the task.` };  
}


}


