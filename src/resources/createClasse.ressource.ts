import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsString } from 'class-validator';

export class CreateClasseDTO {
  @ApiProperty({ example: '1A' })
  @IsString()
  libelle: string;
}
