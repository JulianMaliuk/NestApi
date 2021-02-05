import { Body, ConflictException, Controller, Post, UseGuards, Request } from '@nestjs/common';
import { ApiBody } from '@nestjs/swagger';
import { UsersService } from '../users/users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private usersService: UsersService
  ) {}

  @UseGuards(LocalAuthGuard)
  @ApiBody({schema: {
    type: 'object',
    properties: {
      username: {type: 'string'},
      password: {type: 'string'}
    }
  }})
  @Post('login')
  login(@Request() req) {
    return this.authService.login(req.user);
  }

  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    const user = await this.usersService.findOneWithPassword(createUserDto.username);
    if(user !== null) throw new ConflictException(`Email already exists!`)
    return this.usersService.create(createUserDto);
  }
}
