import { Column, Model, Table } from 'sequelize-typescript';

@Table
export class EleveModel extends Model {
    @Column
    nom: string;

    @Column
    prenom: string;

    @Column
    moyenne: Float32Array;
}

export interface Eleve{
    id: string;
    nom: string;
    prenom: string;
}