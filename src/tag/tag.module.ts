import { Module } from '@nestjs/common';
import { TagService } from './tag.service';
import { TagController } from './tag.controller';
import { PrismaService } from 'src/prisma.service';  // ใช้ PrismaService ที่มีอยู่

@Module({
  imports: [],
  controllers: [TagController],
  providers: [TagService, PrismaService],
})
export class TagModule {}