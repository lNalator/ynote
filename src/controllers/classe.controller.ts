import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ApiAcceptedResponse, ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Public } from 'src/auth/decorators/public.decorator';
import { Classe } from 'src/models/classe.model';
import { CreateClasseDTO } from 'src/resources/createClasse.ressource';
import { ClasseService } from 'src/services/classe.service';

@ApiTags('Classes')
@Controller('classes')
export class ClasseController {
  constructor(private classeService: ClasseService) {}

  @ApiBearerAuth()
  @Get()
  async findAll(): Promise<Classe[]> {
    return this.classeService.findAll();
  }

  @ApiBearerAuth()
  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Classe> {
    return this.classeService.findOne(id);
  }

  @ApiBearerAuth()
  @ApiAcceptedResponse({ type: CreateClasseDTO })
  @Post()
  async create(@Body() createClasseDTO: CreateClasseDTO): Promise<Classe> {
    return this.classeService.create(createClasseDTO);
  }

  @ApiBearerAuth()
  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    return this.classeService.remove(id);
  }
}
