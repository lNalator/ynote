import { ApiProperty } from "@nestjs/swagger";

export class CreateNoteDto{
    @ApiProperty({
        example: 12,
        required: true
    })
    valeur: number;

    @ApiProperty({
        example: 1,
        required: true
    })
    eleveId: number;

    @ApiProperty({
        example: 6,
        required: true
    })
    matiereId: number;

    @ApiProperty({
        example: 1,     
        required: true
    })
    professeurId: number;
}