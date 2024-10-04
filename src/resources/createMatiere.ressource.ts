import { IsArray, IsString } from 'class-validator';

export class CreateMatiereDTO {
  @IsString()
  nom: string;

  @IsArray()
  etudiantsIds: string[];
}
