import { Controller, Get, BadRequestException, NotFoundException, Param, Body, Patch, Delete } from '@nestjs/common';
import { EleveService } from '../services/eleve.service';
import { Eleve } from '../interfaces/eleve.interface';

@Controller('eleves')
export class EleveController{
    constructor(private eleveService: EleveService){}

    @Get()
    async findAll(): Promise<Eleve[]> {
        try {
            const eleves = await this.eleveService.findAll();
            if (!eleves.length) {
                throw new NotFoundException('No eleves found');
            }
            return eleves;
        } catch (error) {
            console.error('Error fetching eleves:', error);
            throw new BadRequestException('Failed to fetch eleves');
        }
    }

    @Get(':id')
    async findById(@Param('id') id: string): Promise<Eleve>{
        try {
            const eleve = await this.eleveService.findById(id);
            if (!eleve) {
                throw new NotFoundException(`Élève avec ID ${id} non trouvé`);
            }
            return eleve;
        } catch (error) {
            console.error('Erreur lors de la recherche de l\'élève:', error);
            throw new NotFoundException(`Élève avec ID ${id} non trouvé`);
        }
    }

    @Patch(':id')
    async updateEleve(@Param('id') id: string, @Body() eleve: Partial<Eleve>): Promise<Eleve | undefined> {
        try {
            console.log(`Mise à jour de l'élève avec ID : ${id}`);
            
            const updatedEleve = await this.eleveService.updateEleve(id, eleve);
            console.log('Mise à jour de l\'élève effectuée avec succès');

            return updatedEleve;
        } catch (error) {
            console.error('Erreur lors de la mise à jour de l\'élève:', error);
            throw new NotFoundException(`Élève avec ID ${id} non trouvé`);
        }
    }

    @Delete(':id')
    async deleteEleve(@Param('id') id: string): Promise<void> {
        try {
            console.log(`Suppression de l'élève avec ID : ${id}`);
            
            await this.eleveService.deleteEleve(id);
            console.log('Suppression de l\'élève effectuée avec succès');
        } catch (error) {
            console.error('Erreur lors de la suppression de l\'élève:', error);
            throw new NotFoundException(`Élève avec ID ${id} non trouvé`);
        }
    }
}