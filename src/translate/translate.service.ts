import { Injectable } from '@nestjs/common';
import { Response } from 'express';
import { CreateTranslateDto } from './dto/create-translate.dto';
import { UpdateTranslateDto } from './dto/update-translate.dto';
import axios from 'axios';

const APP_ID = '1BsG96kKU6royQ0ZtOwmBlAv';
const KEY = 'k12lgUTfz72DWUQfGPG88Y9suC7CzfC2';
@Injectable()
export class TranslateService {
  async create(createTranslateDto: CreateTranslateDto, res: Response) {
    try {
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
      // service里设置状态码。响应头
      res.status(200).setHeader('my-token', 'xiangshangzhi').send({
        content: translateResult,
      });
    } catch (error) {
      res.status(500).send({
        message: error?.message || 'Unexpected error.',
      });
      console.log(error);
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
