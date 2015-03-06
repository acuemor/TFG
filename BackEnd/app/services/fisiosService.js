var Fisios = require('../../app/models/fisioterapeutas');
var tfgConsole = require('../../app/lib/utils/tfgConsole');
var express = require('express');
var router = express.Router();
//Get fisios list
router.get('/', function(req, res) {
  Fisios.find(function(err, f) {
    if (err){
      res.send(err);
      tfgConsole.error("[ERROR] Get Fisios: ", err);
    }
    res.json(f);
    tfgConsole.info("[OK] Get Fisios: ", f);
  });
});

//Get a fisio by id
router.get('/:id', function(req, res) {
  Fisios.findById(req.params.id, function(err, f) {
    if (err){
      res.send(err);
      tfgConsole.error("[ERROR] Get Fisio by id: ", err);
    }
    res.json(f);
    tfgConsole.info("[OK] Get Fisio by id: ", f);
  });
});

//Post one fisio
router.post('/', function(req, res) {
  var f = new Fisios();
  f.username = req.param('username');
  f.firstName = req.param('firstName');
  f.lastName = req.param('lastName');
  f.age = req.param('age');
  f.city = req.param('city');
  f.stars.unshift(req.param('stars')); 


  f.save(function(err) {
    if (err)
      res.send(err);

    res.json({message: 'Fisio created!'});
  });
});

//Update a single fisio
router.put('/:id', function(req, res) {
  Fisios.findById(req.params.id, function(err, f) {

    if (err)
      res.send(err);

    f.username = req.param('username');
    f.firstName = req.param('firstName');
    f.lastName = req.param('lastName');
    f.age = req.param('age');
    f.city = req.param('city');
    f.stars.unshift(req.param('stars')); 

    f.save(function(err) {
      if (err)
        res.send(err);

      res.json({message: 'Fisio updated!'});
    });

  });
});

//Delete a single fisio
router.delete('/:id', function(req, res) {
  Fisios.remove({
    _id: req.params.id
  }, function(err, lc) {
    if (err)
      res.send(err);

    res.json({message: 'Successfully deleted'});
  });
});

module.exports = router;

