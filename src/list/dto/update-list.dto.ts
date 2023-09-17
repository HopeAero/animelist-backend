import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateListDto } from './create-list.dto';
import { IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';

export class UpdateListDto extends PartialType(CreateListDto) {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    @MinLength(3)
    @IsOptional()
    name: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    @MinLength(3)
    @IsOptional()
    description: string;
}
