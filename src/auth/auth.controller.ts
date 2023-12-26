import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginAuthDto, RegisterAuthDto } from './dto';

@Controller('auth')
export class AuthController {
  constructor(private authServicer: AuthService) {}

  @Post('signup')
  signup(@Body() body: RegisterAuthDto) {
    return this.authServicer.register(body);
  }

  @Post('login')
  login(@Body() body: LoginAuthDto) {
    return this.authServicer.login(body);
  }
}
