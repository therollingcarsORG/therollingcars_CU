(function () {
   'use strict';
   // this function is strict...
}());

describe('vehicleDetail', function() {

  // Load the module that contains the `vehicleDetail` component before each test
  beforeEach(module('vehicleDetail'));

  // Test the controller
  describe('VehicleDetailController', function() {
    var $httpBackend, ctrl;
    var xyzVehicleData = {
      name: 'vehicle xyz',
      images: ['protolist/image/url1.png', 'protolist/image/url2.png']
    };

    beforeEach(inject(function($componentController, _$httpBackend_, $routeParams) {
      $httpBackend = _$httpBackend_;
      $httpBackend.expectGET('protolist/vehicles/xyz.json').respond(xyzVehicleData);

      $routeParams.vehicleId = 'xyz';

      ctrl = $componentController('vehicleDetail');
    }));

    it('should fetch the vehicle details', function() {
      jasmine.addCustomEqualityTester(angular.equals);

      expect(ctrl.vehicle).toEqual({});

      $httpBackend.flush();
      expect(ctrl.vehicle).toEqual(xyzVehicleData);
    });

  });

});
