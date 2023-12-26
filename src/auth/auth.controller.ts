import { Body, Controller, Post, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginAuthDto, RegisterAuthDto } from './dto';
import { ResponseFormatter } from 'src/helpers';

@Controller('auth')
export class AuthController {
  constructor(
    private authServicer: AuthService,
    private responseFormater: ResponseFormatter,
  ) {}

  @Post('signup')
  async signup(@Body() body: RegisterAuthDto) {
    const data = await this.authServicer.register(body);

    return this.responseFormater.success(data, 'Registrasi Berhasil');
  }

  @Post('login')
  async login(@Body() body: LoginAuthDto) {
    const login = await this.authServicer.login(body);
    return this.responseFormater.success(login, 'Login Berhasil');
  }

  @Post('logout')
  logOut(@Request() req) {
    const authorizationHeader = req.headers.authorization;
    const token = authorizationHeader.split(' ')[1];
    console.log(token);
    return true;
  }
}
