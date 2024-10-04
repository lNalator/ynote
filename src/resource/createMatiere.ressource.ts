import { ApiProperty } from "@nestjs/swagger";

export class CreateMatiereDTO {
  @ApiProperty({
    example: "Mathématiques",
    required: true
  })
  nom: string;
}
