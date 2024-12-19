import { Request, Response, NextFunction } from 'express';
import { Context, RequestWithUserInfo, UserInfo } from './types';
import { fetchRemote } from './io';
import { version } from '../webtask.json';

export class BadRequestError extends Error {}
export class NotFoundError extends Error {}
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

export const errorHandler = (ctx: Context) => {
  return (err: Error, req: Request, res: Response) => {
    console.error(err);

    res.status(500);
    const error = {
      error: err.message,
      version,
      meta: ctx.meta,
    };

    if (err instanceof BadRequestError) {
      res.status(400);
    }

    if (err instanceof UnauthorizedError) {
      res.status(401);
    }

    if (err instanceof NotFoundError) {
      res.status(404);
    }

    res.json(error);
  };
};
