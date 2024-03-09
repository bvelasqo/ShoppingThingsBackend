import { Body, Controller, HttpCode, HttpStatus, Post, ValidationPipe} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/SignUpDto';
import { SignInDto } from './dto/SignInDto';
import { ApiTags } from '@nestjs/swagger';
import { PublicAccess } from './decorators/public-decorator';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('/signup')
  @PublicAccess()
  async signUp(@Body(new ValidationPipe()) userDto: SignUpDto) {
    try {
      return this.authService.signUp(userDto);
    } catch (error) {
      return {
        success: false,
        message: error.message,
      };
    }
  }

  @Post('/signin')
  @PublicAccess()
  @HttpCode(HttpStatus.OK)
  async signIn(@Body(new ValidationPipe()) userlogin: SignInDto) {
    const loginRes = await this.authService.signIn(userlogin);
    return loginRes;
  }
}
