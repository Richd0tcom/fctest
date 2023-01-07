import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { Role } from 'src/common/enums/roles.enum';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  users = [
    {
      username: 'testuser',
      role: Role.Admin,
    },
  ];

  async authenticate(user: AuthDto) {
    const usr = this.users.find((u) => u.username == user.username);

    if (!usr) {
      throw new BadRequestException('You are not an admin!');
    }
    const payload = { username: usr.username, role: usr.role };
    return {
      access_token: this.jwtService.sign(payload, {
        secret: process.env.JWT_SECRET,
      }),
    };
  }
}

export class AuthDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    type: String,
    required: true,
    description: 'Username of Admin Test user',
  })
  username: string;
}
