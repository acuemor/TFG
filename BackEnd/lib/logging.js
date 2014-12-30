var winston = require('winston');
// Functions which will be available to external callers
exports.logging= module.exports = configure = function(cfg) {
// Configure the logger for `general`
global.log = new (winston.Logger)({
  transports: [
    new (winston.transports.DailyRotateFile)({
      json: false,
      level: cfg.level,
      label: 'general logs',
      filename: cfg.file,
      maxFiles: 10,
      maxsize: 1000000
    })
  ]
});

// http log file
global.httpLog = require('winston-request-logger').create(new (winston.Logger)({
  transports: [
    new (winston.transports.DailyRotateFile)({
      json: false,
      label: 'http logs',
      filename: cfg.http,
      maxFiles: 10,
      maxsize: 1000000,
      level: cfg.socketLevel
    })
  ]
}));

}
