import { Column, Model, Table } from "sequelize-typescript";

@Table
export class Classe extends Model {

    @Column
    libelle: string;
}