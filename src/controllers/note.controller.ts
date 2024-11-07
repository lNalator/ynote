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
import { ApiTags } from '@nestjs/swagger';
import { CreateNoteDto } from 'src/resources/createNote.ressource';

@ApiTags('Notes')
@Controller('notes')
export class NoteController {
  constructor(private noteService: NoteService) {}

  @Get()
  async findAll() {
    return this.noteService.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: number): Promise<Note> {
    return this.noteService.findOne(id);
  }

  @Post()
  async create(@Body() createNoteDto: CreateNoteDto): Promise<Note> {
    return this.noteService.create(createNoteDto);
  }

  @Delete(':id')
  async deleteNote(@Param('id') id: number): Promise<void> {
    return this.noteService.delete(id);
  }
}
