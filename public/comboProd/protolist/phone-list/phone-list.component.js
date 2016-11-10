'use strict';

// Register `vehicleShowroom` component, along with its associated controller and template
angular.
  module('vehicleShowroom').
  component('phoneList', {
    templateUrl: 'protolist/phone-list/phone-list.template.html',
    controller: ['Phone',
      function ShowroomController(Vehicle) {
        this.vehicles = Vehicle.fetch();
        this.orderProp = 'age';
      }
    ]
  });
