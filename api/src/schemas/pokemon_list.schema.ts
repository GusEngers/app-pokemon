import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, isObjectIdOrHexString } from 'mongoose';
import { Type } from './type.schema';
import { Generation } from './generation.schema';

export type PokemonListDocument = HydratedDocument<PokemonList>;

@Schema()
export class PokemonList {
  @Prop({
    required: true,
    unique: true,
  })
  pokedex_id: string;

  @Prop({
    required: true,
    lowercase: true,
  })
  name: string;

  @Prop({
    required: true,
  })
  image: string;

  @Prop({
    required: true
  })
  attack: number

  @Prop({
    required: true
  })
  defense: number

  @Prop({
    ref: 'Type',
    validate: [
      {
        validator: function (types: Type[]) {
          return types.length > 0;
        },
        msg: 'Es necesario ingresar uno o más tipos de pokemons.',
      },
      {
        validator: function (types: Type[]) {
          let ids = types.filter((id) => isObjectIdOrHexString(id));
          return ids.length === types.length;
        },
        msg: 'El formato del id ingresado no es válido. El formato correcto es de una cadena hexadecimal.',
      },
    ],
  })
  types: Type[];

  @Prop({
    // ref: 'Generation',
    // default: "6472b1761e4b275718aa13ec",
    // validate: [
    //   {
    //     validator: function (generation: string) {
    //       return generation.length > 0;
    //     },
    //     msg: 'Es necesario ingresar la generación a la cual pertenece el pokemon.',
    //   },
    //   {
    //     validator: function (generation: string) {
    //       return isObjectIdOrHexString(generation);
    //     },
    //     msg: 'El formato del id ingresado no es válido. El formato correcto es de una cadena hexadecimal.',
    //   },
    // ],
    required: true
  })
  generation:  string // Generation;

  @Prop({
    default: true,
  })
  original: boolean;
}

export const PokemonListSchema = SchemaFactory.createForClass(PokemonList);
