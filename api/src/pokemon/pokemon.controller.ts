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

  @Get(':generation')
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

  @Get(':generation/name')
  async findByName(
    @Body('name') name: string,
    @Param('generation') generation: string,
    @Query('page') page: string,
  ) {
    const response = await this.pokemonService.findByName(
      generation,
      name,
      +page,
    );
    return response;
  }
  // @Get(':id')
  // async findOne(@Param('id') id: string) {
  //   const response = await this.pokemonService.findOne(id, true);
  //   return response;
  // }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePokemonDto: UpdatePokemonDto) {
    return this.pokemonService.update(+id, updatePokemonDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.pokemonService.remove(+id);
  }
}
