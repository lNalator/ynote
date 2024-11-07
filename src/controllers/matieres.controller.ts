import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { MatieresService } from '../services/matieres.service';
import { ApiAcceptedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { CreateMatiereDTO } from 'src/resources/createMatiere.ressource';
import { Matiere } from 'src/models/matiere.model';

@ApiTags('Matieres')
@Controller('matieres')
export class MatieresController {
  constructor(private matieresService: MatieresService) {}

  @Get()
  async findAll() {
    return this.matieresService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return this.matieresService.findOne(id);
  }

  @ApiAcceptedResponse({ type: CreateMatiereDTO })
  @Post()
  async create(@Body() createMatiereDTO: CreateMatiereDTO) {
    return this.matieresService.create(createMatiereDTO);
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    return this.matieresService.remove(id);
  }
}
