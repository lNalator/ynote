import { ApiProperty } from '@nestjs/swagger';

export class CreateRoleDto {
  @ApiProperty({
    example: 'Admin',
    description: 'Nom du role',
    required: true,
  })
  name: string;
}
