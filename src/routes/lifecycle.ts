import express from 'express';

export default () => {
  const router = express.Router();

  router.get('/', (req, res) => {
    res.status(204).send();
  });

  return router;
};
