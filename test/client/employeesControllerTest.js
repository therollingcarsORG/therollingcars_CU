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
      $scope.user = {
        firstName: "Henry",
        lastName: "Ford",
        employeeNumber: "999999",
        phoneNumber: "800 555 5555",
        emailAddress: "henry@ford.com",
        usertype: "employee",
        hash: "Password1"
      };
    });

    it('sets the user properties if the firstName contains only 2 to 20 alphabetic characters', function() {
      $scope.validateInputData();
      expect($scope.valid).toEqual(true);

      $scope.user.firstName = "Henry@";
      $scope.validateInputData();
      expect($scope.valid).toEqual(false);

      $scope.user.firstName = "a";
      $scope.validateInputData();
      expect($scope.valid).toEqual(false);

      $scope.user.firstName = "ab";
      $scope.validateInputData();
      expect($scope.valid).toEqual(true);

      $scope.user.firstName = "abcdefghijklmnopqrst";
      $scope.validateInputData();
      expect($scope.valid).toEqual(true);

      $scope.user.firstName = "abcdefghijklmnopqrstu";
      $scope.validateInputData();
      expect($scope.valid).toEqual(false);
    });

    it('sets the user properties if the lastName contains only 2 to 20 alphanumeric characters and spaces', function() {
      $scope.validateInputData();
      expect($scope.valid).toEqual(true);

      $scope.user.lastName = "Ford@";
      $scope.validateInputData();
      expect($scope.valid).toEqual(false);

      $scope.user.lastName = "a";
      $scope.validateInputData();
      expect($scope.valid).toEqual(false);

      $scope.user.lastName = "ab";
      $scope.validateInputData();
      expect($scope.valid).toEqual(true);

      $scope.user.lastName = "abcdefghijklmnopqrst";
      $scope.validateInputData();
      expect($scope.valid).toEqual(true);

      $scope.user.lastName = "abcdefghijklmnopqrstu";
      $scope.validateInputData();
      expect($scope.valid).toEqual(false);
    });

    it('sets the user properties if the employeeNumber is a number between 1 and 6 digits', function() {
      $scope.validateInputData();
      expect($scope.valid).toEqual(true);

      $scope.user.employeeNumber = "0";
      $scope.validateInputData();
      expect($scope.valid).toEqual(true);

      $scope.user.employeeNumber = "999999";
      $scope.validateInputData();
      expect($scope.valid).toEqual(true);

      $scope.user.employeeNumber = "-1";
      $scope.validateInputData();
      expect($scope.valid).toEqual(false);

      $scope.user.employeeNumber = "1000000";
      $scope.validateInputData();
      expect($scope.valid).toEqual(false);

      $scope.user.employeeNumber = "asdf";
      $scope.validateInputData();
      expect($scope.valid).toEqual(false);
    });

    it('sets the user properties if the phoneNumber has a valid US format 000 000 0000 separators space, dot, or dash', function() {
      $scope.validateInputData();
      expect($scope.valid).toEqual(true);

      $scope.user.phoneNumber = "800.555.5555";
      $scope.validateInputData();
      expect($scope.valid).toEqual(true);
			
      $scope.user.phoneNumber = "800-555-5555";
      $scope.validateInputData();
      expect($scope.valid).toEqual(true);
			
      $scope.user.phoneNumber = "800_555_5555";
      $scope.validateInputData();
      expect($scope.valid).toEqual(false);

      $scope.user.phoneNumber = "8005555555";
      $scope.validateInputData();
      expect($scope.valid).toEqual(false);

      $scope.user.phoneNumber = "800 555 55555";
      $scope.validateInputData();
      expect($scope.valid).toEqual(false);
			
      $scope.user.phoneNumber = "800 555 555";
      $scope.validateInputData();
      expect($scope.valid).toEqual(false);

      $scope.user.phoneNumber = "asdf";
      $scope.validateInputData();
      expect($scope.valid).toEqual(false);

      $scope.user.phoneNumber = "-999";
      $scope.validateInputData();
      expect($scope.valid).toEqual(false);
    });

    it('sets the user properties if the email address had a valid structure', function() {
      $scope.validateInputData();
      expect($scope.valid).toEqual(true);

      $scope.user.emailAddress = "henry.ford@columbia.edu";
      $scope.validateInputData();
      expect($scope.valid).toEqual(true);

      $scope.user.emailAddress = "henry@ford";
      $scope.validateInputData();
      expect($scope.valid).toEqual(false);

      $scope.user.emailAddress = "henryford.com";
      $scope.validateInputData();
      expect($scope.valid).toEqual(false);

      $scope.user.emailAddress = "a";
      $scope.validateInputData();
      expect($scope.valid).toEqual(false);
    });

    it('sets the user properties if the usertype is valid', function() {
      $scope.validateInputData();
      expect($scope.valid).toEqual(true);

      $scope.user.usertype = "customer";
      $scope.validateInputData();
      expect($scope.valid).toEqual(true);

      $scope.user.usertype = "Employee";
      $scope.validateInputData();
      expect($scope.valid).toEqual(false);

      $scope.user.usertype = "employe";
      $scope.validateInputData();
      expect($scope.valid).toEqual(false);

      $scope.user.usertype = "employeee";
      $scope.validateInputData();
      expect($scope.valid).toEqual(false);
    });

    it('sets the user properties if the password contains only letters and numbers, and it must have at least 1 number, 1 uppercase and 1 lowercase character', function() {
      $scope.validateInputData();
      expect($scope.valid).toEqual(true);

      $scope.user.hash = "4asswEr3d";
      $scope.validateInputData();
      expect($scope.valid).toEqual(true);

      $scope.user.hash = "Passwo1";
      $scope.validateInputData();
      expect($scope.valid).toEqual(false);

      $scope.user.hash = "Password1eeeeeeeeeeeeee";
      $scope.validateInputData();
      expect($scope.valid).toEqual(false);

      $scope.user.hash = "passworD1@";
      $scope.validateInputData();
      expect($scope.valid).toEqual(false);
    });
  });
});