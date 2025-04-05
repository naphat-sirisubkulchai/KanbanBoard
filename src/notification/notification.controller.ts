import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { NotificationService } from './notification.service';
@Controller('notifications')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

    @Get('notiuser/:userId')
    async findAll(@Param('userId') userId: string) {
        return this.notificationService.findAll(userId);
    }

    @Get(':id')
    async findOne(@Param('id') id: string) {
        return this.notificationService.findOne(id);
    }

    @Put(':id')
    async update(@Param('id') id: string) {
        return this.notificationService.Read(id); 
    }

    @Delete(':id')
    async remove(@Param('id') id: string) {
        return this.notificationService.remove(id);
    }
}
