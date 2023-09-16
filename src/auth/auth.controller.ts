import { Body, Controller, Get, Post, Req, Request, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { AuthGuard } from './guard/auth.guard';

@ApiTags('auth')
@Controller('auth')
export class AuthController {

    constructor(private readonly authService : AuthService) {}

    @Post('register')
    register(@Body() registerDto : RegisterDto) {
        return this.authService.register(registerDto);
    }

    @Post('login')
    login(@Body() loginDto : LoginDto) {
        return this.authService.login(loginDto);
    }

    @Get('profile')
    @ApiBearerAuth()
    @UseGuards(AuthGuard)
    profile(
        @Request()
        req
    ) {
        return req.user;
    }
}
