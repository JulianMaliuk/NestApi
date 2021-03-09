import { Body, ConflictException, Controller, Post, UseGuards, Request, Req, UnauthorizedException } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { UsersService } from '../users/users.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { RolesGuard } from '../common/guards/roles.guard';
import { JwtAuthGuard } from './jwt-auth.guard';
import { ChangePasswordDto } from '../users/dto/change-password.dto';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private usersService: UsersService
  ) {}

  @Post('login')
  @UseGuards(LocalAuthGuard)
  @ApiBody({schema: {
    type: 'object',
    properties: {
      username: {type: 'string'},
      password: {type: 'string'}
    }
  }})
  login(@Request() req) {
    return this.authService.login(req.user);
  }

  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    const user = await this.usersService.findOne({username: createUserDto.username});
    if(user !== null) throw new ConflictException(`Email already exists!`)
    return this.usersService.create(createUserDto);
  }

  @Post('changePassword')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('user')
  async changePassword(@Req() request: Request, @Body() body: ChangePasswordDto) {
    const _id = request['user'].userId;
    const user: any = await this.usersService.findOneWithPassword({_id})
    const isMatch = await user.comparePasswords(body.current_password)
    if(isMatch) {
      user.password = body.new_password;
      return user.save();
    }
    return new UnauthorizedException()
  }
}
