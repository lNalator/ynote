import { Controller, Get, BadRequestException, NotFoundException, Param, Body, Patch, Delete } from '@nestjs/common';
import { error } from 'console';
import { Professeur } from 'src/models/professeur.model';
import { ProfesseurService } from 'src/services/professeur.service';

@Controller('professeurs')
export class ProfesseurController{
    constructor(private professeurService: ProfesseurService){}

    @Get()
    async findAll() {
        try{
        const professeurs = this.professeurService.findAll();
        if(!professeurs){
            throw new NotFoundException('Aucun professeur trouvé')
        }
        return professeurs;
        }catch(error){
            console.error('Error fetching professeurs:', error);
            throw new BadRequestException('Failed to fetch professeurs');
        }
    }

    @Get(':id')
    async findById(@Param('id') id: string): Promise<Professeur>{
        try {
            const professeur = await this.professeurService.findOne(id);
            if (!professeur) {
                throw new NotFoundException(`Professeur avec ID ${id} non trouvé`);
            }
            return professeur;
        } catch (error) {
            console.error('Erreur lors de la recherche du professeur:', error);
            throw new NotFoundException(`Professeur avec ID ${id} non trouvé`);
        }
    }

    @Patch(':id')
    async updateProfesseur(@Param('id') id: string, @Body() professeur: Partial<Professeur>): Promise<Professeur | undefined> {
        try {
            console.log(`Mise à jour du professeur avec ID : ${id}`);
            const updatedProfesseur = await this.professeurService.update(id, professeur as Professeur);
            if (updatedProfesseur === undefined) {
                throw new NotFoundException(`Professeur avec ID ${id} non trouvé`);
            }
            console.log('Mise à jour du professeur effectuée avec succès');

            return updatedProfesseur;
        } catch (error) {
            console.error('Erreur lors de la mise à jour du professeur:', error);
            throw new NotFoundException(`Professeur avec ID ${id} non trouvé`);
        }
    }

    @Delete(':id')
    async deleteProfesseur(@Param('id') id: string): Promise<void> {
        try {
            console.log(`Suppression du Professeur avec ID : ${id}`);
            
            await this.professeurService.delete(id);
            console.log('Suppression du Professeur effectuée avec succès');
        } catch (error) {
            console.error('Erreur lors de la suppression du professeur:', error);
            throw new NotFoundException(`Professeur avec ID ${id} non trouvé`);
        }
    }
}