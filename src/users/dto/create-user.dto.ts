import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsEnum, IsNotEmpty, IsString, MinLength} from "class-validator";
import { UserRole } from "../entities/user.entity";
import { isUniqueDb } from "@youba/nestjs-dbvalidator";
import { Transform } from "class-transformer";


export class CreateUserDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    name: string;

    @ApiProperty()
    @IsNotEmpty()
    @isUniqueDb({table : 'user', column: 'email', message: 'Email already exists'})
    @IsEmail()
    email: string;

    @ApiProperty()
    @IsNotEmpty()
    @MinLength(6)
    @IsString()
    @Transform(({ value }) => value.trim())
    password: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsEnum(UserRole, { message: 'Invalid role' })
    role: UserRole;
}
