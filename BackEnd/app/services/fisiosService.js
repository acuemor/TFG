var Fisios = require('../../app/models/fisioterapeutas');
//Get fisios list
app.get('/api/fisios', function(req, res) {
  Fisios.find(function(err, f) {
    if (err)
      res.send(err);

    res.json(f);
  });
});

//Get a fisio by id
app.get('/api/fisios/:id', function(req, res) {
  Fisios.findById(req.params.id, function(err, f) {
    if (err)
      res.send(err);
    res.json(f);
  });
});

//Post one fisio
app.post('/api/fisios', function(req, res) {
  var f = new Fisios();
  f.username = req.body.username;
  f.firstName = req.body.firstName;
  f.lastName = req.body.lastName;
  f.age = req.body.age;
  f.city = req.body.city;


  f.save(function(err) {
    if (err)
      res.send(err);

    res.json({message: 'Fisio created!'});
  });
});

//Update a single fisio
app.put('/api/fisios/:id', function(req, res) {
  Fisios.findById(req.params.id, function(err, f) {

    if (err)
      res.send(err);

    f.username = req.body.username;
    f.firstName = req.body.firstName;
    f.lastName = req.body.lastName;
    f.age = req.body.age;
    f.city = req.body.city;

    f.save(function(err) {
      if (err)
        res.send(err);

      res.json({message: 'Fisio updated!'});
    });

  });
});

//Delete a single fisio
app.delete('/api/fisios/:id', function(req, res) {
  Fisios.remove({
    _id: req.params.id
  }, function(err, lc) {
    if (err)
      res.send(err);

    res.json({message: 'Successfully deleted'});
  });
});


