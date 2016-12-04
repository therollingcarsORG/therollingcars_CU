(function () {
   'use strict';
   // this function is strict...
}());

describe('Vehicle', function() {
  var $httpBackend;
  var Vehicle;
  var vehiclesData = [
    {name: 'Vehicle X'},
    {name: 'Vehicle Y'},
    {name: 'Vehicle Z'}
  ];

  // Add a custom equality tester before each test
  beforeEach(function() {
    jasmine.addCustomEqualityTester(angular.equals);
  });

  // Load the module that contains the `Phone` service before each test
  beforeEach(module('core.vehicle'));

  // Instantiate the service and "train" `$httpBackend` before each test
  beforeEach(inject(function(_$httpBackend_, _Phone_) {
    $httpBackend = _$httpBackend_;
    $httpBackend.expectGET('protolist/vehicles/vehicles.json').respond(vehiclesData);

    Vehicle = _Vehicle_;
  }));

  // Verify that there are no outstanding expectations or requests after each test
  afterEach(function () {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  it('should fetch the phones data from `protolist/vehicles/vehicles.json`', function() {
    var vehicles = Vehicle.query();

    expect(vehicles).toEqual([]);

    $httpBackend.flush();
    expect(vehicles).toEqual(vehiclesData);
  });

});
