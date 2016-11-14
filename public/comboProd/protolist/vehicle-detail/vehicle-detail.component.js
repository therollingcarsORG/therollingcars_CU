'use strict';

// Register `vehicleDetail` component, along with its associated controller and template
angular.
  module('vehicleDetail').
  component('vehicleDetail', {
    templateUrl: 'protolist/vehicle-detail/vehicle-detail.template.html',
    controller: ['$stateParams', 'Vehicle',
      function VehicleDetailController($stateParams, Vehicle) {
        var self = this;
        self.vehicle = Vehicle.get({vehicleId: $stateParams.vehicleTag}, function(vehicle) {
          self.setImage(vehicle.images[0]);
        });

        self.setImage = function setImage(imageUrl) {
          self.mainImageUrl = imageUrl;
        };
      }
    ]
  });
