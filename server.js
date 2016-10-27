// MEAN Stack RESTful API - Rolling Cars App

var express = require('express');
var app = express();
var mongojs = require('mongojs');
var db = mongojs('inventory', ['inventory']);
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
  console.log(res);
  db.inventory.find(function (err, docs) {
    console.log(err);
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
  console.log(req.body.name);
  db.inventory.findAndModify({
    query: {_id: mongojs.ObjectId(id)},
    update: {$set: {name: req.body.name, email: req.body.email, number: req.body.number}},
    new: true}, function (err, doc) {
      res.json(doc);
    }
  );
});

var server = app.listen(3000, function () {
  var port = server.address().port;
  console.log('Example app listening at port %s', port);
});

module.exports = server;

//app.listen(3000);

console.log("Server running on port 3000");