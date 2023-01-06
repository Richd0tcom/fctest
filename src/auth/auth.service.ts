import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
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

  async authenticate(user: any) {
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
