import { Controller, Get, Param, Query } from '@nestjs/common';
import { PokemonService } from './pokemon.service';

@Controller('pokemon')
export class PokemonController {
  constructor(private readonly SPokemon: PokemonService) {}

  @Get()
  async random() {
    const response = await this.SPokemon.random();
    return response;
  }

  @Get(':generation')
  async pokemons(
    @Param('generation') generation: string,
    @Query('page') page: string,
  ) {
    const response = await this.SPokemon.pokemons(generation, +page);
    return response;
  }
}
