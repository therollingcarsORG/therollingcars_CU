// public/src/js/controllers/signupController.js

angular.module('signupApp', []).controller('signupCtrl', ['$scope', '$http', '$location', function($scope, $http, $location) {

var refresh = function() {
    $http.get('/users').success(function(response) {
		console.log("the users response is " + response);
      	$scope.users = response;
      	$scope.user = "";
    });
};

  refresh();

$scope.signUp = function() {

	// CHECK THAT EMAIL ADDRESS HASN'T BEEN USED YET
	// CHECK THAT THE PASSWORD MATCHES THE CONFIRMED PASSWORD

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