import { SetMetadata } from '@nestjs/common';

export const META_DATA_ROLES_KEY = 'ROLES'

export const Roles = (...roles: string[]) =>
  SetMetadata('ROLES', roles);
