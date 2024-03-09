import { SetMetadata } from '@nestjs/common';
import { ADMIN_KEY } from '../constants/key-decorators';
import { Role } from 'src/shared/schema/users';

export const AdminAccess = () => SetMetadata(ADMIN_KEY, Role.ADMIN);