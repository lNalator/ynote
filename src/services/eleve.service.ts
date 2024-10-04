import { Injectable } from '@nestjs/common';
import { Eleve } from '../interfaces/eleve.interface';

@Injectable()
export class EleveService{
    private readonly eleves: Eleve[] = []

    create(eleve: Eleve) {
        this.eleves.push(eleve);
      }

    findAll(): Eleve[]{
        return this.eleves;
    }

    findById(id: string): Promise<Eleve | undefined>{
        return new Promise((resolve) => {
            const eleve = this.eleves.find((eleve) => eleve.id === id);
            resolve(eleve);
        });
    }

    updateEleve(id: string, eleve: Partial<Eleve>): Promise<Eleve | undefined> {
        const index = this.eleves.findIndex(e => e.id === id);
        if (index === -1) {
            return Promise.resolve(undefined);
        }
        this.eleves[index] = { ...this.eleves[index], ...eleve };
        return Promise.resolve(this.eleves[index]);
    }

    deleteEleve(id: string): Promise<boolean> {
        const index = this.eleves.findIndex(e => e.id === id);
        if (index !== -1) {
            this.eleves.splice(index, 1);
            return Promise.resolve(true);
        }
        return Promise.resolve(false);
    }
}