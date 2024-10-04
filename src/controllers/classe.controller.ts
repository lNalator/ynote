import { Controller, Delete, Get, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Classe } from 'src/models/classe.model';
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

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return this.classeService.remove(id);
  }
}
