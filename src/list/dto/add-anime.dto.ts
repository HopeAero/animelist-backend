import { ApiProperty } from '@nestjs/swagger';
import { IsInt } from 'class-validator';

export class AddAnimeToListDto {
  
  @ApiProperty()
  @IsInt()
  animeId: number;
}