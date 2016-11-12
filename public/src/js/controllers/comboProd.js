var routerApp = angular.module('routerApp', ['ui.router', 'ngRoute', 'core', 'phoneDetail', 'vehicleShowroom', 'myInventoryApp']);

routerApp.config(function($stateProvider, $urlRouterProvider) {
    'use strict';
	
    $urlRouterProvider.otherwise('/home');

    $stateProvider
        
        // HOME STATES AND NESTED VIEWS ========================================
        .state('home', {
            url: '/home',
            templateUrl: 'partial-home.html'
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
            templateUrl: 'protoemployee/partial-employee.html'
        })

        .state('employee.inventory', {
            url: '/inventory',
            templateUrl: 'protoemployee/inventory/partial-employee-inventory.html'
        })

        .state('employee.customers', {
            url: '/customers',
            templateUrl: 'protoemployee/partial-employee-customers.html',
            controller: function($scope) {
                //$scope; //this is to be completed I guess
            }
        })

        .state('employee.employees', {
            url: '/employees',
            templateUrl: 'protoemployee/partial-employee-employees.html'
        })

        .state('employee.sales', {
            url: '/sales',
            templateUrl: 'protoemployee/partial-employee-sales.html'
        })


        .state('account', {
            url: '/account',
            templateUrl: 'login/account/index.html',
            controller: 'Account.IndexController',
            controllerAs: 'vm',
            data: { activeTab: 'account' }
        });
});

routerApp.controller('carController', function($scope) {
    'use strict';
	
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
