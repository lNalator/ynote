import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiTags,
} from '@nestjs/swagger';
import { Public } from 'src/auth/decorators/public.decorator';
import { Role, Roles } from 'src/auth/decorators/role.decorator';
import { Classe } from 'src/models/classe.model';
import { CreateClasseDTO } from 'src/resources/createClasse.ressource';
import { ClasseService } from 'src/services/classe.service';

@ApiTags('Classes')
@Controller('classes')
export class ClasseController {
  constructor(private classeService: ClasseService) {}

  @Public()
  @Get()
  async findAll(): Promise<Classe[]> {
    return this.classeService.findAll();
  }

  @Public()
  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Classe> {
    return this.classeService.findOne(id);
  }

  @ApiBearerAuth()
  @Roles(Role.ADMIN)
  @Post()
  async create(@Body() createClasseDTO: CreateClasseDTO): Promise<Classe> {
    return this.classeService.create(createClasseDTO);
  }

  @ApiBearerAuth()
  @Roles(Role.ADMIN)
  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() createClasseDTO: CreateClasseDTO,
  ): Promise<void> {
    return this.classeService.update(id, createClasseDTO);
  }

  @ApiBearerAuth()
  @Roles(Role.ADMIN)
  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    return this.classeService.remove(id);
  }
}
