// public/src/js/controllers/signupController.js

angular.module('signupApp', []).controller('signupCtrl', ['$scope', '$http', function($scope, $http) {

  var refresh = function() {
    $http.get('/users').success(function(response) {
		console.log("the users in scope response is " + response);
      	$scope.users = response;
      	$scope.user = "";
    });
  };

  refresh();

    $scope.signUp = function() {
    console.log($scope.user);
    $http.post('/users', $scope.user).success(function(response) {
      console.log("signUp() post response was" + response);
      refresh();
    });
  };

    $scope.remove = function(id) {
    console.log("removing user " + id);
    $http.delete('/users/' + id).success(function(response) {
      refresh();
    });
  };

}]);