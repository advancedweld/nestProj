import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const start = Date.now();
    console.log(`@@@@ mideware Recieve Request...`, req.originalUrl);
    res.on('finish', () => {
      const duration = Date.now() - start;
      console.log(
        `@@@@ midware Request to ${req.originalUrl} took ${duration}ms`,
      );
    });

    next();
  }
}

// 功能中间件
export function logger(req: Request, res: Response, next: NextFunction) {
  console.log(`@@@@@function middleware Request...`, req.originalUrl);
  next();
}
