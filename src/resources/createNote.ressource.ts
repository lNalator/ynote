import { ApiProperty } from '@nestjs/swagger';

export class CreateNoteDto {
  @ApiProperty({
    maximum: 20,
    example: 12,
    description: 'La valeur de la note doit être comprise entre 0 et 20',
    required: true,
  })
  valeur: number;

  @ApiProperty({
    example: 1,
    required: true,
  })
  eleveId: number;

  @ApiProperty({
    example: 1,
    required: true,
  })
  matiereId: number;

  @ApiProperty({
    example: 1,
    required: true,
  })
  professeurId: number;
}
