import express from 'express';
import metadata from '../../webtask.json';

export default () => {
  const router = express.Router();

  router.get('/', (req, res) => {
    res.status(200).json(metadata);
  });

  return router;
};
