import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Pokemon } from 'src/schemas/pokemon.schema';

@Injectable()
export class PokemonService {
  constructor(@InjectModel(Pokemon.name) private MPokemon: Model<Pokemon>) {}

  async random() {
    try {
      const aggregation = await this.MPokemon.aggregate([
        { $sample: { size: 20 } },
      ]).project({ __v: 0 });

      if (!aggregation || !aggregation.length)
        throw new HttpException(
          '¡Lo sentimos! No se encuentran registros de pokemons',
          HttpStatus.NOT_FOUND,
        );

      const pokemons = await this.MPokemon.populate(aggregation, [
        { path: 'types', select: '-__v' },
        { path: 'generation', select: '-__v' },
      ]);
      return pokemons;
    } catch (err) {
      let message =
        err.message !== '¡Lo sentimos! No se encuentran registros de pokemons'
          ? '¡Lo sentimos! Ha ocurrido un error inesperado.'
          : '¡Lo sentimos! No se encuentran registros de pokemons';
      throw new HttpException(
        message,
        err.status || HttpStatus.BAD_REQUEST,
      );
    }
  }
}
