import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class NotificationService {
  constructor(private prisma: PrismaService) {}

  async create(createNotificationDto: { userId: string; message: string }) {
    const { userId, message } = createNotificationDto;

    try {
      return await this.prisma.notification.create({
        data: {
          userId,
          message,
          read: false, 
        },
      });
    } catch (error) {
      throw new Error('Failed to create notification');
    }
  }
  async findAll(userId: string) {
          return this.prisma.notification.findMany({
              where: { userId },
              orderBy: {
              createdAt: 'desc',  
        },
      });
    }
  
    async findOne(id: string) {
      const notification = await this.prisma.notification.findUnique({
        where: { id },
      });
  
      if (!notification) {
        throw new NotFoundException('Notification not found');
      }
  
      return notification;
    }
  
    async Read(id: string) {
        const notification = await this.prisma.notification.findUnique({
          where: { id },
        });
      
        if (!notification) {
          throw new NotFoundException('Notification not found');
        }
      
        return this.prisma.notification.update({
          where: { id },
          data: {
            read: true, 
          },
        });
      }
  
    async remove(id: string) {
      const notification = await this.prisma.notification.findUnique({
        where: { id },
      });
  
      if (!notification) {
        throw new NotFoundException('Notification not found');
      }
  
      return this.prisma.notification.delete({
        where: { id },
      });
    }
}
