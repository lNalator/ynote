import { ApiProperty } from '@nestjs/swagger';

export class CreateUserAdminDto {
  @ApiProperty({
    example: 'admin1@ynote.io',
    required: true,
  })
  email: string;

  @ApiProperty({
    example: 'Admin1',
    required: true,
  })
  prenom: string;

  @ApiProperty({
    example: 'Admin1',
    required: true,
  })
  nom: string;

  @ApiProperty({
    example: 'admin1',
    required: true,
  })
  password: string;

  @ApiProperty({
    example: 1,
    description: 'Id du role',
    required: true,
  })
  roleId: number;
}
