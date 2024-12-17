import express from 'express';
import cookieParser from 'cookie-parser';
import logger from 'morgan';

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/', (req, res) => {
  res.status(200).json({ healthy: true });
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

  console.log('Starting app...');
  app.listen(3000, '0.0.0.0', () => {
    console.log('Listening on http://0.0.0.0:3000');
  });
}
