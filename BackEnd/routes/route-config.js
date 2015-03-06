var homeRouter = require('../routes/home');
var secureRouter = require('../routes/secure');
var fisiosRouter = require('../app/services/fisiosService');
var userRouter = require('../app/services/userService');
var tfgConsole = require('../app/lib/utils/tfgConsole');

function routeConfig(app){
    app.use('/', homeRouter);
    app.use('/api/fisios', fisiosRouter);//Elimina esta linea y la de arriba y funciona
    app.use('/api/users', userRouter);
    app.use('/secure', secureRouter);

    /// catch 404 and forward to error handler
    app.use(function(req, res, next) {
        var err = new Error('Endpoint no encontrado. Sigue buscando...');
        //err.status = 404;
        tfgConsole.info("[ERROR] Endpoint: ", err);
        next(err);
    });

    // development error handler
    // will print stacktrace
    if (app.get('env') === 'development') {
        app.use(function(err, req, res, next) {
            res.status(err.status || 500);
            res.send({
                message: err.message,
                error: err
            });
        });
    }

    // production error handler
    // no stacktraces leaked to user
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.send({
            message: err.message,
            error: {}
        });
    });

}

module.exports=routeConfig;
