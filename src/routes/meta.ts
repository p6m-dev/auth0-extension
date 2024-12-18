import express from 'express';
import metadata from '../../webtask.json';
import { Context } from '../types';

export default (ctx: Context) => {
  console.log('meta route', ctx.meta);

  const router = express.Router();

  router.all('/', (req, res) => {
    res.status(200).json(metadata);
  });

  return router;
};
