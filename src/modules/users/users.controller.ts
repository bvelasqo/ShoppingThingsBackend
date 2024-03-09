import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiBearerAuth, ApiBody, ApiQuery, ApiTags } from '@nestjs/swagger';
import { RolesGuard } from '../auth/guards/roles-guard';
import { AdminAccess } from '../auth/decorators/admin-decorator';
import { AuthGuard } from '../auth/guards/auth-guard';
import { PublicAccess } from '../auth/decorators/public-decorator';
import { PaginationQueryParamsDto } from 'src/shared/dto/pagination-query-params.dto';

@Controller('users')
@ApiTags('users')
@UseGuards(AuthGuard, RolesGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Post()
  @ApiBody({ type: CreateUserDto })
  @AdminAccess()
  @ApiBearerAuth()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  @AdminAccess()
  @ApiBearerAuth()
  @ApiQuery({ name: 'page', required: false })
  @ApiQuery({ name: 'limit', required: false })
  findAll(@Query() paginationQueryParams: PaginationQueryParamsDto) {
    return this.usersService.findAll(paginationQueryParams.page, paginationQueryParams.limit);
  }

  @Get(':id')
  @PublicAccess()
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Patch('/profile/:id')
  @ApiBody({ type: [UpdateUserDto] })
  @ApiBearerAuth()
  @AdminAccess()
  updateProfile(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  @ApiBearerAuth()
  @AdminAccess()
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
