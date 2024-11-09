import { ApiProperty } from '@nestjs/swagger';

export class SignInDto {
  @ApiProperty({
    example: 'test',
    description: "Nom d'utilisateur",
    required: true,
  })
  username: string;

  @ApiProperty({
    example: 'test',
    description: 'Mot de passe',
    required: true,
  })
  password: string;
}
