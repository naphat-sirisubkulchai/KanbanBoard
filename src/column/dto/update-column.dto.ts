import { IsOptional, IsString } from 'class-validator';

export class UpdateColumnDto {
  @IsOptional()
  @IsString()
  name?: string;
}