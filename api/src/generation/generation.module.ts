import { Module } from '@nestjs/common';
import { GenerationService } from './generation.service';
import { GenerationController } from './generation.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Generation, GenerationSchema } from 'src/schemas/generation.schema';

@Module({
  controllers: [GenerationController],
  providers: [GenerationService],
  imports: [
    MongooseModule.forFeature([
      { name: Generation.name, schema: GenerationSchema },
    ]),
  ],
})
export class GenerationModule {}
