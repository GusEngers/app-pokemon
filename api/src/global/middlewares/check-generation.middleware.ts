import {
  HttpException,
  HttpStatus,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Request, Response, NextFunction } from 'express';
import { Model } from 'mongoose';
import { Generation } from 'src/schemas/generation.schema';

@Injectable()
export class CheckGenerationMiddleware implements NestMiddleware {
  constructor(
    @InjectModel(Generation.name) private MGeneration: Model<Generation>,
  ) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const generation = await this.MGeneration.exists({
      _id: req.params.generation,
    });
    if (!generation)
      throw new HttpException(
        '¡Lo sentimos! La generación no existe',
        HttpStatus.NOT_FOUND,
      );
    next();
  }
}
