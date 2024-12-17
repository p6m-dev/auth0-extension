// eslint-disable-next-line @typescript-eslint/no-require-imports
var Webtask = require('webtask-tools');
// eslint-disable-next-line @typescript-eslint/no-require-imports
var app = require('./dist/app');

module.exports = Webtask.fromExpress(app);
