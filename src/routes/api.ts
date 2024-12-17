import express from 'express';
import { version } from '../../webtask.json';

export default () => {
  const router = express.Router();

  router.get('/', (req, res) => {
    res.status(200).json({ version });
  });

  return router;
};
