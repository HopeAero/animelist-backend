import { Body, Controller, Get, Post, Req, Request, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { AuthGuard } from './guard/auth.guard';
import { ActiveUser } from 'src/common/decorator/active-user-decorator';
import { UserActiveInterface } from 'src/common/interface/user-active-interface';
import { Auth } from './decorators/auth.decorator';
import { UserRole } from 'src/users/entities/user.entity';

@ApiTags('auth')
@Controller('auth')
export class AuthController {

    constructor(private readonly authService: AuthService) { }

    @Post('register')
    register(@Body() registerDto: RegisterDto) {
        return this.authService.register(registerDto);
    }

    @Post('login')
    login(@Body() loginDto: LoginDto) {
        return this.authService.login(loginDto);
    }

    @Get('profile')
    @Auth(UserRole.USER)
    profile(
        @ActiveUser() user: UserActiveInterface
    ) 
    {
        return this.authService.profile(user);
    }
    

}
