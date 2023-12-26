import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import * as fs from 'fs';
import { UpdateUserDto } from './dto';

@Injectable()
export class UserService {
  constructor(private prismaService: PrismaService) {}

  async updateUserInfo(userId: number, body: UpdateUserDto) {
    const user = await this.prismaService.user.update({
      where: { id: userId },
      data: {
        name: body.name,
        phone: body.phone,
        address: body.address,
      },
    });

    delete user.password;

    return user;
  }

  async uploadProfilePicture(userId: number, file: Express.Multer.File) {
    try {
      // Save the file path to the user's profile in the database
      const filePath = `/uploads/profile/${file.filename}`;
      await this.prismaService.user.update({
        where: { id: userId },
        data: { profilePict: filePath },
      });
      return filePath;
    } catch (error) {
      throw new BadRequestException('Failed to upload profile picture');
    }
  }

  async deleteProfilePicture(userId: number) {
    const user = await this.prismaService.user.findUnique({
      where: {
        id: userId,
      },
    });

    const url_image = '.' + user.profilePict;
    fs.unlink(url_image, (err) => {
      if (err) {
        console.error(err);
        throw new Error('Failed to delete the file');
      }
    });

    return this.prismaService.user.update({
      where: { id: userId },
      data: { profilePict: null },
      select: {
        id: true,
        name: true,
      },
    });
  }
}
