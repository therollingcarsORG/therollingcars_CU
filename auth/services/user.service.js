var environment = process.env.NODE_ENV;
var config = (environment == 'production') ? require('prodConfig.json') : require('config.json');
var _ = require('lodash');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var Q = require('q');
var mongo = require('mongoskin');
var db = mongo.db(config.connectionString, { native_parser: true });
db.bind('users');
var validateInputs = require('public/src/js/tools/dataValidationBackend.js');

var service = {};

service.authenticate = authenticate;
service.getById = getById;
service.create = create;
service.update = update;
service.delete = _delete;

module.exports = service;

function authenticate(emailAddress, password) {
    var deferred = Q.defer();

    db.users.findOne({ emailAddress: emailAddress }, function (err, user) {
        if (err) deferred.reject(err);

        if (validateAuthenticationInputData(emailAddress, password) && user && bcrypt.compareSync(password, user.hash)) {
            // authentication successful
            deferred.resolve(jwt.sign({ sub: user._id }, config.secret));
        } else {
            // authentication failed
            deferred.resolve();
        }
    });

    return deferred.promise;
}

function getById(_id) {
    var deferred = Q.defer();

    db.users.findById(_id, function (err, user) {
        if (err) deferred.reject(err);

        if (user) {
            // return user (without hashed password)
            deferred.resolve(_.omit(user, 'hash'));
        } else {
            // user not found
            deferred.resolve();
        }
    });

    return deferred.promise;
}

function create(userParam) {
    var deferred = Q.defer();
    
    // validation
    var rejectMessage = validateCreateInputData(userParam);
    if (rejectMessage !== 'success'){
        deferred.reject(rejectMessage);
    } else {
            db.users.findOne(
        { emailAddress: userParam.emailAddress },
        function (err, user) {
            if (err) {
                deferred.reject(err);
            }
            
            if (user) {
                // emailAddress already exists
                deferred.reject('emailAddress "' + userParam.emailAddress + '" is already taken');
            } else {
                createUser();
            }
        
        });
    }
     
    function createUser() {
    // set user object to userParam without the cleartext password
    var user = _.omit(userParam, 'password');

    // add hashed password to user object
    user.hash = bcrypt.hashSync(userParam.password, 10);

    // set default user type to customer
    user.usertype = 'customer';

    // set default employee number to 0
    user.employeeNumber = '0';

        db.users.insert(
        user,
        function (err, doc) {
            if (err) deferred.reject(err);
            deferred.resolve();
        });
    }
    
    return deferred.promise;
}

function update(_id, userParam) {
    var deferred = Q.defer();

    // validation
    db.users.findById(_id, function (err, user) {
        if (err) deferred.reject(err);

        if (user.emailAddress !== userParam.emailAddress) {
            // emailAddress has changed so check if the new emailAddress is already taken
            db.users.findOne(
                { emailAddress: userParam.emailAddress },
                function (err, user) {
                    if (err) deferred.reject(err);

                    if (user) {
                        // emailAddress already exists
                        deferred.reject('emailAddress "' + req.body.emailAddress + '" is already taken');
                    } else {
                        updateUser();
                    }
                });
        } else {
            updateUser();
        }
    });
    
    

    function updateUser() {
        // fields to update
        var set = {
            firstName: userParam.firstName,
            lastName: userParam.lastName,
            phoneNumber: userParam.phoneNumber,
            employeeNumber: userParam.employeeNumber,
            emailAddress: userParam.emailAddress
        };

        // update password if it was entered
        if (userParam.password) {
            set.hash = bcrypt.hashSync(userParam.password, 10);
        }

        db.users.update(
            { _id: mongo.helper.toObjectID(_id) },
            { $set: set },
            function (err, doc) {
                if (err) deferred.reject(err);

                deferred.resolve();
            });
    }

    return deferred.promise;
}

function _delete(_id) {
    var deferred = Q.defer();

    db.users.remove(
        { _id: mongo.helper.toObjectID(_id) },
        function (err) {
            if (err) deferred.reject(err);

            deferred.resolve();
        });

    return deferred.promise;
}

// input data validation
var validateCreateInputData = function(user){
    var inputDataErrorString = 'Error: ';
    var alertMessage;
    console.log("Validation of the user input data...");
    
    alertMessage = validateInputs.nodeValidateString(user.firstName, 2, 20, "first name");
    if ( alertMessage !== 'success' ){ inputDataErrorString += alertMessage + '.     '; }
    
    alertMessage = validateInputs.nodeValidateString(user.lastName, 2, 20, "last name");
    if ( alertMessage !== 'success' ){ inputDataErrorString += alertMessage + '.     '; }
    
    alertMessage = validateInputs.nodeValidatePhoneNumber(user.phoneNumber);
    if ( alertMessage !== 'success' ){ inputDataErrorString += alertMessage + '.     '; }
    
    alertMessage = validateInputs.nodeValidateEmailAddress(user.emailAddress);
    if ( alertMessage !== 'success' ){ inputDataErrorString += alertMessage + '.     '; }
    
    alertMessage = validateInputs.nodeValidatePassword(user.password, 8, 20);
    if ( alertMessage !== 'success' ){ inputDataErrorString += alertMessage + '.     '; }    

    console.log("Input data successfully validated.");
    
    if (inputDataErrorString==='Error: '){
        return 'success';
    } else {
        return (inputDataErrorString);
    }
};

var validateAuthenticationInputData = function(emailAddress, password){
    console.log("Validation of the authentication input data...");
    
    if ( validateInputs.nodeValidateEmailAddress(emailAddress) !== 'success' ){ return false; }
    if ( validateInputs.nodeValidatePassword(password, 8, 20) !== 'success' ){ return false; }    

    console.log("Input data successfully validated.");
    return true;
};