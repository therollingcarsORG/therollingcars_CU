// public/src/js/controllers/inventoryController.js

angular.module('inventoryApp', []).controller('inventoryCtrl', ['$scope', '$http', function($scope, $http) {

  console.log("inventory controller");

  var refresh = function() {
    $http.get('/inventory').success(function(response) {
      console.log("I got the data I requested");
      $scope.inventory = response;
      $scope.vehicle = "";
    });
  };

  refresh();

  $scope.addVehicle = function() {
    console.log($scope.vehicle);
    $scope.validateInputData();
		if( $scope.valid === true ) {
			$http.post('/inventory', $scope.vehicle).success(function(response) {
        console.log(response);
        refresh();
      });
		}
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
		}
  };

  $scope.deselect = function() {
    $scope.vehicle = "";
  };
	
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