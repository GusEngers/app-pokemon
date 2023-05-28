import { Injectable } from '@nestjs/common';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Generation } from 'src/schemas/generation.schema';
import { Model } from 'mongoose';
import { Type } from 'src/schemas/type.schema';
import { PokemonList } from 'src/schemas/pokemon_list.schema';
import axios from 'axios';

@Injectable()
export class PokemonService {
  constructor(
    @InjectModel(Generation.name) private _Generation: Model<Generation>,
    @InjectModel(Type.name) private _Type: Model<Type>,
    @InjectModel(PokemonList.name) private _PokemonList: Model<PokemonList>,
  ) {}

  async create() {
    const datos = require('../../datos.json');
    //console.log(datos);
    await this._PokemonList.insertMany(datos);
    return 'listo';
  }

  findAll() {
    return `This action returns all pokemon`;
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
