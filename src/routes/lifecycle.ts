import express from 'express';

export default () => {
  const router = express.Router();

  router.all('/', (req, res) => {
    res.status(204).send();
  });

  return router;
};
