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

// Load middlewares
  require('./middleware/CORSMiddleware')(app);
// enable CORS!
  var port = process.env.PORT || cfg.port; // set our port
  app.listen(port);
  tfgConsole.info("[OK] Server running on port: ", port);
  return app;
}

exports = module.exports = setup;