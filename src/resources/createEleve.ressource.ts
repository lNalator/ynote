import { ApiProperty } from '@nestjs/swagger';

export class CreateEleveDto {
  @ApiProperty({
    example: 'Lerouge',
    required: true,
  })
  nom: string;

  @ApiProperty({
    example: 'Donald',
    required: true,
  })
  prenom: string;

  @ApiProperty({
    example: 1,
    required: true,
  })
  classeId: number;

  @ApiProperty({
    example: [1, 2],
    required: true,
  })
  matieresIds: number[];
}
