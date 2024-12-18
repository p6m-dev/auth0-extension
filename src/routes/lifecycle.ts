import express from 'express';
import { Context } from '../types';

export default (ctx: Context) => {
  console.log('lifecycle route', ctx.meta);

  const router = express.Router();

  router.all('/', (req, res) => {
    res.status(204).send();
  });

  return router;
};
