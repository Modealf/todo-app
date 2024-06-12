import { IsDate, IsBoolean, IsString } from 'class-validator';

export class updateTodoDto {
  @IsString()
  id: string;

  @IsString()
  title: string;

  @IsDate()
  dueDate: Date;

  @IsString()
  userId: string;

  @IsBoolean()
  completed: boolean;
}
