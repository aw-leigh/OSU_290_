/* Setup stuff */

var express = require('express');
var app = express();
app.use('/', express.static('public'));

var mysql = require('./dbcon.js');
app.set('mysql', mysql);

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


var handlebars = require('express-handlebars').create({defaultLayout:'main'});
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

app.set('port', process.argv[2]);


/* Actual code */


app.get('/',function(req,res,next){
  let tableContent = {};
  let query = `SELECT id, name, weight, reps, unit, 
                DATE_FORMAT(exercise.day, '%Y-%m-%d') AS day FROM exercise`;
  mysql.pool.query(query, function(err, rows){
    if(err){
      next(err);
      return;
    }
    tableContent.results = rows;
    console.log(tableContent.results);
    res.render('home', tableContent);
  });
});

app.post('/',function(req, res, next){
  //console.log(req.body);
  let response = {};

  //*************
  // ADD TO TABLE
  //*************
  if(req.body.action == 'add'){

    //Try to add to DB
    let query = `INSERT INTO exercise (name, day, reps, weight, unit) VALUES (?,?,?,?,?);`;
    let inserts = [req.body.name, req.body.date, req.body.reps, req.body.weight, req.body.unit];
    mysql.pool.query(query, inserts, function(err, results){
      if(err){
        next(err);
        return;
      }
      console.log(results.insertId);
      response.insertedID = results.insertId;

      //If successful, send reply as tell page to add row
      res.status(200).send(response);
    })
  }

  //******************
  // DELETE FROM TABLE
  //******************

  else if(req.body.action == 'delete'){

    let query = `DELETE FROM exercise WHERE id=?`;   
    mysql.pool.query(query, [req.body.id], function(err, result){
      if(err){
        next(err);
        return;
      }
      console.log(result.changedRows);
      response.deleted = result.changedRows;
      res.status(200).send(response);
    })
  }

  //**********
  // EDIT ITEM
  //**********

  else{
    console.log("Edit");    
    console.log(req.body);  

    let response = {};
  
    //look for the ID in DB
    let query = "SELECT * FROM exercise WHERE id=?";
    mysql.pool.query(query, [req.body.id], function(err, result){
      if(err){
        next(err);
        return;
      }
      //if you find it, edit it
      if(result.length == 1){
        var currentValues = result[0];
        query = "UPDATE exercise SET name=?, reps=?, weight=?, day=?, unit=? WHERE id=?";
        let inserts = [req.body.name  || currentValues.name,
                      req.body.reps   || currentValues.reps,
                      req.body.weight || currentValues.weight,                      
                      req.body.date   || currentValues.date,
                      req.body.unit   || currentValues.unit,
                      req.body.id];
        console.log(inserts);
        mysql.pool.query(query, inserts, function(err, result){
          if(err){
            next(err);
            return;            
          }
          //If successful, send inserts back so frontend can update
          response.results = inserts;
          res.status(200).send(response);
        });
      }
    });
  }
}); //I believe I'm bordering on callback hell?

app.use(function(req,res){
  res.status(404);
  res.render('404', {layout: 'error.handlebars'});
});

app.use(function(err, req, res, next){
  console.error(err.stack);
  res.type('plain/text');
  res.status(500);
  res.render('500', {layout: 'error.handlebars'});
});

app.listen(app.get('port'), function(){
  console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});