import {
  Module,
  MiddlewareConsumer,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { TypeService } from './type.service';
import { TypeController } from './type.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Type, TypeSchema } from 'src/schemas/type.schema';
import { CheckIdMiddleware } from 'src/global/middlewares/check-id.middleware';

@Module({
  controllers: [TypeController],
  providers: [TypeService],
  imports: [
    MongooseModule.forFeature([{ name: Type.name, schema: TypeSchema }]),
  ],
})
export class TypeModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(CheckIdMiddleware)
      .forRoutes(
        { path: 'type/:id', method: RequestMethod.PUT },
        { path: 'type/:id', method: RequestMethod.DELETE },
      );
  }
}
