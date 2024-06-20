import { PartialType } from '@nestjs/mapped-types';
import { CreateStasticDto } from './create-stastic.dto';

export class UpdateStasticDto extends PartialType(CreateStasticDto) {}
