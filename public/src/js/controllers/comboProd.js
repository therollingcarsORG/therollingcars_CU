'use strict';

var routerApp = angular.module('routerApp', ['ui.router', 'ngRoute', 'core', 'phoneDetail', 'phoneList']);

routerApp.config(function($stateProvider, $urlRouterProvider) {
    
    $urlRouterProvider.otherwise('/home');

    $stateProvider
        
        // HOME STATES AND NESTED VIEWS ========================================
        .state('home', {
            url: '/home',
            templateUrl: '/partial-home.html'
        })
        
        // nested list with custom controller
        .state('home.list', {
            url: '/list',
            templateUrl: 'partial-home-list.html',
            controller: function($scope) {
                $scope.cars = ['Ford Mustang', 'Chevrolet Camaro', 'Nissan Frontier'];
            }
        })
        
        // nested list with just some random string data
        .state('home.paragraph', {
            url: '/paragraph',
            template: 'Some paragraph of text!'
        })
        
        // ABOUT PAGE AND MULTIPLE NAMED VIEWS =================================
        .state('about', {
            url: '/about',
            views: {
                '': { templateUrl: 'partial-about.html' },
                'columnOne@about': { template: 'Another template can go here!' },
                'columnTwo@about': { 
                    templateUrl: 'table-data.html',
                    controller: 'carController'
                }
            }
            
        })

        // Showroom =================================
        .state('phones', {
            url: '/phones',
            template: '<phone-list></phone-list>'
        })

        .state('phoneId', {
            url: '/phones/:phoneTag',
            template: '<phone-detail></phone-detail>'
        })

        // Employees =================================
        .state('employee', {
            url: '/employee',
            templateUrl: 'views/comboProd/protoemployee/partial-employee.html'
        })

        .state('employee.inventory', {
            url: '/inventory',
            templateUrl: 'views/comboProd/protoemployee/partial-employee-inventory.html',
            controller: function($scope) {
                $scope;
            }
        })

        .state('employee.customers', {
            url: '/customers',
            templateUrl: 'views/comboProd/protoemployee/partial-employee-customers.html'
        })

        .state('employee.employees', {
            url: '/employees',
            templateUrl: 'views/comboProd/protoemployee/partial-employee-employees.html'
        })

        .state('employee.sales', {
            url: '/sales',
            templateUrl: 'views/comboProd/protoemployee/partial-employee-sales.html'
        });
    
});

routerApp.controller('carController', function($scope) {
    
    $scope.message = 'test';
   
    $scope.cars = [
        {
            name: 'Porsche 911',
            price: 50
        },
        {
            name: 'Nissan GTR',
            price: 10000
        },
        {
            name: 'Ford Mustang',
            price: 20000
        }
    ];
    
});


angular.
  module('routerApp').
  config(['$locationProvider' ,'$routeProvider',
    function config($locationProvider, $routeProvider) {
      $locationProvider.hashPrefix('!');

      $routeProvider.
        when('/phones', {
          template: '<phone-list></phone-list>'
        }).
        when('/phones/:phoneId', {
          template: '<phone-detail></phone-detail>'
        }).
        otherwise('/phones');
    }
  ]);
