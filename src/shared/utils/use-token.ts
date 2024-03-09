import * as jwt from 'jsonwebtoken';
import { IUseToken } from 'src/modules/auth/guards/auth-guard';
import { AuthTokenResult } from 'src/modules/auth/interface/auth.interface';

export const useToken = (token: string): IUseToken | string => {
  try {
    const decode = jwt.decode(token.replace('Bearer ', '')) as AuthTokenResult;
    const currentDate = new Date();
    const expiresDate = new Date(decode.exp);

    return {
      sub: decode.sub,
      role: decode.role,
      isExpired: +expiresDate <= +currentDate / 1000,
    };
  } catch (error) {
    return 'Token is invalid';
  }
};
