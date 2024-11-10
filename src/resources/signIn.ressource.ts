import { ApiProperty } from '@nestjs/swagger';

export class SignInDto {
  @ApiProperty({
    example: 'test@ynote.io',
    description: "Adresse email de l'utilisateur",
    required: true,
  })
  email: string;

  @ApiProperty({
    example: 'test',
    description: "Mot de passe de l'utilisateur",
    required: true,
  })
  password: string;
}
