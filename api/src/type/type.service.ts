import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Type } from 'src/schemas/type.schema';
import { CreateTypeDto } from './dto/create-type.dto';
import { UpdateTypeDto } from './dto/update-type.dto';

@Injectable()
export class TypeService {
  constructor(@InjectModel(Type.name) private _Type: Model<Type>) {}

  async create(createTypeDto: CreateTypeDto) {
    try {
      const type = new this._Type(createTypeDto);
      await type.save();
      return {
        msg: '¡Nuevo tipo de pokemon creado correctamente!',
        data: type,
      };
    } catch (error: any) {
      throw new HttpException(error.message, error.statusCode);
    }
  }

  async findAll() {
    try {
      const types = await this._Type.find({}).select('-__v');
      return {
        count: types.length,
        data: types,
      };
    } catch (error: any) {
      throw new HttpException(error.message, error.statusCode);
    }
  }

  async update(id: string, updateTypeDto: UpdateTypeDto) {
    try {
      const type = await this._Type
        .findByIdAndUpdate(id, updateTypeDto, { new: true })
        .select('-__v');
      return {
        msg: '¡Tipo de pokemon actualizado correctamente!',
        data: type,
      };
    } catch (error: any) {
      throw new HttpException(error.message, error.statusCode);
    }
  }
}
