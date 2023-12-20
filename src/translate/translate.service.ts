import { Injectable, Logger } from '@nestjs/common';
import { Response } from 'express';
import { CreateTranslateDto } from './dto/create-translate.dto';
import { UpdateTranslateDto } from './dto/update-translate.dto';
import axios from 'axios';

const APP_ID = '1BsG96kKU6royQ0ZtOwmBlAv';
const KEY = 'k12lgUTfz72DWUQfGPG88Y9suC7CzfC2';
@Injectable()
export class TranslateService {
  async create(createTranslateDto: CreateTranslateDto) {
    try {
      console.log('@@@@translate createTranslateDto', createTranslateDto);
      // 调用百度翻译接口
      const token_url = `https://aip.baidubce.com/oauth/2.0/token?client_id=${APP_ID}&client_secret=${KEY}&grant_type=client_credentials`;
      const result = await axios.post(token_url);
      const token = result.data.access_token;

      const apiUrl = `https://aip.baidubce.com/rpc/2.0/mt/texttrans/v1?access_token=${token}`;

      const transResponse = await axios.post(apiUrl, {
        from: 'auto',
        to: 'en',
        q: createTranslateDto.content,
      });

      const translateResult = transResponse.data.result.trans_result[0].dst;
      return translateResult;
    } catch (error) {
      // todo: 错误处理， 记录日志
      Logger.error(error);
      throw new Error('Failed to translate text.');
    }
  }

  findAll() {
    return `This action returns all translate`;
  }

  findOne(id: number) {
    return `This action returns a #${id} translate`;
  }

  update(id: number, updateTranslateDto: UpdateTranslateDto) {
    return `This action updates a #${id} translate`;
  }

  remove(id: number) {
    return `This action removes a #${id} translate`;
  }
}
