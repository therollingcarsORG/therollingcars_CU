// public/src/js/services/TestService.js
angular.module('TestService', [])

.factory('Test', ['$http', function($http) {
    
    return {
        get: function() {
            // this returns something 
        }
    };

}]);