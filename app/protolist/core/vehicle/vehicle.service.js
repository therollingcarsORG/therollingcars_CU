(function () {
   'use strict';
   // this function is strict...
}());

angular.
  module('core.vehicle').
  factory('Vehicle', ['$resource',
    function($resource) {
      return $resource('/inventory/:vehicleId', {}, {
        fetch: {
          method: 'GET',
          isArray: true
        }
      });
    }
  ]);
