var myNumberServices = angular.module('NumberServices', []);


myNumberServices.service('EchoNumber', [function() {

  this.echo = function(num) {
    return num;
  };

}]);


myNumberServices.service('MathOperations', [function() {

  this.addTwoNumbers = function(num1, num2) {
    return num1 + num2;
  };

  this.multiplyTwoNumbers = function(num1, num2) {
    return num1 * num2;
  };

}]);