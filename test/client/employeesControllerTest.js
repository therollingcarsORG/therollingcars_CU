describe('employeesCtrl', function() {
  beforeEach(module('employeesApp'));

  var $controller;

  beforeEach(inject(function(_$controller_){
    // The injector unwraps the underscores (_) from around the parameter names when matching
    $controller = _$controller_;
  }));

  describe('Validating employees input.', function() {

    var $scope, controller;
    beforeEach(function() {
      $scope = {};
      controller = $controller('employeesCtrl', { $scope: $scope });
      $scope.employee = {
        firstName: "Henry",
        lastName: "Ford",
        employeeNumber: "999999",
        phoneNumber: "800 555 5555",
        emailAddress: "henry@ford.com"
      };
    });

    it('sets the employee properties if the firstName contains only 2 to 20 alphabetic characters', function() {
      $scope.validateInputData();
      expect($scope.valid).toEqual(true);

      $scope.employee.firstName = "Henry@";
      $scope.validateInputData();
      expect($scope.valid).toEqual(false);

      $scope.employee.firstName = "a";
      $scope.validateInputData();
      expect($scope.valid).toEqual(false);

      $scope.employee.firstName = "ab";
      $scope.validateInputData();
      expect($scope.valid).toEqual(true);

      $scope.employee.firstName = "abcdefghijklmnopqrst";
      $scope.validateInputData();
      expect($scope.valid).toEqual(true);

      $scope.employee.firstName = "abcdefghijklmnopqrstu";
      $scope.validateInputData();
      expect($scope.valid).toEqual(false);
    });

    it('sets the employee properties if the lastName contains only 2 to 20 alphanumeric characters and spaces', function() {
      $scope.validateInputData();
      expect($scope.valid).toEqual(true);

      $scope.employee.lastName = "Ford@";
      $scope.validateInputData();
      expect($scope.valid).toEqual(false);

      $scope.employee.lastName = "a";
      $scope.validateInputData();
      expect($scope.valid).toEqual(false);

      $scope.employee.lastName = "ab";
      $scope.validateInputData();
      expect($scope.valid).toEqual(true);

      $scope.employee.lastName = "abcdefghijklmnopqrst";
      $scope.validateInputData();
      expect($scope.valid).toEqual(true);

      $scope.employee.lastName = "abcdefghijklmnopqrstu";
      $scope.validateInputData();
      expect($scope.valid).toEqual(false);
    });

    it('sets the employee properties if the employeeNumber is a number between 1 and 6 digits', function() {
      $scope.validateInputData();
      expect($scope.valid).toEqual(true);

      $scope.employee.employeeNumber = "0";
      $scope.validateInputData();
      expect($scope.valid).toEqual(true);

      $scope.employee.employeeNumber = "999999";
      $scope.validateInputData();
      expect($scope.valid).toEqual(true);

      $scope.employee.employeeNumber = "-1";
      $scope.validateInputData();
      expect($scope.valid).toEqual(false);

      $scope.employee.employeeNumber = "1000000";
      $scope.validateInputData();
      expect($scope.valid).toEqual(false);

      $scope.employee.employeeNumber = "asdf";
      $scope.validateInputData();
      expect($scope.valid).toEqual(false);
    });

    it('sets the employee properties if the phoneNumber has a valid US format 000 000 0000 separators space, dot, or dash', function() {
      $scope.validateInputData();
      expect($scope.valid).toEqual(true);

      $scope.employee.phoneNumber = "800.555.5555";
      $scope.validateInputData();
      expect($scope.valid).toEqual(true);
			
      $scope.employee.phoneNumber = "800-555-5555";
      $scope.validateInputData();
      expect($scope.valid).toEqual(true);
			
      $scope.employee.phoneNumber = "800_555_5555";
      $scope.validateInputData();
      expect($scope.valid).toEqual(false);

      $scope.employee.phoneNumber = "8005555555";
      $scope.validateInputData();
      expect($scope.valid).toEqual(false);

      $scope.employee.phoneNumber = "800 555 55555";
      $scope.validateInputData();
      expect($scope.valid).toEqual(false);
			
      $scope.employee.phoneNumber = "800 555 555";
      $scope.validateInputData();
      expect($scope.valid).toEqual(false);

      $scope.employee.phoneNumber = "asdf";
      $scope.validateInputData();
      expect($scope.valid).toEqual(false);

      $scope.employee.phoneNumber = "-999";
      $scope.validateInputData();
      expect($scope.valid).toEqual(false);
    });

    it('sets the employee properties if the email address had a valid structure', function() {
      $scope.validateInputData();
      expect($scope.valid).toEqual(true);

      $scope.employee.emailAddress = "henry.ford@columbia.edu";
      $scope.validateInputData();
      expect($scope.valid).toEqual(true);

      $scope.employee.emailAddress = "henry@ford";
      $scope.validateInputData();
      expect($scope.valid).toEqual(false);

      $scope.employee.emailAddress = "henryford.com";
      $scope.validateInputData();
      expect($scope.valid).toEqual(false);

      $scope.employee.emailAddress = "a";
      $scope.validateInputData();
      expect($scope.valid).toEqual(false);
    });

  });
});