import {Controller,Post,Body,Param,Delete,Put,Get,} from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { AddTagDto } from './dto/add-tag.dto';
import { AssignUserDto } from './dto/assign-user.dto'; 

  
@Controller('tasks')
export class TaskController {
    constructor(private readonly taskService: TaskService) {}
  
    @Post()
    async create(@Body() createTaskDto: CreateTaskDto) {
      return this.taskService.create(createTaskDto);
    }
    
    @Get(':id')
    async findOne(@Param('id') id: string) {
        return this.taskService.findOne(id);
    }


    @Put(':id')
    async update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {
        return this.taskService.update(id, updateTaskDto);
    }
  
    @Delete(':id')
    async remove(@Param('id') id: string) {
        return this.taskService.remove(id);
    }
  
    @Post('add-tag')
    async addTag(@Body() dto: AddTagDto) {
        return this.taskService.addTagToTask(dto);
    }
    @Post(':taskId/assign')
    async assignUser(
    @Param('taskId') taskId: string,
    @Body() assignUserDto: AssignUserDto,) {
        return this.taskService.assignUserToTask(taskId, assignUserDto.userId);
    }

    @Post(':taskId/assign/inboard')
    async assignUserInBoard(
    @Param('taskId') taskId: string,
    @Body() assignUserDto: AssignUserDto,) {
        return this.taskService.assignUserInBoardToTask(taskId, assignUserDto.userId);
    }
  
  }