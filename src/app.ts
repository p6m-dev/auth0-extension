import express from 'express';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import meta from './routes/meta';
import lifecycle from './routes/lifecycle';
import api from './routes/api';
import { version } from '../webtask.json';

const BASE_PATHS = [
  '',
  '/p6m-auth0-extension',
  '/api/run/p6m/p6m-auth0-extension',
];
const path = (path: string) => BASE_PATHS.map((p) => `${p}${path}`);

const app = express();
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(path('/api'), api());
app.use(path('/meta'), meta());
app.use(path('/.lifecycle'), lifecycle());

app.use((req, res) => {
  res.status(404).json({ error: 'Not Found', url: req.url, version });
});

export default app;
