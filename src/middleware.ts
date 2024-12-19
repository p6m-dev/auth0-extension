import { Request, Response, NextFunction } from 'express';
import { Context, RequestWithUserInfo, UserInfo } from './types';
import { fetchRemote } from './io';
import { version } from '../webtask.json';
import { createRemoteJWKSet, jwtVerify } from 'jose';

export class BadRequestError extends Error {}
export class NotFoundError extends Error {}
export class UnauthorizedError extends Error {}

export const identified = (ctx: Context) => {
  const { AUTH0_DOMAIN } = ctx.secrets || {};
  const jwks = createRemoteJWKSet(
    new URL(`https://${AUTH0_DOMAIN}/.well-known/jwks.json`),
  );

  return async (
    req: RequestWithUserInfo,
    res: Response,
    next: NextFunction,
  ) => {
    let token = req.headers['authorization'] || '';

    const [type, jwt] = token.split(' ');
    if (type && type.toLowerCase() === 'bearer') {
      token = jwt;
    }

    if (!token) {
      return next(new UnauthorizedError('Missing authorization'));
    }

    req.userInfo = await Promise.all(
      ['JWT', 'at+jwt'].map((typ) =>
        jwtVerify<UserInfo>(token, jwks, {
          issuer: 'https://auth.p6m.run/',
          typ,
        })
          .then(({ payload }) => {
            console.log(`Verified ${typ} token`, JSON.stringify(payload));
            return payload;
          })
          .catch((e) => {
            console.warn(`Unverified ${typ} token: ${e.message}`);
            return undefined;
          }),
      ),
    ).then((payloads) => payloads.find((p) => !!p));

    if (!req.userInfo) {
      return next(new UnauthorizedError('Unauthorized'));
    }

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
