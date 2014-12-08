// server.js

// BASE SETUP
// =============================================================================

var mongoose   = require('mongoose');
mongoose.connect('mongodb://localhost:27017/physiappDb'); // connect to our database
var LoginCredentials     = require('./app/models/loginCredentials');
var Login    = require('./app/models/login');

// call the packages we need
var express    = require('express'); 		// call express
var app        = express(); 				// define our app using express
var bodyParser = require('body-parser');

var passport = require('./auth');

//Inicio borrar
var passport = require('passport'),LocalStrategy = require('passport-local').Strategy;


// // Enables CORS
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

//Passport initialization
app.use(passport.initialize());  
app.use(passport.session());  

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//app.use(express.cookieParser());


var port = process.env.PORT || 8080; 		// set our port

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router(); 				// get an instance of the express Router

// middleware to use for all requests
router.use(function(req, res, next) {
	// do logging
	console.log('Something is happening.');
	next(); // make sure we go to the next routes and don't stop here
});

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
	res.json({ message: 'hooray! welcome to our api!' });	
});

// more routes for our API will happen here

//Añadimos las rutas (operaciones CRUD)

// on routes that end in /bears
// ----------------------------------------------------
router.route('/loginCredentials')

	// create a bear (accessed at POST http://localhost:8080/api/bears)
	.post(function(req, res) {
		
		var lc = new LoginCredentials(); 		// create a new instance of the Bear model
		lc.username = req.body.username;  // set the bears name (comes from the request, is the string field in model)
		lc.pass = req.body.pass;

		// save the bear and check for errors
		lc.save(function(err) {
			if (err)
				res.send(err);

			res.json({ message: 'User credentials created!' });
		});
		
	})

	// get all the bears (accessed at GET http://localhost:8080/api/bears)
	.get(function(req, res) {
		LoginCredentials.find(function(err, lcs) {
			if (err)
				res.send(err);

			res.json(lcs);
		});
	});

	// on routes that end in /bears/:bear_id
// ----------------------------------------------------
router.route('/loginCredentials/:loginCredentials_id')

	// get the user login credentials with that id (accessed at GET http://localhost:8080/api/loginCredentials/:loginCredentials_id). Por ej: http://localhost:8080/api/loginCredentials/547b312e1537d34c05000001
	.get(function(req, res) {
		LoginCredentials.findById(req.params.loginCredentials_id, function(err, lc) {
			if (err)
				res.send(err);
			res.json(lc);
		});
	})

	// update the bear with this id (accessed at PUT http://localhost:8080/api/bears/:bear_id)
	.put(function(req, res) {

		// use our bear model to find the bear we want
		LoginCredentials.findById(req.params.loginCredentials_id, function(err, lc) {

			if (err)
				res.send(err);

			lc.username = req.body.username; 	// update the bears info
			lc.pass = req.body.pass;

			// save the bear
			lc.save(function(err) {
				if (err)
					res.send(err);

				res.json({ message: 'User credentials updated!' });
			});

		});
	})

	// delete the bear with this id (accessed at DELETE http://localhost:8080/api/bears/:bear_id)
	.delete(function(req, res) {
		LoginCredentials.remove({
			_id: req.params.loginCredentials_id
		}, function(err, lc) {
			if (err)
				res.send(err);

			res.json({ message: 'Successfully deleted' });
		});
	});


/*Handle the login request with authenticate method*/
/*app.post('/login',
  passport.authenticate('local', { successRedirect: 'http://localhost:8100/#/app/loginCredentials',
                                   failureRedirect: 'http://localhost:8100/#/app/login',
                                   failureFlash: true })
);*/

app.post('/login',
  passport.authenticate('local'),
  function(req, res) {
    console.log("Llego aqui y todo va bien");
    res.redirect('http://localhost:8100/#/app/loginCredentials');
  });


/*router.route('/login')

	// create a bear (accessed at POST http://localhost:8080/api/bears)
	.post(function(req, res) {

		var login = new Login(); 		// create a new instance of the Login model
		login.username = req.body.username;  // set the bears name (comes from the request, is the string field in model)
		login.password = req.body.password;

		console.log("Llego aqui");
		console.log(login);
		passport.authenticate('local', { successRedirect: 'http://localhost:8100/#/app/loginCredentials',
                                   failureRedirect: 'http://localhost:8100/#/app/login',
                                   failureFlash: true })
	});*/




// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);


// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);
