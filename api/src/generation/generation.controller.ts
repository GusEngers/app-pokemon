import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { GenerationService } from './generation.service';
import { CreateGenerationDto } from './dto/create-generation.dto';
import { UpdateGenerationDto } from './dto/update-generation.dto';

@Controller('generation')
export class GenerationController {
  constructor(private readonly generationService: GenerationService) {}

  @Post()
  async create(@Body() createGenerationDto: CreateGenerationDto) {
    const response = await this.generationService.create(createGenerationDto);
    return response;
  }

  @Get()
  async findAll() {
    const response = await this.generationService.findAll();
    return response;
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateGenerationDto: UpdateGenerationDto,
  ) {
    const response = await this.generationService.update(
      id,
      updateGenerationDto,
    );
    return response;
  }
}
