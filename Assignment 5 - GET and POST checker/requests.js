var express = require('express');

var app = express();
var handlebars = require('express-handlebars').create({defaultLayout:'main'});
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', 53559);

app.get('/',function(req,res){
  res.render('home');
});

app.get('/form',function(req,res){
  let parameters = [];
  for (let p in req.query){
    parameters.push({'name':p,'value':req.query[p]})
  }
  let context = {};
  context.objects = parameters;
  res.render('get-request', context);
});

app.post('/form', function(req,res){
  let parameters = [];
  let context = {};

  for (var p in req.body){
    parameters.push({'name':p,'value':req.body[p]})
  }
  context.objects = parameters;

  let URLparameters = [];
  for (let p in req.query){
    URLparameters.push({'name':p,'value':req.query[p]})
  }
  context.URLobjects = URLparameters;

  res.render('post-request', context);
});

app.use(function(req,res){
  res.status(404);
  res.render('404');
});

app.use(function(err, req, res, next){
  console.error(err.stack);
  res.type('plain/text');
  res.status(500);
  res.render('500');
});

app.listen(app.get('port'), function(){
  console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});
