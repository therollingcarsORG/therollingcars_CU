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
var validateInputs = require('public/src/js/tools/dataValidationBackend.js');

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());

app.get('/', function(req, res) {
    res.sendfile('./public/views/inventory.html');
});

app.get('/view2', function(req, res) {
    res.sendfile('./public/views/view2.html');
});

/* Inventory Section */
app.get('/inventory', function (req, res) {
  console.log('I received an inventory GET request');
  db.inventory.find(function (err, docs) {
    res.json(docs);
  });
});

app.post('/inventory', function (req, res) {
  console.log(req.body);
	if ( validateInventoryInputData(req) ){
	  db.inventory.insert(req.body, function(err, doc) {
    	res.json(doc);
  	});
	} else {
		console.log('Data validation failed!!!');
	}
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
	if ( validateInventoryInputData(req) ){
	  db.inventory.findAndModify({
    	query: {_id: mongojs.ObjectId(id)},
    	update: {$set: {make: req.body.make, model: req.body.model, miles: req.body.miles, year: req.body.year, color: req.body.color, price: req.body.price, cost: req.body.cost}},
    	new: true}, function (err, doc) { res.json(doc); }
  	);
	} else {
		console.log('Data validation failed!!!');
	};
});

var validateInventoryInputData = function(req){
	console.log("Backend validation of the inventory input data");
	if (!validateInputs.nodeValidateString(req.body.make, 2, 20, "make")){ return false; }
	if (!validateInputs.nodeValidateString(req.body.model, 2, 20, "model")){ return false; }
	if (!validateInputs.nodeValidateNumber(req.body.miles, 1, 9, "miles")){ return false; }
	if (!validateInputs.nodeValidateNumber(req.body.year, 4, 4, "year")){ return false; }
	if (!validateInputs.nodeValidateString(req.body.color, 2, 20, "color")){ return false; }
	if (!validateInputs.nodeValidateNumber(req.body.price, 1, 9, "price")){ return false; }
	if (!validateInputs.nodeValidateNumber(req.body.cost, 1, 9, "cost")){ return false; }
	return true;
};
/* End Inventory Section */

/* Employees Section */
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
	if ( validateEmployeesInputData(req) ){
		db.employees.insert(req.body, function(err, doc) {
      console.log("inserting an employee");
      res.json(doc);
    });
	} else {
		console.log('Data validation failed!!!');
	};
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
	if ( validateEmployeesInputData(req) ){
		db.employees.findAndModify({
      query: {_id: mongojs.ObjectId(id)},
      update: {$set: {firstName: req.body.firstName, lastName: req.body.lastName, employeeNumber: req.body.employeeNumber, phoneNumber: req.body.phoneNumber, emailAddress: req.body.emailAddress}},
      new: true}, function (err, doc) { res.json(doc); }
    );
	} else {
		console.log('Data validation failed!!!');
	};
});

var validateEmployeesInputData = function(req){
	console.log("Backend validation of the employees input data");
	if (!validateInputs.nodeValidateString(req.body.firstName, 2, 20, "first name")){ return false; }
	if (!validateInputs.nodeValidateString(req.body.lastName, 2, 20, "last name")){ return false; }
	if (!validateInputs.nodeValidateNumber(req.body.employeeNumber, 1, 6, "employee number")){ return false; }
	// add check if we have another employee with the same number
	if (!validateInputs.nodeValidatePhoneNumber(req.body.phoneNumber)){ return false; }
	if (!validateInputs.nodeValidateEmailAddress(req.body.emailAddress)){ return false; }
	return true;
};
/* End Employees Section */

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