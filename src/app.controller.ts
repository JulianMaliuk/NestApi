import { Controller, Request, Get, UseGuards, Patch, Body } from '@nestjs/common';
import { AppService } from './app.service';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { UpdateUserDto } from './users/dto/update-user.dto';
import { UsersService } from './users/users.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private usersService: UsersService
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async getProfile(@Request() req) {
    return this.usersService.findOne(req.user.userId)
  }

  @Patch('profile')
  @UseGuards(JwtAuthGuard)
  update(@Request() req, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(req.user.userId, updateUserDto);
  }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
