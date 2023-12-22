import { Injectable } from '@nestjs/common';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Author } from './entities/author.entity';
@Injectable()
export class AuthorService {
  constructor(
    @InjectRepository(Author)
    private usersRepository: Repository<Author>,
  ) {}
  create(createAuthorDto: CreateAuthorDto) {
    const author = this.usersRepository.create(createAuthorDto);
    return 'This action adds a new author';
  }

  async findAll() {
    const author = await this.usersRepository.find();
    return author;
  }

  findOne(id: number) {
    return `This action returns a #${id} author`;
  }

  update(id: number, updateAuthorDto: UpdateAuthorDto) {
    return `This action updates a #${id} author`;
  }

  remove(id: number) {
    return `This action removes a #${id} author`;
  }
}
