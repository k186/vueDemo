const path = require('path');
const config = require('../config');

exports.staticPath = function (_path) {
  let staticSubDirectory = process.env.NODE_ENV === '"production"'
    ? config.build.staticSubDirectory
    : config.dev.staticSubDirectory
  return path.posix.join(staticSubDirectory, _path)
}
