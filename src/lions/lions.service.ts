import { Injectable } from '@nestjs/common';
import { CreateLionDto } from './dto/create-lion.dto';
import { UpdateLionDto } from './dto/update-lion.dto';
import { Lion } from './entities/lion.entity';
@Injectable()
export class LionsService {
  private readonly lions: Lion = [];

  create(createLionDto: CreateLionDto) {
    return 'This action adds a new lion';
  }

  findAll() {
    return `This action returns all lions`;
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
