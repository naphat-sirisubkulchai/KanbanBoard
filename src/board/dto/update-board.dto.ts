import {IsNotEmpty, IsString } from 'class-validator';

export class UpdateBoardDto {
    @IsNotEmpty()
    @IsString()
    name: string;
  }