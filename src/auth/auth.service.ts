import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from './../users/users.service';
import { User } from './../users/schemas/user.schema';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    ) {}

  async validateUser(username: string, password: string): Promise<User | null> {
    const user: any = await this.usersService.findOneWithPassword({username});
    if (user && await user.comparePasswords(password)) {
      return user;
    }
    return null;
  }

  async login(user: User) {
    const payload = { userId: user._id, roles: user.roles, };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
