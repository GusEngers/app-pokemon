import { Injectable } from '@nestjs/common';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Generation } from 'src/schemas/generation.schema';
import { Document, Model, Types } from 'mongoose';
import { Type } from 'src/schemas/type.schema';
import { PokemonList } from 'src/schemas/pokemon_list.schema';

@Injectable()
export class PokemonService {
  constructor(
    @InjectModel(Generation.name) private _Generation: Model<Generation>,
    @InjectModel(Type.name) private _Type: Model<Type>,
    @InjectModel(PokemonList.name) private _PokemonList: Model<PokemonList>,
  ) {}

  private async counts(
    model: Model<PokemonList | Type | Generation>,
    filter: {},
  ) {
    const result = await model.count(filter);
    return result;
  }

  async create() {
    const datos = require('../../datos.json');
    //console.log(datos);
    await this._PokemonList.insertMany(datos);
    return 'listo';
  }

  async findAll(page: number = 1) {
    const pokemons = await this._PokemonList
      .find({})
      .skip((page - 1) * 20)
      .limit(20)
      .select('-__v')
      .populate([
        { path: 'types', select: '-__v' },
        { path: 'generation', select: '-__v' },
      ]);
    const count = await this.counts(this._PokemonList, {});
    return {
      count,
      pokemons,
    };
  }

  findOne(id: number) {
    return `This action returns a #${id} pokemon`;
  }

  update(id: number, updatePokemonDto: UpdatePokemonDto) {
    return `This action updates a #${id} pokemon`;
  }

  remove(id: number) {
    return `This action removes a #${id} pokemon`;
  }
}
