import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Role } from 'src/shared/schema/users';
import { UserRepository } from 'src/shared/repositories/user.repository';
import { comparePassword, generateHashPassword } from 'src/shared/utils/password-manager';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UsersService {

  constructor(
    @Inject(UserRepository) private readonly usersModel: UserRepository,
    private config: ConfigService
  ) { }

  async create(createUserDto: CreateUserDto) {
    // generate the hash password
    createUserDto.password = await generateHashPassword(createUserDto.password)

    // check is it for admin
    if (createUserDto.role !== Role.ADMIN || createUserDto.secretToken !== this.config.get('ADMIN_SECRET_TOKEN')) {
      return {
        success: false,
        message: 'Invalid secret token'
      }
    }

    // user already exists
    const user = await this.usersModel.findOne({ email: createUserDto.email })
    if (user) {
      return {
        success: false,
        message: 'User already exists',
      }
    }

    // create the user
    const newUser = await this.usersModel.create(createUserDto)

    return {
      success: true,
      message: 'User created successfully',
      result: { email: newUser.email }
    }
  }

  async findAll(page: number, limit: number) {
    const users = await this.usersModel.find(page, limit)
    return {
      success: true,
      message: 'Users found',
      result: users
    }
  }

  async findOne(id: string) {
    const user = await this.usersModel.findOne({ _id: id })
    return {
      success: true,
      message: 'User found',
      result: user
    }
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const { name, newPassword, oldPassword } = updateUserDto
    const user = await this.usersModel.findOne({ _id: id })
    if (!user) {
      throw new Error('User not found')
    }
    if (oldPassword && !(await comparePassword(oldPassword, user.password))) {
      throw new Error('Invalid password')
    }

    if (name) {
      user.name = name
    }
    if (newPassword) {
      user.password = await generateHashPassword(newPassword)
    }
    await user.save()
    return {
      success: true,
      message: 'User updated',
      result: { email: user.email }
    }
  }

  async remove(id: string) {
    const user = await this.usersModel.findOne({ _id: id })
    if (!user) {
      throw new Error('User not found')
    }
    this.usersModel.delete({ _id: id })
  }
}
