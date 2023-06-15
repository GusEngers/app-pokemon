import { Module } from '@nestjs/common';
import { TypeService } from './type.service';
import { TypeController } from './type.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Type, TypeSchema } from 'src/schemas/type.schema';

@Module({
  controllers: [TypeController],
  providers: [TypeService],
  imports: [
    MongooseModule.forFeature([{ name: Type.name, schema: TypeSchema }]),
  ],
})
export class TypeModule {}
