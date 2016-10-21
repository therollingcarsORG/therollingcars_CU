// public/src/js/controllers/BtmCtrl.js
var myBtmCtrl = angular.module('BtmCtrl', ['mySharedModel']);

myBtmCtrl.controller('bottomController', ['$scope', 'messages' , function($scope, messages) {


	$scope.$on('modelUpdate', function() {
		console.log('MODEL UPDATED!!');
    });

    $scope.message1 = 'Output!';
    messages.add('Hello');
    $scope.message2 = messages.list[0].text;

   

}]);