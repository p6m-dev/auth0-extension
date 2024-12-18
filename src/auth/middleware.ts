import { Request, Response, NextFunction } from 'express';

export async function withIdentity(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const authorization = req.headers['authorization'];

  console.log('!!! checking authorization', authorization);

  next();
}
