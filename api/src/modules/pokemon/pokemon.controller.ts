import { Controller, Get } from '@nestjs/common';
import { PokemonService } from './pokemon.service';

@Controller('pokemon')
export class PokemonController {
  constructor(private readonly SPokemon: PokemonService) {}

  @Get()
  async random() {
    const response = await this.SPokemon.random();
    return response;
  }
}
