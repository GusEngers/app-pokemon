import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { PokemonModule } from './modules/pokemon/pokemon.module';
import { TypeModule } from './modules/type/type.module';
import { GenerationModule } from './modules/generation/generation.module';
import * as dotenv from 'dotenv';
dotenv.config();

@Module({
  imports: [
    MongooseModule.forRoot(
      process.env.MONGO_URI || 'mongodb://localhost:5432/pokeapp',
    ),
    PokemonModule,
    TypeModule,
    GenerationModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
