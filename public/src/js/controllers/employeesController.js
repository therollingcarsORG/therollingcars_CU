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
    $http.post('/employees', $scope.employee).success(function(response) {
      console.log(response);
      refresh();
    });
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
    $http.put('/employees/' + $scope.employee._id, $scope.employee).success(function(response) {
      refresh();
    });
  };

  $scope.deselect = function() {
    $scope.employee = "";
  };

}]);