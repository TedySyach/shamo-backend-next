import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { ResponseFormatter } from 'src/helpers';

@Module({
  controllers: [UserController],
  providers: [UserService, ResponseFormatter],
})
export class UserModule {}
