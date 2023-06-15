import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Generation } from 'src/schemas/generation.schema';

@Injectable()
export class GenerationService {
  constructor(@InjectModel(Generation.name) private MGeneration: Model<Generation>){}
}
