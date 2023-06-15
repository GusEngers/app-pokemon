import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Type } from 'src/schemas/type.schema';

@Injectable()
export class TypeService {
  constructor(@InjectModel(Type.name) private MType: Model<Type>){}
}
