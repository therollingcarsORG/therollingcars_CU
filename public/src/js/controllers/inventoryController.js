// public/src/js/controllers/inventoryController.js

angular.module('inventoryApp', []).controller('inventoryCtrl', ['$scope', '$http', function($scope, $http) {

  console.log("inventory controller");

  var refresh = function() {
    console.log("help pelase");
    $http.get('/inventory').success(function(response) {
      console.log("I got the data I requested");
      $scope.inventory = response;
      $scope.vehicle = "";
    });
  };

  refresh();

  $scope.addVehicle = function() {
    console.log($scope.vehicle);
    $http.post('/inventory', $scope.vehicle).success(function(response) {
      console.log(response);
      refresh();
    });
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
    $http.put('/inventory/' + $scope.vehicle._id, $scope.vehicle).success(function(response) {
      refresh();
    });
  };

  $scope.deselect = function() {
    $scope.vehicle = "";
  };

}]);