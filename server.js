// MEAN Stack RESTful API - Rolling Cars App
require('rootpath')();
var express = require('express');
var session = require('express-session');
var app = express();
var mongojs = require('mongojs');
var db = mongojs('inventory', ['inventory','users','employees','contactlist']);
var bodyParser = require('body-parser');
var expressJwt = require('express-jwt');
var config = require('config.json');

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

app.get('/login1', function (req, res) {
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











// !!!!!! Do not Modify Please !!!!!!
// Combo experiment

  // opener page
  /*
  app.get('/prodTest', function(req, res) {
      res.sendfile('./public/comboProd/partials.html');
  });
  */

  // Comm with DB


      app.get('/contactlist', function (req, res) {
        console.log('I received a GET request');

        db.contactlist.find(function (err, docs) {
          console.log(docs);
          res.json(docs);
        });
      });

      app.post('/contactlist', function (req, res) {
        console.log(req.body);
        db.contactlist.insert(req.body, function(err, doc) {
          res.json(doc);
        });
      });

      app.delete('/contactlist/:id', function (req, res) {
        var id = req.params.id;
        console.log(id);
        db.contactlist.remove({_id: mongojs.ObjectId(id)}, function (err, doc) {
          res.json(doc);
        });
      });

      app.get('/contactlist/:id', function (req, res) {
        var id = req.params.id;
        console.log(id);
        db.contactlist.findOne({_id: mongojs.ObjectId(id)}, function (err, doc) {
          res.json(doc);
        });
      });

      app.put('/contactlist/:id', function (req, res) {
        var id = req.params.id;
        console.log(req.body.name);
        db.contactlist.findAndModify({
          query: {_id: mongojs.ObjectId(id)},
          update: {$set: {name: req.body.name, email: req.body.email, number: req.body.number}},
          new: true}, function (err, doc) {
            res.json(doc);
          }
        );
      });

  // Auth

    app.set('view engine', 'ejs');
    app.set('views', __dirname + '/auth/views');
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());
    app.use(session({ secret: config.secret, resave: false, saveUninitialized: true }));

    // use JWT auth to secure the api
    app.use('/api', expressJwt({ secret: config.secret }).unless({ path: ['/api/users/authenticate', '/api/users/register'] }));

    // routes
    app.use('/login', require('./auth/controllers/login.controller'));
    app.use('/register', require('./auth/controllers/register.controller'));
    app.use('/publicAuth', require('./auth/controllers/app.controller'));
    app.use('/api/users', require('./auth/controllers/api/users.controller'));

    // make '/app' default route
    
    /*
    app.get('/prodLevel', function (req, res) {
        return res.redirect('/app');
    });
    */
    

// End Combo experiment
// END !!!!!! Do not Modify Please !!!!!!








var server = app.listen(3000, function () {
  var port = server.address().port;
  console.log('App listening at port %s', port);
});

module.exports = server;

//app.listen(3000);

console.log("Server running on port 3000");