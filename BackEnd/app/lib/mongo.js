var mongoose = require('mongoose');
var tfgConsole = require('./utils/tfgConsole');
exports = module.exports = mongoMain;
function mongoMain(mongoCfg) {

  // MONGODB CONNECTION //////////////////////////////////////////////////////////
  mongoose.connect(mongoCfg.host, mongoCfg.name);
  var db = mongoose.connection;
  db.on('error', console.error.bind(console, '[FAIL] Database connection error:'));
  db.once('open', function callback() {
    tfgConsole.info("[OK] Connected to database: ", JSON.stringify(mongoCfg));
  });
}
;