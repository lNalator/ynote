import { ApiProperty } from "@nestjs/swagger";

export class CreateProfesseurDto{
    @ApiProperty({
        example: "Legris",
        required: true
    })
    nom: string;

    @ApiProperty({
        example: "Karim",
        required: true
    })
    prenom: string;

    
}