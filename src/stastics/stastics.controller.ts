import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { StasticsService } from './stastics.service';
import { CreateStasticDto } from './dto/create-stastic.dto';
import { UpdateStasticDto } from './dto/update-stastic.dto';

@Controller('stastics')
export class StasticsController {
  constructor(private readonly stasticsService: StasticsService) {}

  @Post()
  create(@Body() createStasticDto: string) {
    let parsedData;
    try {
      parsedData = JSON.parse(createStasticDto);
    } catch (error) {
      console.error('Error parsing JSON:', error);
      throw new Error('Invalid JSON data');
    }

    console.log('🚀 ~ StasticsController ~ create ~ parsedData:', parsedData);
    return this.stasticsService.create(parsedData);
  }

  @Get()
  findAll() {
    return this.stasticsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.stasticsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateStasticDto: UpdateStasticDto) {
    return this.stasticsService.update(+id, updateStasticDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.stasticsService.remove(+id);
  }
}
