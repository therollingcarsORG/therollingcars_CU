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
    if( validateInputData() === true ) {
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
		if( validateInputData() === true ) {
			$http.put('/employees/' + $scope.employee._id, $scope.employee).success(function(response) {
      refresh();
    });
		}
  };

  $scope.deselect = function() {
    $scope.employee = "";
  };
	
	var validateInputData = function(){
		//need to improve user experience
		console.log("Validating input data");
		if (!validateString($scope.employee.firstName, 2, 20, "first name")){ return false; }
		if (!validateString($scope.employee.lastName, 2, 20, "last name")){ return false; }
		if (!validateNumber($scope.employee.employeeNumber, 1, 6, "employee number")){ return false; }
		// add check if we have another employee with the same number
		if (!validatePhoneNumber($scope.employee.phoneNumber)){ return false; }
		if (!validateEmailAddress($scope.employee.emailAddress)){ return false; }
		return true;
	};
    
}]);