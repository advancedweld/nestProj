import { Injectable } from '@nestjs/common';
import { CreateLionDto } from './dto/create-lion.dto';
import { UpdateLionDto } from './dto/update-lion.dto';
import { Lion } from './entities/lion.entity';
@Injectable()
export class LionsService {
  private readonly lions: Lion[] = [
    {
      name: 'xiaohong',
      age: 15,
      color: 'yellow',
      breed: 'AA',
    },
  ];

  create(createLionDto: CreateLionDto) {
    this.lions.push(createLionDto);
  }

  findAll(): Lion[] {
    return this.lions;
  }

  findOne(id: number) {
    return `This action returns a #${id} lion`;
  }

  update(id: number, updateLionDto: UpdateLionDto) {
    return `This action updates a #${id} lion`;
  }

  remove(id: number) {
    return `This action removes a #${id} lion`;
  }
}
