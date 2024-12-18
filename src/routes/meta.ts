import express from 'express';
import metadata from '../../webtask.json';
import { Context } from '../types';

export default (ctx: Context) => {
  const router = express.Router();

  router.all('/', (req, res) => {
    console.log('!!! ctx', JSON.stringify(ctx));
    res.status(200).json(metadata);
  });

  return router;
};
