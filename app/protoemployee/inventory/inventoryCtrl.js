// public/src/js/controllers/controller.js

angular.module('InvntryCtrl', []).controller('TopCtrl', ['$scope', '$http', function($scope, $http) {

console.log("inventory controller");
var validation = document.createElement('script');
validation.src = 'protoemployee/inventory/dataValidation.js';
document.head.appendChild(validation);

  var refresh = function() {
    $http.get('/inventory').success(function(response) {
      console.log("Inventory refreshed.");
      $scope.inventory = response;
      $scope.vehicle = "";
    });
  };

  var loadUsers = function() {
      $http.get('/users').success(function(response) {
      console.log("Employees refreshed.");
      $scope.users = response;
      $scope.user = "";
    });
  };

  refresh();
  loadUsers();

  $scope.addVehicle = function() {
    console.log($scope.vehicle);
    $scope.validateInputData();
    if( $scope.valid === true ) {
      $http.post('/inventory', $scope.vehicle).success(function(response) {
        console.log(response);
        refresh();
      });
    };
  };

  $scope.remove = function(id) {
    console.log(id);
    $http.delete('/inventory/' + id).success(function(response) {
      refresh();
    });
  };

  $scope.edit = function(id) {
    console.log(id);
    $http.get('/inventory/' + id).success(function(response) {
      $scope.vehicle = response;
    });
  };  

  $scope.update = function() {
    console.log($scope.vehicle._id);
    $scope.validateInputData();
    if( $scope.valid === true ) {
      $http.put('/inventory/' + $scope.vehicle._id, $scope.vehicle).success(function(response) {
        refresh();
      });
    };
  };

  $scope.deselect = function() {
    $scope.vehicle = "";
  };

  // USER FUNCTIONS - moved to employeesCtrl.js
/*
  $scope.makeEmployee = function(id) {
    console.log("Switching customer to employee.");
    $http.get('/users/' + id).success(function(response) {
      $scope.user = response;
      $scope.user.usertype = 'employee';
      $http.put('/users/' + $scope.user._id, $scope.user).success(function(response) {
        loadUsers();
      });
    });
  };

  $scope.makeCustomer = function(id) {
    console.log("Switching employee to customer.");
    $http.get('/users/' + id).success(function(response) {
      $scope.user = response;
      $scope.user.usertype = 'customer';
      $http.put('/users/' + $scope.user._id, $scope.user).success(function(response) {
        loadUsers();
      });
    });
  };
*/
  // END USER FUNCTIONS
  
  $scope.validateInputData = function(){
    console.log("Validating input data");
    $scope.valid = true;
    if (!validateStringNumbersAndSpaces($scope.vehicle.make, 2, 20, "make")){ $scope.valid = false; }
    if (!validateStringNumbersAndSpaces($scope.vehicle.model, 2, 20, "model")){ $scope.valid = false; }
    if (!validateNumber($scope.vehicle.miles, 1, 9, "miles")){ $scope.valid = false; }
    if (!validateNumber($scope.vehicle.year, 4, 4, "year")){ $scope.valid = false; }
    if (!validateString($scope.vehicle.color, 2, 20, "color")){ $scope.valid = false; }
    if (!validateNumber($scope.vehicle.price, 1, 9, "price")){ $scope.valid = false; }
    if (!validateNumber($scope.vehicle.cost, 1, 9, "cost")){ $scope.valid = false; }
  };

}]);