import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { PokemonService } from './pokemon.service';
import { PokemonController } from './pokemon.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Pokemon, PokemonSchema } from 'src/schemas/pokemon.schema';
import { CheckIdMiddleware } from 'src/global/middlewares/check-id.middleware';
import { CheckGenerationMiddleware } from 'src/global/middlewares/check-generation.middleware';
import { Generation, GenerationSchema } from 'src/schemas/generation.schema';

@Module({
  controllers: [PokemonController],
  providers: [PokemonService],
  imports: [
    MongooseModule.forFeature([
      { name: Pokemon.name, schema: PokemonSchema },
      { name: Generation.name, schema: GenerationSchema },
    ]),
  ],
})
export class PokemonModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(CheckIdMiddleware, CheckGenerationMiddleware)
      .forRoutes('pokemon/generation/:generation');
  }
}
