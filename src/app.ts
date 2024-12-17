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

if (require.main === module) {
  process.on('unhandledRejection', (reason, promise) => {
    console.warn('Unhandled Rejection at:', promise, 'reason:', reason);
    process.exit(-1);
  });

  process.on('uncaughtException', (err) => {
    console.error('Uncaught Exception:', err);
    process.exit(-1);
  });

  console.log('Starting app...\n');
  app.listen(3000, '0.0.0.0', () => {
    console.log('Listening on http://0.0.0.0:3000');
  });
}
