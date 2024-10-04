import { Controller, Delete, Get } from '@nestjs/common';
import { MatieresService } from '../../services/matieres.service';

@Controller('matieres')
export class MatieresController {
  constructor(private matieresService: MatieresService) {}

  @Get()
  async findAll() {
    return this.matieresService.findAll();
  }

  @Get(':id')
  async findOne(id: string) {
    return this.matieresService.findOne(id);
  }

  @Delete()
  async remove(id: string) {
    return this.matieresService.remove(id);
  }
}
