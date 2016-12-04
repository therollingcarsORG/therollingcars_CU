(function () {
   'use strict';
   // this function is strict...
}());

// Register `vehicleShowroom` component, along with its associated controller and template
angular.
  module('vehicleShowroom').
  component('vehicleList', {
    templateUrl: 'protolist/vehicle-list/vehicle-list.template.html',
    controller: ['Vehicle',
      function ShowroomController(Vehicle) {
        this.vehicles = Vehicle.fetch();
        this.orderProp = 'age';
      }
    ]
  });
