import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
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
    // console.log('@@@@@createUser', createUser);
    const { userName } = createUser;

    const existUser = await this.userRepository.findOne({
      where: { userName },
    });
    if (existUser) {
      throw new HttpException('用户名已存在', HttpStatus.BAD_REQUEST);
    }

    const newUser = await this.userRepository.create(createUser);
    // 相当于
    // const newUser = new User(createUser);
    return await this.userRepository.save(newUser);
  }

  async login(loginUser: LoginUserDto) {
    console.log('@@@@@loginUser', loginUser);
    const { userName, password } = loginUser;

    const existUser = await this.userRepository.findOne({
      where: { userName },
    });
    console.log('existUser', existUser);
    if (!existUser) {
      throw new HttpException('用户不存在', HttpStatus.BAD_REQUEST);
    }
    const pwd = existUser.password;
    if (pwd !== password) {
      throw new HttpException('密码错误', HttpStatus.BAD_REQUEST);
    } else {
      return '登录成功';
    }
  }

  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  async findAll() {
    const users = await this.userRepository.find();
    return users;
    // return `This action returns all user`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
