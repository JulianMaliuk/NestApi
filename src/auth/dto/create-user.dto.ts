import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, IsEmail } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsEmail()
  @ApiProperty()
  readonly username: string

  @IsString()
  @IsOptional()
  @ApiProperty()
  readonly name: string

  @IsString()
  @IsOptional()
  @ApiProperty()
  readonly password: string
}
