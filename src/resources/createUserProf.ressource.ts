import { ApiProperty } from '@nestjs/swagger';

export class CreateUserProfDto {
  @ApiProperty({
    example: 'prof1@ynote.io',
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
    example: 'prof123',
    required: true,
  })
  password: string;

  @ApiProperty({
    example: 2,
    description: 'Id du role',
    required: true,
  })
  roleId: number;

  @ApiProperty({
    example: [1, 2],
    description:
      "Liste des classes, dans le cas ou l'utilisateur est un professeur ou un eleve",
    required: false,
  })
  classesIds: number[];
}
