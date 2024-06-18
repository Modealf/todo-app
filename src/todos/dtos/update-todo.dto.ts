import {
  IsDate,
  IsBoolean,
  IsString,
  IsOptional,
  IsNotEmpty,
} from 'class-validator';

export class updateTodoDto {
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsString()
  @IsOptional()
  title: string;

  @IsDate()
  @IsOptional()
  dueDate: Date;

  @IsBoolean()
  @IsOptional()
  completed: boolean;
}
