import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateAnimeDto } from './create-anime.dto';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateAnimeDto extends PartialType(CreateAnimeDto) {
    
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    @IsOptional()
    name: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    @IsOptional()
    description: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    @IsOptional()
    year: number;

}
