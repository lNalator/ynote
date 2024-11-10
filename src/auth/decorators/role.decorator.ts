import { SetMetadata } from '@nestjs/common';

// Authorization
export enum Role {
  ADMIN = 'admin',
  PROFESSEUR = 'professeur',
  ELEVE = 'eleve',
}

export const ROLES_KEY = 'roles';
export const Roles = (...roles: Role[]) => SetMetadata(ROLES_KEY, roles);
