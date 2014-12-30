//Requirements
var application_root = __dirname;
//Configuration file
var config = require('../app/config/default');
// Log files system
var activateLogging = require("../lib/logging")(config.logs);
// Database connection
var mongo = require('../lib/mongo')(config.database);
// Authomatic services files loader
sitemap = require('../lib/sitemap')(config.services);


// START THE SERVER
// =============================================================================
// Global variables
global.app = require('../lib/server')(config.server);



app.get('/api', function(req, res) {
  res.send('REST API is running');
});


