import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    const { email } = createUserDto;
    const userExists = await this.prisma.user.findUnique({
        where: { email },
      });
      if (userExists) {
        throw new Error('User already exists');
      }
    return this.prisma.user.create({
      data: {
        email: createUserDto.email,
        password: hashedPassword,
      },
    });
  }

  async findOne(id: string) {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }
  

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.prisma.user.update({
      where: { id },
      data: updateUserDto,
    });
    if (!user) {
        throw new NotFoundException('User not found');
    }
    return user;
  }

  async remove(id: string) {
    const user = await this.prisma.user.delete({
      where: { id },
    });
    if (!user) {
        throw new NotFoundException('User not found');
    }
    return user;
  }

  
}
