import { IsNotEmpty, IsString } from 'class-validator';

export class getTodoByIdDto {
  @IsString()
  @IsNotEmpty()
  id: string;
}
