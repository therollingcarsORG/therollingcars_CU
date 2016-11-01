// MEAN Stack RESTful API - Rolling Cars App

var express = require('express');
var app = express();
var mongojs = require('mongojs');
var db = mongojs('inventory', ['inventory','users','employees']);
var bodyParser = require('body-parser');

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());

app.get('/', function(req, res) {
    res.sendfile('./public/views/inventory.html');
});

app.get('/view2', function(req, res) {
    res.sendfile('./public/views/view2.html');
});

app.get('/inventory', function (req, res) {
  console.log('I received an inventory GET request');
  db.inventory.find(function (err, docs) {
    res.json(docs);
  });
});

app.post('/inventory', function (req, res) {
  console.log(req.body);
  db.inventory.insert(req.body, function(err, doc) {
    console.log("helllooooo");
    res.json(doc);
  });
});

app.delete('/inventory/:id', function (req, res) {
  var id = req.params.id;
  console.log(id);
  db.inventory.remove({_id: mongojs.ObjectId(id)}, function (err, doc) {
    res.json(doc);
  });
});

app.get('/inventory/:id', function (req, res) {
  var id = req.params.id;
  console.log(id);
  db.inventory.findOne({_id: mongojs.ObjectId(id)}, function (err, doc) {
    res.json(doc);
  });
});

app.put('/inventory/:id', function (req, res) {
  var id = req.params.id;
  console.log(req.body.make + " " + req.body.model);
  db.inventory.findAndModify({
    query: {_id: mongojs.ObjectId(id)},
    update: {$set: {make: req.body.make, model: req.body.model, miles: req.body.miles, year: req.body.year, color: req.body.color, price: req.body.price, cost: req.body.cost}},
    new: true}, function (err, doc) {
      res.json(doc);
    }
  );
});

/* Employees section */
//todo: we need to understand how to launch the sections calling just employees
app.get('/goemployees', function (req, res) {
  console.log('I received a employees page GET request');
  //res.sendfile('./public/views/employees.html');//this is deprecated from 4.8
  res.sendFile(__dirname + '/public/views/employees.html');
});

app.get('/employees', function (req, res) {
  console.log('I received an employees GET request');
  db.employees.find(function (err, docs) {
    res.json(docs);
  });
});

app.post('/employees', function (req, res) {
  console.log(req.body);
  db.employees.insert(req.body, function(err, doc) {
    console.log("inserting an employee");
    res.json(doc);
  });
});

app.delete('/employees/:id', function (req, res) {
  var id = req.params.id;
  console.log(id);
  db.employees.remove({_id: mongojs.ObjectId(id)}, function (err, doc) {
    res.json(doc);
  });
});

app.get('/employees/:id', function (req, res) {
  var id = req.params.id;
  console.log(id);
  db.employees.findOne({_id: mongojs.ObjectId(id)}, function (err, doc) {
    res.json(doc);
  });
});

app.put('/employees/:id', function (req, res) {
  var id = req.params.id;
  console.log(req.body.firstName + " " + req.body.lastName);
  db.employees.findAndModify({
    query: {_id: mongojs.ObjectId(id)},
    update: {$set: {firstName: req.body.firstName, lastName: req.body.lastName, employeeNumber: req.body.employeeNumber, phoneNumber: req.body.phoneNumber, emailAddress: req.body.emailAddress}},
    new: true}, function (err, doc) {
      res.json(doc);
    }
  );
});
/* End Employees section */

app.get('/login', function (req, res) {
  console.log('I received a login page GET request');
  res.sendfile('./public/views/login.html');
});

app.get('/signup', function (req, res) {
  console.log('I received a signup page GET request');
  res.sendfile('./public/views/signup.html');
});

app.post('/users', function (req, res) {
  console.log('I received a users POST request');
  console.log(req.body);
  db.users.insert(req.body, function(err, doc) {
    res.json(doc);
  });
});

app.get('/users', function (req, res) {
  console.log('I received a users GET request');
  db.users.find(function (err, docs) {
    res.json(docs);
  });
});

app.delete('/users/:id', function (req, res) {
  var id = req.params.id;
  console.log('I received a users DELETE request');
  db.users.remove({_id: mongojs.ObjectId(id)}, function (err, doc) {
    res.json(doc);
  });
});


// Partial Experiment
// Basically hijacking home dir, this isn't good practice only temporary
// will clean up routers with correct urls

app.get('/partials', function(req, res) {
    res.sendfile('./public/views/partials/partials.html');
});

app.get('/partial-home.html', function(req, res) {
    res.sendfile('./public/views/partials/partial-home.html');
});

app.get('/partial-home-list.html', function(req, res) {
    res.sendfile('./public/views/partials/partial-home-list.html');
});

app.get('/partial-about.html', function(req, res) {
    res.sendfile('./public/views/partials/partial-about.html');
});

app.get('/table-data.html', function(req, res) {
    res.sendfile('./public/views/partials/table-data.html');
});

// End Partial Experiment



// Angular Tutorial Experiment

app.get('/angularTest', function(req, res) {
    res.sendfile('./public/views/protolist/index.html');
});

// End Angular Tutorial Experiment


var server = app.listen(3000, function () {
  var port = server.address().port;
  console.log('App listening at port %s', port);
});

module.exports = server;

//app.listen(3000);

console.log("Server running on port 3000");