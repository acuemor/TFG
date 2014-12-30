var mongoose = require('mongoose');
var chalk = require('chalk');
exports = module.exports = mongoMain;
function mongoMain(mongoCfg) {
  // MONGODB MODEL EXTENSIONS /////////////////////////////////////////////////
//  mongoose.Model.paginate = function(opts, callback) {
//    var limit = opts.limit || 10;
//    var page = opts.page || 1;
//    var searchBean = opts.searchBean || {};
//    var sortBean = opts.sortBean || {};
//    var Model = this;
//    Model.count(searchBean,function(err, totalRecords) {
//      var query = Model.find(searchBean).sort(sortBean).skip((page - 1) * limit).limit(limit);
//      query.exec(function(error, records) {
//        
//        if (err)
//          return callback(err);
//        records.totalRecords = totalRecords;
//        records.currentPage = page;
//        records.totalPages = Math.ceil(totalRecords / limit);
//        callback(null, records);
//      });
//    });
//  };
  // MONGODB CONNECTION //////////////////////////////////////////////////////////
  mongoose.connect(mongoCfg.host, mongoCfg.name);
  var db = mongoose.connection;
  db.on('error', console.error.bind(console, '[FAIL] Database connection error:'));
  db.once('open', function callback() {
    var message = "[OK] Connected to database: ";
    log.info(message + JSON.stringify(mongoCfg));
    console.log(chalk.green(message) + JSON.stringify(mongoCfg));
  });
}
;