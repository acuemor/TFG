var express = require('express');
var path = require("path");
var bodyParser = require('body-parser');
var chalk = require('chalk');
function setup(cfg) {
  var app = express();
  // configure app to use bodyParser()
// this will let us get the data from a POST
  app.use(bodyParser.urlencoded({extended: true}));
  app.use(bodyParser.json());
  var enableCORS = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');

    // intercept OPTIONS method
    if ('OPTIONS' == req.method) {
      res.send(200);
    }
    else {
      next();
    }
  };

// enable CORS!
  app.use(enableCORS);
  var port = process.env.PORT || cfg.port; // set our port
  app.listen(port);
  var message = "[OK] Server running on port: ";
  log.info(message + port);
  console.log(chalk.green(message) + port);
  return app;
}

exports = module.exports = setup;