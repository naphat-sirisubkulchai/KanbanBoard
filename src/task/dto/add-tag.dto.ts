import { IsNotEmpty, IsString } from 'class-validator';

export class AddTagDto {
  @IsNotEmpty()
  @IsString()
  taskId: string;

  @IsNotEmpty()
  @IsString()
  tagId: string;
}