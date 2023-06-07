import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Generation } from 'src/schemas/generation.schema';
import { PokemonList } from 'src/schemas/pokemon_list.schema';
import { Type } from 'src/schemas/type.schema';
import { Model } from 'mongoose';

@Injectable()
export class FilterService {
  constructor(
    @InjectModel(Generation.name) private _Generation: Model<Generation>,
    @InjectModel(Type.name) private _Type: Model<Type>,
    @InjectModel(PokemonList.name) private _PokemonList: Model<PokemonList>,
  ) {}

  async pokemonsGeneration(generation: string, page: number = 1) {
    try {
      const pokemons = await this._PokemonList
        .find({ generation })
        .sort({ _id: 1 })
        .skip((page - 1) * 20)
        .limit(20)
        .select('-__v')
        .populate([
          { path: 'types', select: '-__v' },
          { path: 'generation', select: '-__v' },
        ]);
      const count = await this._PokemonList.count({ generation });
      return { count, pokemons };
    } catch (error: any) {
      throw new HttpException(error.message, error.statusCode);
    }
  }

  async pokemonsTypes(type: string, page: number = 1) {
    try {
      const pokemons = await this._PokemonList
        .find({ types: type })
        .sort({ _id: 1 })
        .skip((page - 1) * 20)
        .limit(20)
        .select('-__v')
        .populate([
          { path: 'types', select: '-__v' },
          { path: 'generation', select: '-__v' },
        ]);
      const count = await this._PokemonList.count({ types: type });
      return { count, pokemons };
    } catch (error: any) {
      throw new HttpException(error.message, error.statusCode)
    }
  }
}
