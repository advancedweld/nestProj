import {
  Injectable,
  HttpException,
  HttpStatus,
  NotFoundException,
} from '@nestjs/common';
import * as bcryptjs from 'bcryptjs';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async register(createUser: CreateUserDto) {
    console.log('@@@@@createUser', createUser);
    const { userName, password, email } = createUser;

    // 拿到注册时的密码开始加密，hash加密字符串
    const hash = bcryptjs.hashSync(password, 10);

    const existUser = await this.userRepository.findOne({
      where: { userName: userName },
    });
    if (existUser) {
      throw new HttpException('用户名已存在', HttpStatus.BAD_REQUEST);
    }
    createUser.password = hash;
    createUser.role = 'normal';
    const newUser = this.userRepository.create(createUser);
    // 相当于
    // const newUser = new User(createUser);

    return await this.userRepository.save(newUser);
  }

  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  async findAll() {
    const users = await this.userRepository.find();

    const count = await this.userRepository.count();
    const formattedUsers = users.map((user) => ({
      userId: user.id,
      // 复制其他用户字段
      ...user,
      id: undefined, // Remove the original `id` field if necessary
    }));
    return { users: formattedUsers, totalCount: count };

    // return `This action returns all user`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  async remove(userId: string): Promise<void> {
    console.log(
      '🚀 ~ file: user.service.ts:81 ~ UserService ~ remove ~ userId:',
      userId,
    );
    const result = await this.userRepository.delete(userId);
    if (result.affected === 0) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }
  }
}
