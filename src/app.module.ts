import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { BoardModule } from './board/board.module';
import { ColumnModule } from './column/column.module';
import { TaskModule } from './task/task.module';
import { NotificationModule } from './notification/notification.module';
import { PrismaService } from './prisma.service';
import { TagModule } from './tag/tag.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }),AuthModule, UserModule, BoardModule, ColumnModule, TaskModule, NotificationModule, TagModule],
  providers: [PrismaService],
})
export class AppModule {}