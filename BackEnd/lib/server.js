var express = require('express');
var path = require("path");
var bodyParser = require('body-parser');
var tfgConsole = require('./utils/tfgConsole');
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
  tfgConsole.info("[OK] Server running on port: ", port);
  return app;
}

exports = module.exports = setup;