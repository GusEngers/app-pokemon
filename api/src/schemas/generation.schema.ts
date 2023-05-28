import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type GenerationDocument = HydratedDocument<Generation>;

@Schema()
export class Generation {
  @Prop({
    required: true,
  })
  generation: string;

  @Prop({
    required: true,
  })
  region: string;

  @Prop({
    default: '',
  })
  description: string;
}

export const GenerationSchema = SchemaFactory.createForClass(Generation);
