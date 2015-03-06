var express = require('express');
var tfgConsole = require('../app/lib/utils/tfgConsole');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.send({
      title:"This is some default action"
  });
});

/* Endpoints públicos. */
router.get('/model', function(req, res) {
    var model = require('../models/home/somemodel')();
    model.setName('Name set in action');
    tfgConsole.info("[/model] Router model: ",model.toJson());
    res.send(model.toJson());
});


module.exports = router;
