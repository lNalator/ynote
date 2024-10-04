import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Professeur } from 'src/models/professeur.model';

@Injectable()
export class ProfesseurService{
    constructor(
        @InjectModel(Professeur)
        private userModel: typeof Professeur,
      ) {}

      async findAll(): Promise<Professeur[]> {
        try {
          return await this.userModel.findAll();
        } catch (error) {
          throw new Error('Error fetching all professors');
        }
      }

      findOne(id: string): Promise<Professeur> {
        return this.userModel
          .findOne({
            where: {
              id,
            },
          })
          .then((result) => {
            if (!result) {
              throw new Error(`User with id ${id} not found`);
            }
            return result;
          });
      }

      async update(id: string, professeur: Professeur): Promise<void> {
        const user = await this.findOne(id);
        await user.update(professeur);
      }

      async delete(id: string): Promise<void> {
        const user = await this.findOne(id);
        await user.destroy();
      }


}