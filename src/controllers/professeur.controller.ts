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
import { Professeur } from 'src/models/professeur.model';
import { ProfesseurService } from 'src/services/professeur.service';
import { ApiAcceptedResponse, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateProfesseurDto } from 'src/resources/createProfesseur.ressource';

@ApiTags('Professeurs')
@Controller('professeurs')
export class ProfesseurController {
  constructor(private professeurService: ProfesseurService) {}

  @Get()
  async findAll() {
    return this.professeurService.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: number): Promise<Professeur> {
    return this.professeurService.findOne(id);
  }

  @ApiAcceptedResponse({ type: CreateProfesseurDto })
  @ApiResponse({ type: Professeur })
  @Post()
  async create(
    @Body() createProfesseurDto: CreateProfesseurDto,
  ): Promise<Professeur> {
    return this.professeurService.create(createProfesseurDto);
  }

  @Delete(':id')
  async deleteProfesseur(@Param('id') id: number): Promise<void> {
    return this.professeurService.delete(id);
  }
}
