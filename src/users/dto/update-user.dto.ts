import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsEmail } from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  @IsEmail()
  @ApiProperty()
  readonly username: string
  
  @IsOptional()
  @IsString()
  @ApiProperty()
  readonly name: string
}
