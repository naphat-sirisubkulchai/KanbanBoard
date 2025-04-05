import { Controller, Post, Body, Param, Get,Put, Delete } from '@nestjs/common';
import { BoardService } from './board.service';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';

@Controller('boards')
export class BoardController {
    constructor(private readonly boardService: BoardService) {}

    @Post()
    async create(@Body() createBoardDto: CreateBoardDto) {
        return this.boardService.create(createBoardDto);
    }

    @Put(':id')
    async update(
    @Param('id') id: string,
    @Body() updateBoardDto: UpdateBoardDto,
    )     {
        return this.boardService.update(id, updateBoardDto);
    }

    @Delete(':id')
    async remove(@Param('id') id: string) {
        return this.boardService.remove(id);
    }

    @Post(':boardId/invite/:userId')
    async inviteMember(
    @Param('boardId') boardId: string,
    @Param('userId') userId: string,){
        return this.boardService.inviteMember(boardId, userId);
    }

    @Get(':id')
    async findOne(@Param('id') id: string) {
        return this.boardService.findOne(id);
    }
}
