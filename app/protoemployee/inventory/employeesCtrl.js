angular.module('employeesApp', []).controller('employeesCtrl', ['$scope', '$http', function($scope, $http) {

  console.log("employees controller");

  var refresh = function() {
    console.log("employees controller refresh");
    $http.get('/employees').success(function(response) {
      console.log("I got the data I requested");
      $scope.users = response;
      $scope.user = "";
    });
  };

  refresh();

  $scope.addUser = function() {
    console.log($scope.user);
    $scope.validateInputData();
    if( $scope.valid === true ) {
      $http.post('/employees', $scope.user).success(function(response) {
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
      $scope.user = response;
    });
  };  

  $scope.update = function() {
    console.log($scope.user._id);
    $scope.validateInputData();
	if( $scope.valid === true ) {
	  $http.put('/employees/' + $scope.user._id, $scope.user).success(function(response) {
        refresh();
      });
    }
  };

  $scope.deselect = function() {
    $scope.user = "";
  };
	
	$scope.validateInputData = function(){
		$scope.valid = true;
		console.log("Validating input data");
		if (!validateString($scope.user.firstName, 2, 20, "first name")){ $scope.valid = false; }
		if (!validateString($scope.user.lastName, 2, 20, "last name")){ $scope.valid = false; }
		if (!validateNumber($scope.user.employeeNumber, 1, 6, "employee number")){ $scope.valid = false; }
		// add check if we have another user with the same number
		if (!validatePhoneNumber($scope.user.phoneNumber)){ $scope.valid = false; }
		if (!validateEmailAddress($scope.user.emailAddress)){ $scope.valid = false; }
        if (!validateListOfStrings($scope.user.usertype, ['employee', 'customer'])){ $scope.valid = false; }
	};
    
    
      // USER FUNCTIONS

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

  // END USER FUNCTIONS
}]);