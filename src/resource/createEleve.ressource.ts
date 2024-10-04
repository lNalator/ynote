import { ApiProperty } from "@nestjs/swagger";

export class CreateEleveDto{
    @ApiProperty({
        example: "Lerouge",
        required: true
    })
    nom: string;

    @ApiProperty({
        example: "Donald",
        required: true
    })
    prenom: string;

    @ApiProperty({
        example: 12,
    })
    moyenne: number;
}