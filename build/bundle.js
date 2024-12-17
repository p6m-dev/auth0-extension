// eslint-disable-next-line @typescript-eslint/no-require-imports
const app = require('./app');

module.exports = (context, req, res) => {
  console.log('!!! context', context);
  console.log('!!! req.url', req.url);
  return () => app(req, res);
};
