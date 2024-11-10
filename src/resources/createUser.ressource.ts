import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    example: 'donald.lerouge@ynote.io',
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
    example: 'password',
    required: true,
  })
  password: string;

  @ApiProperty({
    example: [2],
    description: 'Liste des roles',
    required: true,
  })
  roles: [number];

  @ApiProperty({
    example: [1, 2],
    description:
      "Liste des matieres, dans le cas ou l'utilisateur est un eleve",
    required: false,
  })
  matieresIds: number[];

  @ApiProperty({
    example: 1,
    description: "Id de la classe, dans le cas ou l'utilisateur est un eleve",
    required: false,
  })
  classeId: number;

  @ApiProperty({
    example: [1, 2],
    description:
      "Liste des classes, dans le cas ou l'utilisateur est un professeur",
    required: false,
  })
  classesIds: number[];
}
