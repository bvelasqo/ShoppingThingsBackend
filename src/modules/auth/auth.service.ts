import { HttpException, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserRepository } from 'src/shared/repositories/user.repository';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { Role, UsersDocument } from 'src/shared/schema/users';
import { comparePassword, generateHashPassword } from 'src/shared/utils/password-manager';
import { AuthResponse, PayloadToken } from './interface/auth.interface';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    @Inject(UserRepository) private readonly usersModel: UserRepository,
    private config: ConfigService,
    private readonly jwtService: JwtService
  ) { }

  async signUp(userDto: CreateUserDto) {
    // generate the hash password
    userDto.password = await generateHashPassword(userDto.password)
    // check is it for admin
    if (userDto.role === Role.ADMIN && userDto.secretToken !== this.config.get('ADMIN_SECRET_TOKEN')) {
      throw new HttpException('Invalid secret token', 400)
    }
    // userDto already exists
    const user = await this.usersModel.findOne({ email: userDto.email })
    if (user) {
      throw new HttpException('User already exists', 400)
    }
    // create the user
    const newUser = await this.usersModel.create(userDto)

    const accessToken = await this.generateJWT(newUser)
    return {
      success: true,
      message: 'User created successfully and Login successful',
      result: { email: newUser.email, accessToken }
    }
  }

  async signIn(userlogin: { email: string, password: string }) {
    // check the email and password
    const user = await this.usersModel.findOne({ email: userlogin.email })
    if (!user) {
      throw new UnauthorizedException();
    }
    if (!(await comparePassword(userlogin.password, user.password))) {
      throw new UnauthorizedException();
    }
    // generate the token
    const accessToken = await this.generateJWT(user)
    return {
      success: true,
      message: 'Login successful',
      result: { accessToken }
    }
  }

  public signJWT({
    payload,
    secret,
    expires,
  }: {
    payload: any;
    secret: string;
    expires: number | string;
  }): string {
    return this.jwtService.sign(payload, {
      secret,
      expiresIn: expires,
    });
  }

  public async generateJWT(user: UsersDocument): Promise<AuthResponse> {
    const getUser = await this.usersModel.findOne(user._id);

    const payload: PayloadToken = {
      role: Role[getUser.role],
      sub: getUser._id as unknown as string,
    };

    return {
      accessToken: this.signJWT({
        payload,
        secret: this.config.get('JWT_SECRET'),
        expires: this.config.get('JWT_EXPIRES_IN'),
      }),
      user,
    };
  }
}
