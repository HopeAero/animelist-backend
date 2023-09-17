import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, MinLength } from "class-validator";

export class CreateListDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    @MinLength(3)
    name: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    @MinLength(3)
    description: string;
}
