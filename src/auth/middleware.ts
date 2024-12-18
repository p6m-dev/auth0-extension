import { Response, NextFunction } from 'express';
import { Context, RequestWithUserInfo, UserInfo } from '../types';
import { fetchRemote } from '../io';

export class UnauthorizedError extends Error {}

export const identified = (ctx: Context) => {
  return async (
    req: RequestWithUserInfo,
    res: Response,
    next: NextFunction,
  ) => {
    const { AUTH0_DOMAIN } = ctx.secrets || {};
    const authorization = req.headers['authorization'];

    if (!authorization) {
      return next(new UnauthorizedError('Missing authorization'));
    }

    req.userInfo = await fetchRemote<UserInfo>(
      'GET',
      new URL(`https://${AUTH0_DOMAIN}/userinfo`),
      authorization,
    );

    next();
  };
};
