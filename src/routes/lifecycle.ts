import express from 'express';
import { Context } from '../types';

export default (ctx: Context) => {
  const router = express.Router();

  router.all('/', (req, res) => {
    console.log('!!! ctx', JSON.stringify(ctx));
    res.status(204).send();
  });

  return router;
};
