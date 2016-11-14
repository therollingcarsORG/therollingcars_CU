'use strict';

angular.
  module('core.vehicle').
  factory('Vehicle', ['$resource',
    function($resource) {
      return $resource('/inventory', {}, {
        fetch: {
          method: 'GET',
          params: {vehicleId: 'vehicles'},
          isArray: true
        }
      });
    }
  ]);
