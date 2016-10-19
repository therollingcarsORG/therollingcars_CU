angular.module('ExampleApp', [])

.service('EchoNumber', [function() {

  // iterative approach
  this.echo = function(num) {
    return num;
  };

}]);