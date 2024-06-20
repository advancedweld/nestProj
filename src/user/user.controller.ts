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
import { DeleteUserDto } from './dto/delete-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { RolesGuard, Roles } from '../auth/guards/roles.guard';
import { UserRole } from './entities/user.entity';
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

    return result;
  }

  @Roles(UserRole.Root)
  @Post('delete')
  delete(@Body() deleteUserDto: DeleteUserDto) {
    return this.userService.remove(deleteUserDto.userId);
  }

  // 获取所有用户信息
  @Roles(UserRole.Root) // 仅允许 'admin' 角色访问
  @Get('all')
  findAll() {
    return this.userService.findAll();
  }

  // 查看详情
  //  应用序列化器 过滤返回字段中的敏感字段
  @UseInterceptors(ClassSerializerInterceptor)
  @Post('detail')

  // 获取请求体里的参数要用@Body(), @Param()是用来获取请求url里参数的
  findOne(@Body('userId') userId: string) {
    return this.userService.findOne(userId);
  }

  // 更新用户数据
  @Post('update')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }
}
