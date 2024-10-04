import { IsArray, IsString } from 'class-validator';

export class CreateClasseDTO {
  @IsString()
  libelle: string;

  @IsArray()
  elevesIds: string[];
}
