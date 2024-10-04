import { Controller, Delete, Get, Param } from '@nestjs/common';
import { MatieresService } from '../services/matieres.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Matieres')
@Controller('matieres')
export class MatieresController {
  constructor(private matieresService: MatieresService) {}

  @Get()
  async findAll() {
    return this.matieresService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.matieresService.findOne(id);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.matieresService.remove(id);
  }
}
