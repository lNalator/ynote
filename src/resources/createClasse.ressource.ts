import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateClasseDTO {
  @ApiProperty({ example: '1A', required: true })
  @IsString()
  libelle: string;
}
