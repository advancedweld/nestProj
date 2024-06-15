import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  ClassSerializerInterceptor,
  // ApiResponse,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { RolesGuard, Roles } from '../auth/guards/roles.guard';

import { User } from './entities/user.entity';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // @ApiResponse({ status: 200, type: [User] })
  //  应用序列化器 过滤返回字段中的敏感字段
  @UseInterceptors(ClassSerializerInterceptor)
  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    const result = await this.userService.register(createUserDto);
    console.log(
      '🚀 ~ file: user.controller.ts:30 ~ UserController ~ register ~ result:',
      result,
    );

    return result;
  }

  // @UseInterceptors(ClassSerializerInterceptor)
  // @Post('login')
  // async login(@Body() loginUserDto: LoginUserDto) {
  //   const result = await this.userService.login(loginUserDto);
  //   return result;
  // }

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  // 获取所有用户信息
  @Roles('normal') // 仅允许 'admin' 角色访问
  @Get('all')
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  // 更新用户数据
  @Post('update')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
