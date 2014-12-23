// server.js

//Requirements
var application_root = __dirname;

var mongoose   = require('mongoose');

var Users     = require('./app/models/user');
var Fisios     = require('./app/models/fisioterapeutas');
var Login    = require('./app/models/login');

// call the packages we need
var express = require('express');// call express
var path = require("path");
var app = express(); // define our app using express

var bodyParser = require('body-parser');

//Database Connection
mongoose.connect('mongodb://localhost:27017/physiappDb'); 

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

 // Enables CORS
var enableCORS = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
 
    // intercept OPTIONS method
    if ('OPTIONS' == req.method) {
      res.send(200);
    }
    else {
      next();
    }
};
 
// enable CORS!
app.use(enableCORS);




/*****************************Inicio borrar*****************************************/

var passport = require('passport'),BearerStrategy = require('passport-http-bearer').Strategy;



/*Passport login*/
passport.use(new BearerStrategy(
  function(token, done) {
  	console.log("Passport Use");
    token.findOne({ token: token }, function (err, user) {
      if (err) { 
      	console.log("He entrado en passport use y hay un error");
      	return done(err); 
      }
      if (!user) { 
      	console.log("He entrado en passport use, y hay un error con el usuario");
      	return done(null, false); 
      }
      console.log("He entrado en passport use y todo va bien, sin lógica de usuario");
      return done(null, user, { scope: 'read' });
    });
  }
));


/*passport.use(new LocalStrategy(
	  function(username, password, done) {

	  	passport.serializeUser(function(username, done) {
		  done(null, username);
		});

		console.log("Hurraaa, estoy dentro del passport use");
	  	console.log("El usuario introducido es: " , username);
	  	console.log("El password introducido es: " , password);

		Login.findOne({ username: username }, function (err, user) {
		      if (err) { 
		      	return done(err); 
		      }
		      else if(user){
		      	return done(null, user);
		      }
		      else{
		      	return done(null, false, { message: 'Incorrect username or password.' });
		      }
    	});
		
		return done(null, username);

	  }
));*/




passport.deserializeUser(function(username, done) {
  done(null,{username: username});
});

//Passport initialization
app.use(passport.initialize());  
app.use(passport.session());  

/*****************************Fin borrar*****************************************/




app.get('/api', function (req, res) {
  res.send('REST API is running');
});

/***Users CRUD Operations***/

//Get user list
app.get('/api/users',function (req, res) {
	Users.find(function(err, u) {
			if (err)
				res.send(err);

			res.json(u);
		});
});

//Get an user by id
app.get('/api/users/:id', function (req, res) {
	Users.findById(req.params.id, function(err, u) {
			if (err)
				res.send(err);
			res.json(u);
		});
});

//Post one user
app.post('/api/users', function (req, res) {
	var u = new Users(); 
		u.username = req.body.username;  
		u.age = req.body.age;

		
		u.save(function(err) {
			if (err)
				res.send(err);

			res.json({ message: 'User created!' });
		});
});

//Update a single user
app.put('/api/users/:id', function (req, res){
		Users.findById(req.params.id, function(err, u) {

			if (err)
				res.send(err);

			u.username = req.body.username; 	
			u.age = req.body.age;

			u.save(function(err) {
				if (err)
					res.send(err);

				res.json({ message: 'User updated!' });
			});

		});
});

//Delete a single user
app.delete('/api/users/:id',function(req, res){
	Users.remove({
			_id: req.params.id
		}, function(err, lc) {
			if (err)
				res.send(err);

			res.json({ message: 'Successfully deleted' });
		});
});




/***Fisios CRUD Operations***/

//Get fisios list
app.get('/api/fisios',function (req, res) {
	Fisios.find(function(err, f) {
			if (err)
				res.send(err);

			res.json(f);
		});
});

//Get a fisio by id
app.get('/api/fisios/:id', function (req, res) {
	Fisios.findById(req.params.id, function(err, f) {
			if (err)
				res.send(err);
			res.json(f);
		});
});

//Post one fisio
app.post('/api/fisios', function (req, res) {
	var f = new Fisios(); 
		f.username = req.body.username;  
		f.firstName = req.body.firstName; 
		f.lastName = req.body.lastName; 
		f.age = req.body.age;
		f.city = req.body.city; 

		
		f.save(function(err) {
			if (err)
				res.send(err);

			res.json({ message: 'Fisio created!' });
		});
});

//Update a single fisio
app.put('/api/fisios/:id', function (req, res){
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

				res.json({ message: 'Fisio updated!' });
			});

		});
});

//Delete a single fisio
app.delete('/api/fisios/:id',function(req, res){
	Fisios.remove({
			_id: req.params.id
		}, function(err, lc) {
			if (err)
				res.send(err);

			res.json({ message: 'Successfully deleted' });
		});
});





/***Login CRUD Operations***/
//Check users credentials
app.post('/login',
  passport.authenticate('bearer', { session: false }),
  function(req, res) {
    console.log("Usuario autorizado para entrar en la aplicacion");
    res.redirect('http://localhost:8100');
});

//Get user credentials
app.get('/login', function (req, res) {
	Login.find(function(err, l) {
			if (err)
				res.send(err);

			res.json(l);
		});
});

//Post one user
/*app.post('/api/login', function (req, res) {
	var u = new Login(); 
		u.username = req.body.username;  
		u.password = req.body.password;

		
		u.save(function(err) {
			if (err)
				res.send(err);

			res.json({ message: 'User created!' });
		});
});*/


var port = process.env.PORT || 8080; // set our port



// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);
