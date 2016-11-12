// public/src/js/controllers/employeesController.js

angular.module('employeesApp', []).controller('employeesCtrl', ['$scope', '$http', function($scope, $http) {

  console.log("employees controller");

  var refresh = function() {
    console.log("employees controller refresh");
    $http.get('/employees').success(function(response) {
      console.log("I got the data I requested");
      $scope.employees = response;
      $scope.employee = "";
    });
  };

  refresh();

  $scope.addEmployee = function() {
    console.log($scope.employee);
		$scope.validateInputData();
    if( $scope.valid === true ) {
      $http.post('/employees', $scope.employee).success(function(response) {
        console.log(response);
        refresh();
      });
    }
  };

  $scope.remove = function(id) {
    console.log(id);
    $http.delete('/employees/' + id).success(function(response) {
      refresh();
    });
  };

  $scope.edit = function(id) {
    console.log(id);
    $http.get('/employees/' + id).success(function(response) {
      $scope.employee = response;
    });
  };  

  $scope.update = function() {
    console.log($scope.employee._id);
		$scope.validateInputData();
		if( $scope.valid === true ) {
			$http.put('/employees/' + $scope.employee._id, $scope.employee).success(function(response) {
      refresh();
    });
		}
  };

  $scope.deselect = function() {
    $scope.employee = "";
  };
	
	$scope.validateInputData = function(){
		$scope.valid = true;
		console.log("Validating input data");
		if (!validateString($scope.employee.firstName, 2, 20, "first name")){ $scope.valid = false; }
		if (!validateString($scope.employee.lastName, 2, 20, "last name")){ $scope.valid = false; }
		if (!validateNumber($scope.employee.employeeNumber, 1, 6, "employee number")){ $scope.valid = false; }
		// add check if we have another employee with the same number
		if (!validatePhoneNumber($scope.employee.phoneNumber)){ $scope.valid = false; }
		if (!validateEmailAddress($scope.employee.emailAddress)){ $scope.valid = false; }
	};
    
}]);