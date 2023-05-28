import { Module } from '@nestjs/common';
import { PokemonService } from './pokemon.service';
import { PokemonController } from './pokemon.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  PokemonList,
  PokemonListSchema,
} from 'src/schemas/pokemon_list.schema';
import { Generation, GenerationSchema } from 'src/schemas/generation.schema';
import { Type, TypeSchema } from 'src/schemas/type.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: PokemonList.name, schema: PokemonListSchema },
      { name: Generation.name, schema: GenerationSchema },
      { name: Type.name, schema: TypeSchema },
    ]),
  ],
  controllers: [PokemonController],
  providers: [PokemonService],
})
export class PokemonModule {}
