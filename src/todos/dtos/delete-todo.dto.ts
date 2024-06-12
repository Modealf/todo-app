import { IsArray, IsString, ArrayNotEmpty } from 'class-validator';

export class DeleteTodosDto {
  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  ids: string[];
}
