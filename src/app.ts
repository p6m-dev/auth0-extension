import express from 'express';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import meta from './routes/meta';
import lifecycle from './routes/lifecycle';
import api from './routes/api';
import { version, name } from '../webtask.json';

const BASE_PATHS = ['', `/${name}`, `/api/run/p6m/${name}`];
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
