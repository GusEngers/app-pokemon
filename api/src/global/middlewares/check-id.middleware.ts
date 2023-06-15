import {
  HttpException,
  HttpStatus,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { isObjectIdOrHexString } from 'mongoose';

@Injectable()
export class CheckIdMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    if (!isObjectIdOrHexString(req.params.id || req.params.generation)) {
      throw new HttpException(
        '¡El id ingresado debe tener un formato hexadecimal!',
        HttpStatus.BAD_REQUEST,
      );
    }
    next();
  }
}
