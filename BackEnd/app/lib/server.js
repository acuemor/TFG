var express = require('express');
var path = require("path");
var bodyParser = require('body-parser');
var tfgConsole = require('./utils/tfgConsole');
var Users = require('../../app/models/user');


var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var moment = require('moment');
var bearer = require('bearer');




function setup(cfg) {
  var app = express();
  require('./middleware/CORSMiddleware')(app);
  // configure app to use bodyParser()
// this will let us get the data from a POST
  app.use(bodyParser.urlencoded({extended: true}));
  app.use(bodyParser.json());


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hjs');

app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

var accessAPP = false;
var userDB = '';
var passDB = '';

//User and password from BD        
Users.findOne({ 'username': 'cbarranco' }, function (err, person) {
  if (err) return handleError(err);
  userDB = person.username;
  passDB = person.pass;
  console.log('Usuario %s : Pass %s', person.username, person.pass);
  tfgConsole.error("[Database] Username: ", person.username);
  tfgConsole.error("[Database] Password: ", person.pass);          
})   


//Setup authentication
//This should be done before all routes are configured to assure that authorization will be first to execute
bearer({
    //Make sure to pass in the app (express) object so we can set routes
    app:app,
    //Please change server key for your own safety!
    serverKey:"12345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678",
    tokenUrl:'/token', //Call this URL to get your token. Accepts only POST method
    extendTokenUrl:'/extendtoken', //Call this URL to get your token. Accepts only POST method
    createToken:function(req, next, cancel){
        //If your user is not valid just return "underfined" from this method.
        //Your token will be added to req object and you can use it from any method later

        //User and password from request
        var username=req.param('username');
        var password=req.param('password');
        

        tfgConsole.error("[Login] Username: ", username);
        tfgConsole.error("[Login] Password: ", password);

        if(username.toString() == userDB.toString() && password.toString() == passDB.toString()){
              accessAPP = true;
        }
        else{
            accessAPP = false;
        }

        tfgConsole.error("[accessAPP] Boolean check: ", accessAPP);
        

        //You get the idea how to use next and cancel callbacks, right?        
        if (accessAPP){
            next({
                expire: moment(Date.now()).add('days', 1).format('YYYY-MM-DD HH:mm:ss'),
                username: username,
                contentType: req.get('Content-Type'),
                ip: req.ip,
                userAgent: req.header('user-agent'),
                custom_id: '55555',
                another: 'Some data you need in your token',
                moreData: 'Some more data you need'
            });
        }else{
            cancel();
        }
    },
    extendToken:function(req, next, cancel){
        var token=req.authToken;
        if (token){
            next({
                expire: moment(Date.now()).add('days', 1).format('YYYY-MM-DD HH:mm:ss'),
                username: token.username,
                contentType: req.get('Content-Type'),
                ip: req.ip,
                userAgent: req.header('user-agent'),
                custom_id: '55555',
                another: 'Some data you need in your token',
                moreData: 'Some more data you need'
            });
        }else{
            cancel();
        }
    },
    validateToken:function(req, token){
        //you could also check if request came from same IP using req.ip==token.ip for example
        if (token){
            return moment(token.expire)>moment(new Date());
        }
        return false;
    },
    onTokenValid:function(token, next, cancel){
        //This is in case you would like to check user account status in DB each time he attempts to do something.
        //Doing this will affect your performance but its your choice if you really need it
        //Returning false from this method will reject user even if his token is OK
        var username=token.username;
        if (true){
            next()
        }else{
            cancel();
        }
    },
    userInRole:function(token, roles, next, cancel){
        //Provide role level access restrictions on url
        //You can use onTokenValid for this also, but I find this easier to read later
        //If you specified "roles" property for any secureRoute below, you must implement this method
        var username=token.username;

        if (true){
            next();
        }else
        {
            cancel();
        }
    },
    onAuthorized: function(req, token){
        //console.log("this will be executed if request is OK");
    },
    onUnauthorized: function(req, token){
        //console.log(req.path, "this will be executed if request fails authentication");
    },
    secureRoutes:[
        {url:'/secure', method:'get'},
        {url:'/secure', method:'post', roles:["admin"]},
        {url:'/secure/*', method:'get'}, //any action under /secure route but NOT default "/secure" route
        //{url:'/api/*', method:'get'},
        {url:'/api/**', method:'get'},
        {url:'/api/**', method:'delete'},
        {url:'/api/**', method:'post'},
        {url:'/api/**', method:'put'}

    ]
});

//Setup routing
require('../../routes/route-config')(app);
var http = require('http');





// Load middlewares
  
// enable CORS!
  var port = process.env.PORT || cfg.port; // set our port
  app.listen(port);
  tfgConsole.info("[OK] Server running on port: ", port);
  return app;
}

exports = module.exports = setup;