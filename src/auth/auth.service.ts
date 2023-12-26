import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import * as argon from 'argon2';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { LoginAuthDto, RegisterAuthDto } from './dto';
import { JwtService } from '@nestjs/jwt';
import { use } from 'passport';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private config: ConfigService,
  ) {}

  async signToken(
    userId: number,
    role: string,
  ): Promise<{ access_token: string }> {
    const payload = {
      sub: userId,
      role: role,
    };

    const secret = this.config.get('JWT_SECRET');

    const token = await this.jwt.signAsync(payload, {
      expiresIn: '7w',
      secret: secret,
    });

    return {
      access_token: token,
    };
  }

  async register(body: RegisterAuthDto) {
    try {
      // hasing password
      const hash = await argon.hash(body.password);

      const role = body.role || 'USER';
      // save new user
      const user = await this.prisma.user.create({
        data: {
          name: body.name,
          username: body.username,
          email: body.email,
          phone: body.phone,
          password: hash,
          role: 'ADMIN',
        },
      });

      const access_token = await this.signToken(user.id, user.role);

      return access_token;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if ((error.code = 'p2002')) {
          throw new ForbiddenException('Credentials Taken');
        }
      }
    }
  }

  async login(body: LoginAuthDto) {
    // check user by email / username
    let user = await this.prisma.user.findUnique({
      where: {
        username: body.username,
      },
    });

    // throw exception if user didnt exist
    if (!user) {
      throw new ForbiddenException('Credentials Incorrect');
    }
    // check hash password
    const pwMatch = await argon.verify(user.password, body.password);

    if (!pwMatch) {
      throw new ForbiddenException('Credentials Incorrect');
    }

    const access_token = await this.signToken(user.id, user.role);

    return access_token;
  }
}
