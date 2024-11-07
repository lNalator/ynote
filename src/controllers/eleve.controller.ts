import {
  Controller,
  Get,
  BadRequestException,
  NotFoundException,
  Param,
  Body,
  Patch,
  Delete,
  Post,
} from '@nestjs/common';
import { EleveService } from '../services/eleve.service';
import { Eleve } from '../models/eleve.model';
import { ApiAcceptedResponse, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateEleveDto } from 'src/resources/createEleve.ressource';

@ApiTags('Eleves')
@Controller('eleves')
export class EleveController {
  constructor(private eleveService: EleveService) {}

  @Get()
  async findAll(): Promise<Eleve[]> {
    return this.eleveService.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: number): Promise<Eleve> {
    return this.eleveService.findOne(id);
  }

  @ApiAcceptedResponse({ type: CreateEleveDto })
  @ApiResponse({ type: Eleve })
  @Post()
  async create(@Body() createEleveDto: CreateEleveDto): Promise<Eleve> {
    return this.eleveService.create(createEleveDto);
  }

  @Delete(':id')
  async deleteEleve(@Param('id') id: number): Promise<void> {
    return this.eleveService.remove(id);
  }
}
