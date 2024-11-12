import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { MatieresService } from '../services/matieres.service';
import {
  ApiAcceptedResponse,
  ApiBearerAuth,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CreateMatiereDTO } from 'src/resources/createMatiere.ressource';
import { Matiere } from 'src/models/matiere.model';
import { Public } from 'src/auth/decorators/public.decorator';
import { Role, Roles } from 'src/auth/decorators/role.decorator';

@ApiTags('Matieres')
@Controller('matieres')
export class MatieresController {
  constructor(private matieresService: MatieresService) {}

  @Public()
  @Get()
  async findAll() {
    return this.matieresService.findAll();
  }

  @Public()
  @Get(':id')
  async findOne(@Param('id') id: number) {
    return this.matieresService.findOne(id);
  }

  @ApiBearerAuth()
  @Roles(Role.ADMIN)
  @Post()
  async create(@Body() createMatiereDTO: CreateMatiereDTO) {
    return this.matieresService.create(createMatiereDTO);
  }

  @ApiBearerAuth()
  @Roles(Role.ADMIN)
  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() createMatiereDTO: CreateMatiereDTO,
  ): Promise<void> {
    return this.matieresService.update(id, createMatiereDTO);
  }

  @ApiBearerAuth()
  @Roles(Role.ADMIN)
  @Delete(':id')
  async remove(@Param('id') id: number) {
    return this.matieresService.remove(id);
  }
}
