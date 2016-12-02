describe('TopCtrl', function() {
  beforeEach(module('InvntryCtrl'));

  var $controller;

  beforeEach(inject(function(_$controller_){
    // The injector unwraps the underscores (_) from around the parameter names when matching
    $controller = _$controller_;
  }));

  describe('Validating inventory input.', function() {

    var $scope, controller;
    beforeEach(function() {
      $scope = {};
      controller = $controller('TopCtrl', { $scope: $scope });
      $scope.vehicle = {
        make: "fiat 100",
        model: "500 s",
        miles: "1000",
        year: "2015",
        color: "blue",
        price: "20000",
        cost: "18000"
      };
    });

    it('sets the vehicle properties if the make contains only 2 to 20 alphanumeric characters and spaces', function() {
      $scope.validateInputData();
      expect($scope.valid).toEqual(true);

      $scope.vehicle.make = "fiat@";
      $scope.validateInputData();
      expect($scope.valid).toEqual(false);

      $scope.vehicle.make = "a";
      $scope.validateInputData();
      expect($scope.valid).toEqual(false);

      $scope.vehicle.make = "ab";
      $scope.validateInputData();
      expect($scope.valid).toEqual(true);

      $scope.vehicle.make = "abcdefghijklmnopqrst";
      $scope.validateInputData();
      expect($scope.valid).toEqual(true);

      $scope.vehicle.make = "abcdefghijklmnopqrstu";
      $scope.validateInputData();
      expect($scope.valid).toEqual(false);
    });

    it('sets the vehicle properties if the model contains only 2 to 20 alphanumeric characters and spaces', function() {
      $scope.validateInputData();
      expect($scope.valid).toEqual(true);

      $scope.vehicle.model = "500@";
      $scope.validateInputData();
      expect($scope.valid).toEqual(false);

      $scope.vehicle.model = "a";
      $scope.validateInputData();
      expect($scope.valid).toEqual(false);

      $scope.vehicle.model = "ab";
      $scope.validateInputData();
      expect($scope.valid).toEqual(true);

      $scope.vehicle.model = "abcdefghijklmnopqrst";
      $scope.validateInputData();
      expect($scope.valid).toEqual(true);

      $scope.vehicle.model = "abcdefghijklmnopqrstu";
      $scope.validateInputData();
      expect($scope.valid).toEqual(false);
    });

    it('sets the vehicle properties if the miles are between 0 and 999999999', function() {
      $scope.validateInputData();
      expect($scope.valid).toEqual(true);

      $scope.vehicle.miles = "0";
      $scope.validateInputData();
      expect($scope.valid).toEqual(true);

      $scope.vehicle.miles = "999999999";
      $scope.validateInputData();
      expect($scope.valid).toEqual(true);

      $scope.vehicle.miles = "-1";
      $scope.validateInputData();
      expect($scope.valid).toEqual(false);

      $scope.vehicle.miles = "1999999999";
      $scope.validateInputData();
      expect($scope.valid).toEqual(false);

      $scope.vehicle.miles = "asdf";
      $scope.validateInputData();
      expect($scope.valid).toEqual(false);
    });

    it('sets the vehicle properties if the years are 4 numeric digits', function() {
      $scope.validateInputData();
      expect($scope.valid).toEqual(true);

      $scope.vehicle.year = "0001";
      $scope.validateInputData();
      expect($scope.valid).toEqual(true);

      $scope.vehicle.year = "999";
      $scope.validateInputData();
      expect($scope.valid).toEqual(false);

      $scope.vehicle.year = "9999";
      $scope.validateInputData();
      expect($scope.valid).toEqual(true);

      $scope.vehicle.year = "10000";
      $scope.validateInputData();
      expect($scope.valid).toEqual(false);

      $scope.vehicle.year = "asdf";
      $scope.validateInputData();
      expect($scope.valid).toEqual(false);

      $scope.vehicle.year = "-999";
      $scope.validateInputData();
      expect($scope.valid).toEqual(false);
    });

    it('sets the vehicle properties if the color contains only 2 to 20 alpha characters', function() {
      $scope.validateInputData();
      expect($scope.valid).toEqual(true);

      $scope.vehicle.color = "red@";
      $scope.validateInputData();
      expect($scope.valid).toEqual(false);

      $scope.vehicle.color = "red b";
      $scope.validateInputData();
      expect($scope.valid).toEqual(false);

      $scope.vehicle.color = "red2";
      $scope.validateInputData();
      expect($scope.valid).toEqual(false);

      $scope.vehicle.color = "a";
      $scope.validateInputData();
      expect($scope.valid).toEqual(false);

      $scope.vehicle.color = "ab";
      $scope.validateInputData();
      expect($scope.valid).toEqual(true);

      $scope.vehicle.color = "abcdefghijklmnopqrst";
      $scope.validateInputData();
      expect($scope.valid).toEqual(true);

      $scope.vehicle.color = "abcdefghijklmnopqrstu";
      $scope.validateInputData();
      expect($scope.valid).toEqual(false);
    });

    it('sets the vehicle properties if the price is between 0 and 999999999', function() {
      $scope.validateInputData();
      expect($scope.valid).toEqual(true);

      $scope.vehicle.price = "0";
      $scope.validateInputData();
      expect($scope.valid).toEqual(true);

      $scope.vehicle.price = "999999999";
      $scope.validateInputData();
      expect($scope.valid).toEqual(true);

      $scope.vehicle.price = "-1";
      $scope.validateInputData();
      expect($scope.valid).toEqual(false);

      $scope.vehicle.price = "1999999999";
      $scope.validateInputData();
      expect($scope.valid).toEqual(false);

      $scope.vehicle.price = "asdf";
      $scope.validateInputData();
      expect($scope.valid).toEqual(false);
    });

    it('sets the vehicle properties if the cost is between 0 and 999999999', function() {
      $scope.validateInputData();
      expect($scope.valid).toEqual(true);

      $scope.vehicle.cost = "0";
      $scope.validateInputData();
      expect($scope.valid).toEqual(true);

      $scope.vehicle.cost = "999999999";
      $scope.validateInputData();
      expect($scope.valid).toEqual(true);

      $scope.vehicle.cost = "-1";
      $scope.validateInputData();
      expect($scope.valid).toEqual(false);

      $scope.vehicle.cost = "1999999999";
      $scope.validateInputData();
      expect($scope.valid).toEqual(false);

      $scope.vehicle.cost = "asdf";
      $scope.validateInputData();
      expect($scope.valid).toEqual(false);
    });
  });
});