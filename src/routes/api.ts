import express from 'express';
import { version } from '../../webtask.json';
import { identified, UnauthorizedError } from '../auth/middleware';
import { Context, RequestWithUserInfo } from '../types';

export default (ctx: Context) => {
  console.log('api route', ctx.meta);
  const router = express.Router();

  router.all('/', (req, res) => {
    res.status(200).json({ version, meta: ctx.meta });
  });

  router.get('/me', identified(ctx), (req, res) => {
    const { userInfo } = req as RequestWithUserInfo;
    if (!userInfo) {
      throw new UnauthorizedError('Missing User Info');
    }
    res.status(200).json(userInfo);
  });

  return router;
};
