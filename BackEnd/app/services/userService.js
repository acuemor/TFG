/***Users CRUD Operations***/
var Users = require('../../app/models/user');
//Get user list
app.get('/api/users', function(req, res) {
  Users.find(function(err, u) {
    if (err)
      res.send(err);

    res.json(u);
  });
});

//Get an user by id
app.get('/api/users/:id', function(req, res) {
  Users.findById(req.params.id, function(err, u) {
    if (err)
      res.send(err);
    res.json(u);
  });
});

//Post one user
app.post('/api/users', function(req, res) {
  var u = new Users();
  u.username = req.body.username;
  u.age = req.body.age;


  u.save(function(err) {
    if (err)
      res.send(err);

    res.json({message: 'User created!'});
  });
});

//Update a single user
app.put('/api/users/:id', function(req, res) {
  Users.findById(req.params.id, function(err, u) {

    if (err)
      res.send(err);

    u.username = req.body.username;
    u.age = req.body.age;

    u.save(function(err) {
      if (err)
        res.send(err);

      res.json({message: 'User updated!'});
    });

  });
});

//Delete a single user
app.delete('/api/users/:id', function(req, res) {
  Users.remove({
    _id: req.params.id
  }, function(err, lc) {
    if (err)
      res.send(err);

    res.json({message: 'Successfully deleted'});
  });
});