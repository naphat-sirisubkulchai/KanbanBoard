import { IsNotEmpty, IsString } from 'class-validator';

export class CreateColumnDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  boardId: string;
}