import express from 'express';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import webtask from '../webtask.json';

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.get('/meta', (req, res) => {
  res.status(200).json(webtask);
});

app.post('/.lifecycle', (req, res) => {
  res.status(204).send();
});

app.get('/health', (req, res) => {
  res.status(200).json({ healthy: true, version: webtask.version });
});

export default app;
