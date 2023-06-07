import { Module } from '@nestjs/common';
import { FilterService } from './filter.service';
import { FilterController } from './filter.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  PokemonList,
  PokemonListSchema,
} from 'src/schemas/pokemon_list.schema';
import { Generation, GenerationSchema } from 'src/schemas/generation.schema';
import { Type, TypeSchema } from 'src/schemas/type.schema';

@Module({
  controllers: [FilterController],
  providers: [FilterService],
  imports: [
    MongooseModule.forFeature([
      { name: PokemonList.name, schema: PokemonListSchema },
      { name: Generation.name, schema: GenerationSchema },
      { name: Type.name, schema: TypeSchema },
    ]),
  ],
})
export class FilterModule {}
