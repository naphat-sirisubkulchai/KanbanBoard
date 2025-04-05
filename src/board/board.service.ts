import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';

@Injectable()
export class BoardService {
  constructor(private prisma: PrismaService) {}

  async create(createBoardDto: CreateBoardDto) {
    const { name, ownerId } = createBoardDto;
    
    const userExists = await this.prisma.user.findUnique({
      where: { id: ownerId },
    });

    if (!userExists) {
      throw new NotFoundException('User not found');
    }

    return this.prisma.board.create({
      data: {
        name,
        ownerId,
      },
    });
  }

  async update(id: string, updateBoardDto: UpdateBoardDto) {
    const { name } = updateBoardDto;
    
    const board = await this.prisma.board.findUnique({
      where: { id },
    });

    if (!board) {
      throw new NotFoundException('Board not found');
    }

    return this.prisma.board.update({
      where: { id },
      data: { name },
    });
  }

  async remove(id: string) {
    const board = await this.prisma.board.findUnique({
      where: { id },
    });
    if (!board) {
      throw new NotFoundException('Board not found');
    }
  
  
    const columns = await this.prisma.column.findMany({
      where: { boardId: id },
      select: { id: true },
    });
  
    const columnIds = columns.map((col) => col.id);
  
    await this.prisma.task.deleteMany({
      where: {
        columnId: { in: columnIds },
      },
    });
  
    await this.prisma.column.deleteMany({
      where: { boardId: id },
    });
  
    await this.prisma.boardMember.deleteMany({
      where: { boardId: id },
    });
  
    return this.prisma.board.delete({
      where: { id },
    });
  }

  async inviteMember(boardId: string, userId: string) {

    const board = await this.prisma.board.findUnique({
      where: { id: boardId },
    });
    if (!board) {
      throw new NotFoundException('Board not found');
    }

    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    return this.prisma.boardMember.create({
      data: {
        boardId,
        userId,
      },
    });
  }
  async findOne(id: string) {
    const board = await this.prisma.board.findUnique({
      where: { id },
      include: {
        members: true, 
        columns: true,
      },
    });
  
    if (!board) {
      throw new NotFoundException('Board not found');
    }
  
    return board;
  }
}
