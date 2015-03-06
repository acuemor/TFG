/***Users CRUD Operations***/
var Users = require('../../app/models/user');
var tfgConsole = require('../../app/lib/utils/tfgConsole');
var express = require('express');
var router = express.Router();

//Get user list
router.get('/', function(req, res) {
  Users.find(function(err, u) {
    if (err)
      res.send(err);

    res.json(u);
  });
});

//Get an user by id
router.get('/:id', function(req, res) {
  Users.findById(req.params.id, function(err, u) {
    if (err)
      res.send(err);
    res.json(u);
  });
});

//Post one user
router.post('/', function(req, res) {
  var u = new Users();
  u.username = req.param('username');
  u.pass = req.param('pass');  

  u.save(function(err) {
    if (err){
      tfgConsole.error("[ERROR] Post user: ", err);
      res.send(err);
    }      
    tfgConsole.info("[OK] Post user: ", u);
    res.json({message: 'User created!'});
  });
});

//Update a single user
router.put('/:id', function(req, res) {
  Users.findById(req.params.id, function(err, u) {

    if (err)
      res.send(err);

    u.username = req.param('username');
    u.pass = req.param('pass');

    u.save(function(err) {
      if (err)
        res.send(err);

      res.json({message: 'User updated!'});
    });

  });
});

//Delete a single user
router.delete('/:id', function(req, res) {
  Users.remove({
    _id: req.params.id
  }, function(err, lc) {
    if (err)
      res.send(err);

    res.json({message: 'Successfully deleted'});
  });
});

module.exports = router;