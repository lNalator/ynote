import { ApiProperty } from '@nestjs/swagger';

export class CreateUserEleveDto {
  @ApiProperty({
    example: 'd.lerouge@ynote.io',
    required: true,
  })
  email: string;

  @ApiProperty({
    example: 'Donald',
    required: true,
  })
  prenom: string;

  @ApiProperty({
    example: 'Lerouge',
    required: true,
  })
  nom: string;

  @ApiProperty({
    example: 'eleve1',
    required: true,
  })
  password: string;

  @ApiProperty({
    example: 3,
    description: 'Id du role',
    required: true,
  })
  roleId: number;

  @ApiProperty({
    example: [1, 2],
    description:
      "Liste des matieres, dans le cas ou l'utilisateur est un eleve",
    required: false,
  })
  matieresIds: number[];

  @ApiProperty({
    example: [1],
    maxLength: 1,
    maxItems: 1,
    description:
      "Liste des classes, dans le cas ou l'utilisateur est un professeur ou un eleve",
    required: false,
  })
  classesIds: number[];
}
