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
    if (!isObjectIdOrHexString(req.params.id)) {
      throw new HttpException(
        '¡El id ingresado debe ser de formato hexadecimal!',
        HttpStatus.BAD_REQUEST,
      );
    }
    next();
  }
}
