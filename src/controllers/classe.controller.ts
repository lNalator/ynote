import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ApiAcceptedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Classe } from 'src/models/classe.model';
import { CreateClasseDTO } from 'src/resources/createClasse.ressource';
import { ClasseService } from 'src/services/classe.service';

@ApiTags('Classes')
@Controller('classes')
export class ClasseController {
  constructor(private classeService: ClasseService) {}

  @Get()
  async findAll(): Promise<Classe[]> {
    return this.classeService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Classe> {
    return this.classeService.findOne(id);
  }

  @ApiAcceptedResponse({ type: CreateClasseDTO })
  @ApiOkResponse({ type: Classe })
  @Post()
  async create(@Body() createClasseDTO: CreateClasseDTO): Promise<Classe> {
    return this.classeService.create(createClasseDTO);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return this.classeService.remove(id);
  }
}
