import { ConflictException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { RegisterRequest } from './dto/register.dto';
import { User } from 'src/generated/prisma/client';
import { hash } from 'argon2';

@Injectable()
export class AuthService {
  constructor(private readonly prismaService: PrismaService) {}

  async register(dto: RegisterRequest) {
    const { name, email, password } = dto;

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const existUser = await this.prismaService.user.findUnique({
      where: {
        email,
      },
    });

    if (existUser) {
      throw new ConflictException('User with this email already exists');
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const user = await this.prismaService.user.create({
      data: { name, email, password: await hash(password) },
    });

    return user;
  }
}
