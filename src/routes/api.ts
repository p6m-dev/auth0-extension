import express from 'express';
import { version } from '../../webtask.json';
import { withIdentity } from '../auth/middleware';
import { Context } from '../types';

export default (ctx: Context) => {
  const router = express.Router();

  router.all('/', (req, res) => {
    console.log('!!! ctx', JSON.stringify(ctx));
    res.status(200).json({ version });
  });

  router.all('/clients', withIdentity, (req, res) => {
    console.log('!!! ctx', JSON.stringify(ctx));
    console.log('!!! fetching clients');
    res.status(200).json({});
  });

  return router;
};
