import { IncomingMessage, ServerResponse } from 'http';
import { createApp } from './app';
import { Context } from './types';

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
  createApp({ secrets: {} }).listen(3000, '0.0.0.0', () => {
    console.log('Listening on http://0.0.0.0:3000');
  });
}

module.exports = (ctx: Context, req: IncomingMessage, res: ServerResponse) => {
  return createApp(ctx)(req, res);
};
