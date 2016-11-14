// public/src/js/controllers/customerViewController.js

angular.module('customerViewApp', []).controller('customerViewCtrl', ['$scope', '$http', function($scope, $http) {

  console.log("customer view controller");

  var refresh = function() {
    $http.get('/customerview').success(function(response) {
      console.log("I got the data I requested");
      $scope.customersection = response;
      $scope.vehicle = "";
    });
  };

  refresh();


 

  $scope.deselect = function() {
    $scope.vehicle = "";
  };
	
	$scope.validateInputData = function(){
		console.log("Validating input data");
    $scope.valid = true;
		/* Commented to implement as a part of second iteration to implement search features
    if (!validateString($scope.vehicle.make, 2, 20, "make")){ $scope.valid = false; }
		if (!validateString($scope.vehicle.model, 2, 20, "model")){ $scope.valid = false; }
		if (!validateNumber($scope.vehicle.miles, 1, 9, "miles")){ $scope.valid = false; }
		if (!validateNumber($scope.vehicle.year, 4, 4, "year")){ $scope.valid = false; }
		if (!validateString($scope.vehicle.color, 2, 20, "color")){ $scope.valid = false; }
		if (!validateNumber($scope.vehicle.price, 1, 9, "price")){ $scope.valid = false; }
		if (!validateNumber($scope.vehicle.cost, 1, 9, "cost")){ $scope.valid = false; }
	  */
  };

}]);
