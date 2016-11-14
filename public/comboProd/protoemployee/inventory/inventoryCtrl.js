// public/src/js/controllers/controller.js

angular.module('InvntryCtrl', []).controller('TopCtrl', ['$scope', '$http', function($scope, $http) {

console.log("inventory controller");
var validation = document.createElement('script');
validation.src = '/comboProd/protoemployee/inventory/dataValidation.js';
document.head.appendChild(validation);

  var refresh = function() {
    $http.get('/inventory').success(function(response) {
      console.log("Inventory refreshed.");
      $scope.inventory = response;
      $scope.vehicle = "";
    });
  };

  refresh();

  $scope.addVehicle = function() {
    console.log($scope.vehicle);
    if( validateInputData() === true ) {
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
    if( validateInputData() === true ) {
      $http.put('/inventory/' + $scope.vehicle._id, $scope.vehicle).success(function(response) {
        refresh();
      });
    };
  };

  $scope.deselect = function() {
    $scope.vehicle = "";
  };
  
  var validateInputData = function(){
    console.log("Validating input data...");
    if (!validateString($scope.vehicle.make, 2, 20, "make")){ return false; }
    if (!validateString($scope.vehicle.model, 2, 20, "model")){ return false; }
    if (!validateNumber($scope.vehicle.year, 4, 4, "year")){ return false; }
    if (!validateString($scope.vehicle.color, 2, 20, "color")){ return false; }
    if (!validateNumber($scope.vehicle.price, 1, 9, "price")){ return false; }
    if (!validateNumber($scope.vehicle.cost, 1, 9, "cost")){ return false; }
    if (!validateNumber($scope.vehicle.miles, 1, 9, "miles")){ return false; }
    console.log("Input data successfully validated.");
    return true;
  };

}]);