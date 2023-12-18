import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const start = Date.now();

    res.on('finish', () => {
      const duration = Date.now() - start;
      console.log(`Request to ${req.originalUrl} took ${duration}ms`);
    });

    next();
  }
}

// 功能中间件
export function logger(req: Request, res: Response, next: NextFunction) {
  console.log(`function middleware Request...`);
  next();
}