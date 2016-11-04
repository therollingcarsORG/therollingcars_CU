'use strict';

var routerApp = angular.module('routerApp', ['ui.router', 'ngRoute', 'core', 'phoneDetail', 'phoneList', 'myInventoryApp']);

routerApp.config(function($stateProvider, $urlRouterProvider) {
    
    $urlRouterProvider.otherwise('/home');

    $stateProvider
        
        // HOME STATES AND NESTED VIEWS ========================================
        .state('home', {
            url: '/home',
            templateUrl: 'comboProd/partial-home.html'
        })
        
        // nested list with custom controller
        .state('home.list', {
            url: '/list',
            templateUrl: 'comboProd/partial-home-list.html',
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
                '': { templateUrl: 'comboProd/partial-about.html' },
                'columnOne@about': { template: 'Another template can go here!' },
                'columnTwo@about': { 
                    templateUrl: 'comboProd/table-data.html',
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
            templateUrl: 'comboProd/protoemployee/partial-employee.html'
        })

        .state('employee.inventory', {
            url: '/inventory',
            templateUrl: 'comboProd/protoemployee/inventory/partial-employee-inventory.html'
        })

        .state('employee.customers', {
            url: '/customers',
            templateUrl: 'comboProd/protoemployee/partial-employee-customers.html',
            controller: function($scope) {
                $scope;
            }
        })

        .state('employee.employees', {
            url: '/employees',
            templateUrl: 'comboProd/protoemployee/partial-employee-employees.html'
        })

        .state('employee.sales', {
            url: '/sales',
            templateUrl: 'comboProd/protoemployee/partial-employee-sales.html'
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
