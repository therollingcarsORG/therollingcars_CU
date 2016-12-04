(function () {
   'use strict';
   // this function is strict...
}());

describe('vehicleList', function() {

  // Load the module that contains the `vehicleList` component before each test
  beforeEach(module('vehicleList'));

  // Test the controller
  describe('VehicleListController', function() {
    var $httpBackend, ctrl;

    beforeEach(inject(function($componentController, _$httpBackend_) {
      $httpBackend = _$httpBackend_;
      $httpBackend.expectGET('protolist/vehicles/vehicles.json')
                  .respond([{name: 'Nexus S'}, {name: 'Motorola DROID'}]);

      ctrl = $componentController('vehicleList');
    }));

    it('should create a `vehicles` property with 2 vehicles fetched with `$http`', function() {
      jasmine.addCustomEqualityTester(angular.equals);

      expect(ctrl.vehicles).toEqual([]);

      $httpBackend.flush();
      expect(ctrl.vehicles).toEqual([{name: 'Nexus S'}, {name: 'Motorola DROID'}]);
    });

    it('should set a default value for the `orderProp` property', function() {
      expect(ctrl.orderProp).toBe('age');
    });

  });

});
