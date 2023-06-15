import { Body, Controller, Get, Param, Query } from '@nestjs/common';
import { PokemonService } from './pokemon.service';
import { Original } from 'src/global/types/pokemon.type';

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

  @Get('detail/:id')
  async detail(@Param('id') id: string, @Body() original: Original) {
    const response = await this.SPokemon.detail(id, original);
    return response;
  }

  @Get('name/:name')
  async search(@Param('name') name: string, @Query('page') page: string) {
    const response = await this.SPokemon.search(name.toLowerCase(), +page);
    return response;
  }
}
