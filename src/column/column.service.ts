import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateColumnDto } from './dto/create-column.dto';
import { UpdateColumnDto } from './dto/update-column.dto';

@Injectable()
export class ColumnService {
  constructor(private prisma: PrismaService) {}

  async create(createColumnDto: CreateColumnDto) {
    return this.prisma.column.create({data: createColumnDto,});
  }

  async update(id: string, updateColumnDto: UpdateColumnDto) {
    const column = await this.prisma.column.update({
        where: { id },
        data: updateColumnDto,
    });
    if (!column) {
        throw new NotFoundException('Column not found');
    }
        return column;
  }
  async findOne(id: string) {
    const column = await this.prisma.column.findUnique({
        where: { id },
        include: {
        tasks: true, 
        },
    });
    
    if (!column) {
        throw new NotFoundException('Column not found');
    }   
    return column;
    }
  async remove(id: string) {
    const column = await this.prisma.column.findUnique({ where: { id } });
    if (!column) {
      throw new NotFoundException('Column not found');
    }
    await this.prisma.task.deleteMany({
        where: { columnId: id },
      });
    
    return this.prisma.column.delete({
      where: { id },
    });
  }

}