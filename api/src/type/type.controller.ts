import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Delete,
} from '@nestjs/common';
import { TypeService } from './type.service';
import { CreateTypeDto } from './dto/create-type.dto';
import { UpdateTypeDto } from './dto/update-type.dto';

@Controller('type')
export class TypeController {
  constructor(private readonly typeService: TypeService) {}

  @Post()
  async create(@Body() createTypeDto: CreateTypeDto) {
    const response = await this.typeService.create(createTypeDto);
    return response;
  }

  @Get()
  async findAll() {
    const response = await this.typeService.findAll();
    return response;
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateTypeDto: UpdateTypeDto) {
    const response = await this.typeService.update(id, updateTypeDto);
    return response;
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    const response = await this.typeService.delete(id);
    return response;
  }
}
