var express = require("express");
var bodyParser = require("body-parser");
var path = require('path');
var favicon = require('serve-favicon');
var cookieParser = require('cookie-parser');
var router_app = require("./router_app");
var cors = require("cors");

var methodOverride = require("method-override");

var app = express();

// Middleware para servir archivos estaticos en las carpetas public
// a travez de la ruta /public
app.use("/public", express.static('public'));
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(bodyParser.json()); // para peticiones application/json
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());

app.set('port', (process.env.PORT || 8084));

app.use(methodOverride("_method"));

//Definicion de motor de vistas a usar
app.set('views', path.join(__dirname, 'views'));
app.set("view engine", "jade");

//Accion a realizar segun la ruta ingresada en el navegador
app.get("/",function(req, res){
	res.render("index");
});

app.use("/",router_app);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status( err.code || 500 )
    .json({
      status: 'error',
      message: err
    });
  });
}

// use it before all route definitions
app.use(cors());
app.listen(app.get('port'));