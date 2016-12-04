(function () {
   'use strict';
   // this function is strict...
}());

// Register `vehicleDetail` component, along with its associated controller and template
angular.
  module('vehicleDetail').
  component('vehicleDetail', {
    templateUrl: 'protolist/vehicle-detail/vehicle-detail.template.html',
    controller: ['$stateParams', 'Vehicle',
      function VehicleDetailController($stateParams, Vehicle) {
        console.log("Fetched detail page for vehicleId: " + $stateParams.vehicleTag);
        this.vehicle = Vehicle.get({vehicleId: $stateParams.vehicleTag});
        // this.pricestring = this.vehicle.price.formatMoney(2, '.', ',');
      }
    ]
  });
