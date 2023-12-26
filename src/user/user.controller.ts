import {
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

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  @UseGuards(UserGuards)
  getUserUs(@GetUser('') user: User) {
    return user;
  }

  @Post('upload-profile-pict')
  @UseGuards(UserGuards)
  @UseInterceptors(FileInterceptor('file', multerProfileConfig))
  uploadProfilePic(
    @UploadedFile() file: Express.Multer.File,
    @GetUser() user: User,
  ) {
    return this.userService.uploadProfilePicture(user.id, file);
  }

  @Put('delete-profile-pict')
  @UseGuards(UserGuards)
  deleteProfilePic(@GetUser() user: User) {
    return this.userService.deleteProfilePicture(user.id);
  }
}
