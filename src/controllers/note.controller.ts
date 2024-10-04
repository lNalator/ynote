import { BadRequestException, Body, Controller, Delete, Get, NotFoundException, Param, Patch } from "@nestjs/common";
import { Note } from "src/models/note.model";
import { NoteService } from "src/services/note.service";

@Controller('notes')
export class NoteController{
    constructor(private noteService: NoteService){}

    @Get()
    async findAll() {
        try{
        const notes = this.noteService.findAll();
        if(!notes){
            throw new NotFoundException('Aucune note trouvé')
        }
        return notes;
        }catch(error){
            console.error('Error fetching notes:', error);
            throw new BadRequestException('Failed to fetch notes');
        }
    }

    @Get(':id')
    async findById(@Param('id') id: string): Promise<Note>{
        try {
            const note = await this.noteService.findOne(id);
            if (!note) {
                throw new NotFoundException(`Note avec ID ${id} non trouvé`);
            }
            return note;
        } catch (error) {
            console.error('Erreur lors de la recherche de la note:', error);
            throw new NotFoundException(`Note avec ID ${id} non trouvé`);
        }
    }

    @Patch(':id')
    async updateNote(@Param('id') id: string, @Body() note: Note): Promise<Note>{
        try {
            const updatedNote = await this.noteService.update(id, note);
            if(updatedNote === undefined){
                throw new NotFoundException(`Note avec ID ${id} non trouvé`);
            }
            return updatedNote;
        } catch (error) {
            console.error('Erreur lors de la mise à jour de la note:', error);
            throw new NotFoundException(`Note avec ID ${id} non trouvé`);
        }   
    }

    @Delete(':id')
    async deleteNote(@Param('id') id: string): Promise<void>{
        try {
            console.log(`Suppression de la note avec ID : ${id}`);
            await this.noteService.delete(id);
            console.log('Suppression de la note effectuée avec succès');
        } catch (error) {
            console.error('Erreur lors de la suppression de la note:', error);
            throw new NotFoundException(`Note avec ID ${id} non trouvé`);
        }
    }
}
