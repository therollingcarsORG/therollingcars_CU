var mySharedModel = angular.module('mySharedModel', []);

mySharedModel.factory('messages', ['$rootScope', function($rootScope){
  var messages = {};

  messages.list = [];

  messages.add = function(message){
    messages.list.push({id: messages.list.length, text: message});
    this.broadcastItem();
  };

  messages.broadcastItem = function() {
  	$rootScope.$broadcast('modelUpdate');
  };

  return messages;
}]);