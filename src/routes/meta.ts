import express from 'express';
import metadata from '../../webtask.json';

export default () => {
  const router = express.Router();

  router.all('/', (req, res) => {
    res.status(200).json(metadata);
  });

  return router;
};
