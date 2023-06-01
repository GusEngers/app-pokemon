import { HttpException, Injectable, HttpStatus } from '@nestjs/common';
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

  async findAll() {
    try {
      const aggregation = await this._PokemonList
        .aggregate([{ $sample: { size: 20 } }])
        .project({ _id: 0, __v: 0 });
      const pokemons = await this._PokemonList.populate(aggregation, [
        { path: 'types', select: '-__v' },
        { path: 'generation', select: '-__v' },
      ]);
      const count = await this.counts(this._PokemonList, {});
      return {
        count,
        pokemons,
      };
    } catch (_) {
      throw new HttpException(
        '¡Lo sentimos! Ha ocurrido un error inesperado.',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async findOne(id: string, original: boolean) {
    if (original) {
      const pokemon = await axios
        .get(`https://pokeapi.co/api/v2/pokemon/${id}`)
        .then((res) => res.data)
        .catch((_) => {
          throw new HttpException(
            '¡Lo sentimos! No se ha encontrado el pokemon solicitado.',
            HttpStatus.NOT_FOUND,
          );
        });
      return pokemon;
    }
    // const pokemon = await this._PokemonList
    //   .findOne({ pokedex_id: id })
    //   .select('-__v')
    //   .populate([
    //     { path: 'types', select: '-__v' },
    //     { path: 'generation', select: '-__v' },
    //   ]);
    // if (!pokemon)
    //   throw new HttpException(
    //     'No se ha encontrado el pokemon solicitado',
    //     HttpStatus.NOT_FOUND,
    //   );
    // return pokemon;
  }

  async findByGeneration(generation: string, page: number = 1) {
    try {
      let pokemons = await this._PokemonList
        .find({ generation })
        .sort({ _id: 1 })
        .skip((page - 1) * 20)
        .limit(20)
        .select('-__v -_id')
        .populate([
          { path: 'types', select: '-__v' },
          { path: 'generation', select: '-__v' },
        ]);
      let count = await this.counts(this._PokemonList, { generation });
      return {
        count,
        pokemons,
      };
    } catch (_) {
      throw new HttpException(
        '¡Lo sentimos! Ha ocurrido un error inesperado.',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async findByName(generation: string, name: string, page: number = 1) {
    try {
      let pokemons = await this._PokemonList
        .find({ generation, name: new RegExp(name, 'i') })
        .sort({ _id: 1 })
        .skip((page - 1) * 20)
        .limit(20)
        .select('-__v -_id')
        .populate([
          { path: 'types', select: '-__v' },
          { path: 'generation', select: '-__v' },
        ]);
      let count = await this.counts(this._PokemonList, { generation, name: new RegExp(name, 'i') });
      return {
        count,
        pokemons,
      };
    } catch (_) {
      throw new HttpException(
        '¡Lo sentimos! Ha ocurrido un error inesperado.',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  update(id: number, updatePokemonDto: UpdatePokemonDto) {
    return `This action updates a #${id} pokemon`;
  }

  remove(id: number) {
    return `This action removes a #${id} pokemon`;
  }
}
