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
		//need to do the same checks at server level
		//need to improve user experience
		console.log("Validating input data");
		if (!validateString($scope.employee.firstName, 2, 10, "first name")){ return false; }
		if (!validateString($scope.employee.lastName, 2, 10, "last name")){ return false; }
		if (!validateNumber($scope.employee.employeeNumber, 1, 6, "employee number")){ return false; }
		// add check if we have another employee with the same number
		if (!validatePhoneNumber($scope.employee.phoneNumber)){ return false; }
		if (!validateEmailAddress($scope.employee.emailAddress)){ return false; }
		return true;
	};

	var validateString = function(inputText, minLength, maxLength, inputTextName){
		var customAlertMessage = 'The '+inputTextName+' must be between '+minLength+' and '+maxLength+' chars, it can contain only letters';
		return validateRegex(inputText, minLength, maxLength, /^[a-zA-Z]+$/, customAlertMessage);
	};

	var validateNumber = function(inputNumber, minLength, maxLength, inputNumberName){
		var customAlertMessage = 'The '+inputNumberName+' must be between '+minLength+' and '+maxLength+' digits, it can contain only numbers';
		return validateRegex(inputNumber, minLength, maxLength, /^[0-9]+$/, customAlertMessage);
	};
	
	var validatePhoneNumber = function(inputPhoneNumber){
		var customAlertMessage = "The phone number must be in format 000 000 0000, separators allowed are space ( ), dot (.) and dash (-)";
		return validateRegex(inputPhoneNumber, 12, 12, /^\(?(\d{3})\)?[ .-]?(\d{3})[ .-]?(\d{4})$/, customAlertMessage);
	};
	
	var validateEmailAddress = function(inputEmailAddress){
		var customAlertMessage = "The email address is not valid";
		var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		//var re = /\S+@\S+\.\S+/; //paranoic mode off
		return validateRegex(inputEmailAddress, 7, 100, re, customAlertMessage);
	};
	
	var validateRegex = function(inputData, minLength, maxLength, regex, customAlertMessage){
		if (!inputData || inputData.length < minLength || inputData.length > maxLength || !regex.test(inputData)){
			if (customAlertMessage && customAlertMessage != ''){
				alert(customAlertMessage);
			} else {
				alert('I can not validate the input data');
			}
		  return false;
		}
		return true;
	}
	
}]);