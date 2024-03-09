import { SetMetadata } from '@nestjs/common';
import { Role } from '../../../shared/schema/users';

export const ROLES_KEY = 'roles';
export const Roles = (...roles: Array<keyof typeof Role>) => SetMetadata(ROLES_KEY, roles);
