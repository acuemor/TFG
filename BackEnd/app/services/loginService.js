/***Login CRUD Operations***/
var Login = require('../../app/models/login');
var passport = require('passport'), BearerStrategy = require('passport-http-bearer').Strategy;

/*Passport login*/
passport.use(new BearerStrategy(
        function(token, done) {
          console.log("Passport Use");
          token.findOne({token: token}, function(err, user) {
            if (err) {
              console.log("He entrado en passport use y hay un error");
              return done(err);
            }
            if (!user) {
              console.log("He entrado en passport use, y hay un error con el usuario");
              return done(null, false);
            }
            console.log("He entrado en passport use y todo va bien, sin lógica de usuario");
            return done(null, user, {scope: 'read'});
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
  done(null, {username: username});
});

//Passport initialization
app.use(passport.initialize());
app.use(passport.session());
/***Login CRUD Operations***/
//Check users credentials
app.post('/login',
        passport.authenticate('bearer', {session: false}),
function(req, res) {
  console.log("Usuario autorizado para entrar en la aplicacion");
  res.redirect('http://localhost:8100');
});

//Get user credentials
app.get('/login', function(req, res) {
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