import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
  Sse,
  StreamableFile,
} from '@nestjs/common';
import { createReadStream } from 'fs';
import { interval, Observable } from 'rxjs';
import { join } from 'path';
import { ChatService } from './chat.service';
import { CreateChatDto, ChatStreamDto } from './dto/create-chat.dto';
import { UpdateChatDto } from './dto/update-chat.dto';
import { map } from 'rxjs/operators';
import type { Response } from 'express';
@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Post()
  create(@Body() createChatDto: CreateChatDto) {
    return this.chatService.create(createChatDto);
  }

  // 流式，借鉴 https://juejin.cn/post/7238493216207192122
  // 前端支持eventsource流式传参 https://github.com/Azure/fetch-event-source
  // sse实例 https://github.com/nestjs/nest/tree/master/sample/28-sse
  @Sse('stream')
  sse(): Observable<MessageEvent> {
    return interval(1000).pipe(
      map((_) => ({ data: { hello: 'world' } }) as MessageEvent),
    );
  }

  // @Get()
  // get(@Res() res: Response) {
  //   res.set({
  //     'Content-Type': 'text/event-stream',
  //     'Cache-Control': 'no-cache',
  //     Connection: 'keep-alive',
  //     'Access-Control-Allow-Origin': '*',
  //   });

  //   res.statusCode = 200;
  //   res.write('开始回答：\n');

  //   const answer =
  //     '众所周知，ChatGPT API 是一个OpenAI 的聊天机器人接口，它可以根据用户的输入生成智能的回复，为了提高聊天的流畅性和响应速度，采用流失输出的响应方式，类似打字机的呈现效果';

  //   let i = 0;
  //   const intervalId = setInterval(() => {
  //     res.write(`event:message\ndata:${answer[i]}\n\n`);
  //     i++;
  //     if (i === answer.length) {
  //       res.write('event:end\ndata: \n\n'); // event:end 表示事件流结束
  //       clearInterval(intervalId);
  //     }
  //   }, 100);

  //   res.end(); // 事件流推送完毕，服务端主动断开连接
  // }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.chatService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateChatDto: UpdateChatDto) {
    return this.chatService.update(+id, updateChatDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.chatService.remove(+id);
  }
}
