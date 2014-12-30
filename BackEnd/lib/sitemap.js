var walk = require('walk');
options = {
  followLinks: false
  // directories with these keys will be skipped
, filters: ["_temp", "temp"]
};
function pipelines(cfg) {
  // Services loading
  var walker = walk.walk(cfg.dir, options);
  walker.on("file", function (root, fileStats, next) 
  {
    var serviceName = root + '/' + fileStats.name;
    require(serviceName);
    next();
  });
  
}

// Functions which will be available to external callers
exports = module.exports = pipelines;
