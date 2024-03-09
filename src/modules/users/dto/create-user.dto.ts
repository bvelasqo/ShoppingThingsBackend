import { IsEmail, IsIn, IsNotEmpty, IsOptional, IsString, IsStrongPassword } from "class-validator";
import { Role } from "src/shared/schema/users";
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    description: 'Name of the user',
    type: String,
    example: 'John Doe'
  })
  @IsNotEmpty()
  @IsString()
  name: string;
  @ApiProperty({
    description: 'Email of the user',
    type: String,
    example: 'johndoe@gmail.com'
  })
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;
  @ApiProperty({
    description: 'Password of the user, must be at least 8 characters long, contain at least 1 lowercase letter, 1 uppercase letter, 1 number and 1 symbol',
    type: String,
    example: '4165asdf4ASas.asd'
  })
  @IsString()
  @IsNotEmpty()
  @IsStrongPassword({
    minLength: 8,
    minLowercase: 1,
    minUppercase: 1,
    minNumbers: 1,
    minSymbols: 1
  })
  password: string;
  @ApiProperty({
    description: 'Role of the user',
    type: String,
    example: 'admin',
    enum: [Role.ADMIN, Role.OWNER, Role.USER],
    default: Role.USER
  })
  @IsString()
  @IsIn([Role.ADMIN, Role.OWNER, Role.USER])
  @IsOptional()
  role: string;
  @ApiProperty({
    description: 'Status of the user',
    type: String,
    example: 'active'
  })
  @IsNotEmpty()
  @IsString()
  status: string;
  @ApiProperty({
    description: 'Secret token of the user',
    type: String,
    example: 'adminSecret123',
    required: false
  })
  @IsString()
  @IsOptional()
  secretToken?: string;
}
