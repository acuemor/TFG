'use strict';
var chalk = require('chalk');

exports.info = function (message) {
  log.info(message);
  console.log(chalk.green(message));
};
exports.info = function (statement, description) {
  log.info(statement + description);
  console.log(chalk.green(statement) + description);
};
exports.error = function (message) {
  log.error(message);
  console.log(chalk.green(message));
};
exports.error = function (statement, description) {
  log.error(statement + description);
  console.log(chalk.green(statement) + description);
};