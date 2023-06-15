import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import axios from 'axios';
import { Model } from 'mongoose';
import { Original } from 'src/global/types/pokemon.type';
import { Pokemon } from 'src/schemas/pokemon.schema';

@Injectable()
export class PokemonService {
  private api = 'https://pokeapi.co/api/v2/pokemon/';

  constructor(@InjectModel(Pokemon.name) private MPokemon: Model<Pokemon>) {}

  /**
   * * Genera una lista con 20 pokemons de forma aleatoria.
   * * En casos de errores devuelven sus respectivos mensajes.
   */
  async random() {
    try {
      const aggregation = await this.MPokemon.aggregate([
        { $sample: { size: 20 } },
      ]).project({ __v: 0 });

      if (!aggregation || !aggregation.length)
        throw new HttpException('Error', HttpStatus.NOT_FOUND);

      const pokemons = await this.MPokemon.populate(aggregation, [
        { path: 'types', select: '-__v' },
        { path: 'generation', select: '-__v' },
      ]);
      return pokemons;
    } catch (err) {
      let message =
        err.message !== 'Error'
          ? '¡Lo sentimos! Ha ocurrido un error inesperado.'
          : '¡Lo sentimos! No se encuentran registros de pokemons';
      throw new HttpException(message, err.status || HttpStatus.BAD_REQUEST);
    }
  }

  /**
   * * Obtiene una lista de 20 pokemons según su generación y también la cantidad de pokemons
   * que pertenece a esa generación.
   * * En casos de errores devuelen sus respectivos mensajes.
   * @param generation Id de la generación a filtrar
   * @param page Número de página a filtrar (Máximo 20 registros por página), por defecto su valor es 1
   */
  async pokemons(generation: string, page: number = 1) {
    try {
      const pokemons = await this.MPokemon.find({ generation })
        .select('-__v')
        .skip((page - 1) * 20)
        .limit(20)
        .sort({ _id: 1 })
        .populate([
          { path: 'types', select: '-__v' },
          { path: 'generation', select: '-__v' },
        ]);

      if (!pokemons || !pokemons.length)
        throw new HttpException('Error', HttpStatus.NOT_FOUND);
      const count = await this.MPokemon.count({ generation });
      return { count, pokemons };
    } catch (err) {
      let message =
        err.message !== 'Error'
          ? '¡Lo sentimos! Ha ocurrido un error inesperado.'
          : '¡Lo sentimos! Ya no hay más registros';
      throw new HttpException(message, err.status || HttpStatus.BAD_REQUEST);
    }
  }

  /**
   * * Obtiene el detalle de un pokemon, si es original los resultados vienen desde
   * una API externa y en caso contrario vienen desde la base de datos.
   * * En casos de errores devuelen sus respectivos mensajes.
   * @param id 
   * @param original 
   */
  async detail(id: string, original: Original) {
    try {
      if (original.original) {
        const pokemon = await axios
          .get(this.api + id)
          .then((res) => res.data)
          .catch((_) => {
            throw new HttpException('Error', HttpStatus.NOT_FOUND);
          });
        return pokemon;
      }

      const pokemon = await this.MPokemon.findOne({ pokedex_id: id })
        .select('-__v')
        .populate([
          { path: 'types', select: '-__v' },
          { path: 'generation', select: '-__v' },
        ]);

      if (!pokemon) throw new HttpException('Error', HttpStatus.NOT_FOUND);
      return pokemon;
    } catch (err) {
      let message =
        err.message !== 'Error'
          ? '¡Lo sentimos! Ha ocurrido un error inesperado.'
          : '¡Lo sentimos! No hay registros de este pokemon';
      throw new HttpException(message, err.status || HttpStatus.BAD_REQUEST);
    }
  }
}
