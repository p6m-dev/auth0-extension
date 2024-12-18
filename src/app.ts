import express from 'express';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import meta from './routes/meta';
import lifecycle from './routes/lifecycle';
import api from './routes/api';
import { version, name } from '../webtask.json';
import { Context } from './types';

const BASE_PATHS = ['', `/${name}`, `/api/run/p6m/${name}`];
const path = (path: string) => BASE_PATHS.map((p) => `${p}${path}`);

export const createApp = (ctx: Context) => {
  console.log('!!! ctx', JSON.stringify(ctx));

  const app = express();
  app.use(logger('dev'));
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(cookieParser());

  app.use(path('/api'), api(ctx));
  app.use(path('/meta'), meta(ctx));
  app.use(path('/.lifecycle'), lifecycle(ctx));

  app.use((req, res) => {
    res.status(404).json({ error: 'Not Found', url: req.url, version });
  });

  return app;
};
