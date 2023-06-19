import { Body, Controller, Get, Param, Query } from '@nestjs/common';
import { PokemonService } from './pokemon.service';
import { Detail, Name } from 'src/global/types/pokemon.type';

@Controller('pokemon')
export class PokemonController {
  constructor(private readonly SPokemon: PokemonService) {}

  @Get()
  async random() {
    const response = await this.SPokemon.random();
    return response;
  }

  @Get('generation/:generation')
  async pokemons(
    @Param('generation') generation: string,
    @Query('page') page: string,
  ) {
    const response = await this.SPokemon.pokemons(generation, +page);
    return response;
  }

  @Get('detail')
  async detail(@Body() detail: Detail) {
    const response = await this.SPokemon.detail(detail);
    return response;
  }

  @Get('name')
  async search(@Body() name: Name, @Query('page') page: string) {
    const response = await this.SPokemon.search(name, +page);
    return response;
  }
}
