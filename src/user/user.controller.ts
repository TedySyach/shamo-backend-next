import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { User } from '@prisma/client';
import { GetUser } from 'src/auth/decorator';
import { UserGuards } from 'src/auth/guard';
import { Express } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import { UserService } from './user.service';
import { diskStorage } from 'multer';
import { multerProfileConfig } from 'src/config';
import { UpdateUserDto } from './dto';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  @UseGuards(UserGuards)
  getUser(@GetUser('') user: User) {
    return user;
  }

  @Put()
  @UseGuards(UserGuards)
  async updateUserInfo(@GetUser() user: User, @Body() body: UpdateUserDto) {
    const userData = await this.userService.updateUserInfo(user.id, body);
    return userData;
  }

  @Post('upload-profile-pict')
  @UseGuards(UserGuards)
  @UseInterceptors(FileInterceptor('file', multerProfileConfig))
  async uploadProfilePic(
    @UploadedFile() file: Express.Multer.File,
    @GetUser() user: User,
  ) {
    const data = await this.userService.uploadProfilePicture(user.id, file);
    return data;
  }

  @Put('delete-profile-pict')
  @UseGuards(UserGuards)
  async deleteProfilePic(@GetUser() user: User) {
    const data = await this.userService.deleteProfilePicture(user.id);
    return data;
  }
}
