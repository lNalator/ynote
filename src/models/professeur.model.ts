import { Column, Model, Table } from 'sequelize-typescript';

@Table
export class Professeur extends Model{
    @Column
    nom: string;

    @Column
    prenom: string;
}
