import { Controller, Post, Body, Param, Delete, Put, Get } from '@nestjs/common';
import { ColumnService } from './column.service';
import { CreateColumnDto } from './dto/create-column.dto';
import { UpdateColumnDto } from './dto/update-column.dto';

@Controller('columns')
export class ColumnController {
  constructor(private readonly columnService: ColumnService) {}

  @Post()
  async create(@Body() createColumnDto: CreateColumnDto) {
    return this.columnService.create(createColumnDto);
  }
  
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.columnService.findOne(id);
}

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateColumnDto: UpdateColumnDto) {
    return this.columnService.update(id, updateColumnDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.columnService.remove(id);
  }
}