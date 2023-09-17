import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { UserRole } from 'src/users/entities/user.entity';
import * as bcryptjs from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService,
    ) {}

    async register({ email, password, name }: RegisterDto) {
        const user = await this.usersService.findOneByEmail(email);

        if (user) {
            throw new BadRequestException('User already exists');
        }

        await this.usersService.create({
            email,
            password: await bcryptjs.hash(password, 10),
            name,
            role: UserRole.USER,
        });

        return {
            email,
            name
        }
    }

    async login({ email, password }: LoginDto) {
        
        const user = await this.usersService.findByEmailWithPassword(email);
        if (!user) {
            throw new UnauthorizedException('email is wrong');
        }

        const isPasswordValid = await bcryptjs.compare(password, user.password);

        if (!isPasswordValid) {
            throw new UnauthorizedException('password is wrong');
        }

        const payload = { email: user.email, id: user.id, role: user.role };
        const token = await this.jwtService.signAsync(payload, {secret: process.env.JWT_SECRET});


        return {
            token,
            email,
            id: user.id,
        }
    }

    async profile ({email , role} : {email: string, role: string}) {
        const user = await this.usersService.findOneByEmail(email);
        if (!user) {
            throw new UnauthorizedException('email is wrong');
        }

        return user;
    }
    
}
