import { IsString, IsNotEmpty } from 'class-validator';

export class getTodoByTitleDto {
  @IsString()
  @IsNotEmpty()
  title: string;
}
