import { ApiProperty } from "@nestjs/swagger";

export class CreateClasseDTO {
  @ApiProperty({
    example: "A1",
    required: true
  })
  libelle: string;

  @ApiProperty({
    example: ["E1", "E2"],
  })
  elevesIds: string[];
}
