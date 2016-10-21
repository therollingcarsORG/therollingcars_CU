describe('NumberServices.EchoNumber', function() {

  var EchoNumber;

  beforeEach(module('NumberServices'));
  beforeEach(inject(function($injector) {
    EchoNumber = $injector.get('EchoNumber');
  }));

  it('Should echo out numbers', function() {
    expect(EchoNumber.echo(0)).toBe(0);
  });

  it('Should echo out numbers', function() {
    expect(EchoNumber.echo(1)).toBe(1);
  });


});


describe('NumberServices.MathOperations', function() {

  var MathOperations;

  beforeEach(module('NumberServices'));
  beforeEach(inject(function($injector) {
    MathOperations = $injector.get('MathOperations');
  }));

  it('Should add the two numbers', function() {
    expect(MathOperations.addTwoNumbers(0, 2)).toBe(2);
  });

  it('Should add the two numbers', function() {
    expect(MathOperations.addTwoNumbers(1, 4)).toBe(5);
  });

  it('Should multiply the two numbers', function() {
    expect(MathOperations.multiplyTwoNumbers(10, 4)).toBe(40);
  });

  it('Should multiple the two numbers', function() {
    expect(MathOperations.multiplyTwoNumbers(7, 4)).toBe(28);
  });


});