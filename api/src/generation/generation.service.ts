import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Generation } from 'src/schemas/generation.schema';
import { CreateGenerationDto } from './dto/create-generation.dto';
import { UpdateGenerationDto } from './dto/update-generation.dto';

@Injectable()
export class GenerationService {
  constructor(
    @InjectModel(Generation.name) private _Generation: Model<Generation>,
  ) {}

  async create(createGenerationDto: CreateGenerationDto) {
    try {
      const generation = new this._Generation(createGenerationDto);
      await generation.save();
      return {
        msg: '¡Nueva generación creada correctamente!',
        data: generation,
      };
    } catch (error: any) {
      throw new HttpException(error.message, error.statusCode);
    }
  }

  async findAll() {
    try {
      const generations = await this._Generation.find({}).select('-__v');
      return {
        count: generations.length,
        data: generations,
      };
    } catch (error: any) {
      throw new HttpException(error.message, error.statusCode);
    }
  }

  async update(id: string, updateGenerationDto: UpdateGenerationDto) {
    try {
      const generation = await this._Generation
        .findByIdAndUpdate(id, updateGenerationDto, { new: true })
        .select('-__v');
      return {
        msg: '¡Generación actualizada con éxito!',
        data: generation,
      };
    } catch (error) {
      throw new HttpException(error.message, error.statusCode);
    }
  }
}
