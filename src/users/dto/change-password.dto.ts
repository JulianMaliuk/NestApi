import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty } from "class-validator"

export class ChangePasswordDto {
  @IsNotEmpty()
  @ApiProperty()
  readonly current_password: string

  @IsNotEmpty()
  @ApiProperty()
  readonly new_password: string
}
