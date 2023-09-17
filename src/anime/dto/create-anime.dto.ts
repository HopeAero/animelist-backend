import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString, isNumber } from "class-validator";

export class CreateAnimeDto {

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    name: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    description: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    year: string;

    @ApiProperty({type:"file"})
    file: Express.Multer.File;
}
