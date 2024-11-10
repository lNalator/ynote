import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { Note } from 'src/models/note.model';
import { NoteService } from 'src/services/note.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreateNoteDto } from 'src/resources/createNote.ressource';
import { Public } from 'src/auth/decorators/public.decorator';
import { Role, Roles } from 'src/auth/decorators/role.decorator';

@ApiTags('Notes')
@Controller('notes')
export class NoteController {
  constructor(private noteService: NoteService) {}

  @Public()
  @Get()
  async findAll() {
    return this.noteService.findAll();
  }

  @Public()
  @Get(':id')
  async findById(@Param('id') id: number): Promise<Note> {
    return this.noteService.findOne(id);
  }

  @ApiBearerAuth()
  @Roles(Role.ADMIN, Role.PROFESSEUR)
  @Post()
  async create(@Body() createNoteDto: CreateNoteDto): Promise<Note> {
    return this.noteService.create(createNoteDto);
  }

  @ApiBearerAuth()
  @Roles(Role.ADMIN, Role.PROFESSEUR)
  @Delete(':id')
  async deleteNote(@Param('id') id: number): Promise<void> {
    return this.noteService.delete(id);
  }
}
