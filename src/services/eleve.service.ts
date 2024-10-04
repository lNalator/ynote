import { Injectable } from '@nestjs/common';
import { Eleve } from '../models/eleve.model';

@Injectable()
export class EleveService{
    private readonly eleves: Eleve[] = []

    create(eleve: Eleve) {
        this.eleves.push(eleve);
      }

    findAll(): Eleve[]{
        return this.eleves;
    }

    findOne(id: string): Promise<Eleve | undefined>{
        return new Promise((resolve) => {
            const eleve = this.eleves.find((eleve) => eleve.id === id);
            resolve(eleve);
        });
    }

    async update(id: string, eleve: Eleve): Promise<void> {
        const user = await this.findOne(id);
        await user.update(eleve);
      }

    delete(id: string): Promise<boolean> {
        const index = this.eleves.findIndex(e => e.id === id);
        if (index !== -1) {
            this.eleves.splice(index, 1);
            return Promise.resolve(true);
        }
        return Promise.resolve(false);
    }
}