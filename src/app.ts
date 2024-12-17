import express from 'express';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import { version } from '../webtask.json';

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/', (req, res) => {
  res.status(200).json({ healthy: true, version });
});

app.use('/.extensions/notify', (req, res) => {
  res.status(204).send();
});

export default app;
