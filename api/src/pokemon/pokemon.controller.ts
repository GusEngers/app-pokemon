import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { PokemonService } from './pokemon.service';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { TOptions } from './types/pokemon.types';

@Controller('pokemon')
export class PokemonController {
  constructor(private readonly pokemonService: PokemonService) {}

  @Post()
  async create() {
    let data = await this.pokemonService.create();
    return data;
  }

  @Get()
  async findAll() {
    const response = await this.pokemonService.findAll();
    return response;
  }

  @Get('generations')
  async generations() {
    const response = await this.pokemonService.generations();
    return response;
  }

  @Get('generations/:generation')
  async findByGeneration(
    @Param('generation') generation: string,
    @Query('page') page: string,
  ) {
    const response = await this.pokemonService.findByGeneration(
      generation,
      +page,
    );
    return response;
  }

  @Get('filter/:generation/options')
  async filter(
    @Param('generation') generation: string,
    @Body('name') name: string,
    @Body('options') options: TOptions,
    @Query('page') page: string,
  ) {
    const response = await this.pokemonService.filter(
      (generation = generation),
      (name = name),
      (options = options),
      +page,
    );
    return response;
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePokemonDto: UpdatePokemonDto) {
    return this.pokemonService.update(+id, updatePokemonDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.pokemonService.remove(+id);
  }
}
