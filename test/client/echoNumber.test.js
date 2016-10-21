describe('ExampleApp.EchoNumber', function() {

  var EchoNumber;

  beforeEach(module('ExampleApp'));
  beforeEach(inject(function($injector) {
    EchoNumber = $injector.get('EchoNumber');
  }));

  it('Should echo out numbers', function() {
    expect(EchoNumber.echo(0)).toBe(0);
  });

  it('Should echo out numbers', function() {
    expect(EchoNumber.echo(0)).toBe(0);
  });


});