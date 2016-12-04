(function () {
    

var routerApp = angular.module('routerApp', ['ui.router', 'ngRoute', 'core', 'vehicleDetail', 'vehicleShowroom', 'myInventoryApp', 'appAuth']);

routerApp.config(function($stateProvider, $urlRouterProvider) {
    'use strict';
	
    $urlRouterProvider.otherwise('/home');

    $stateProvider
        
        // HOME STATES AND NESTED VIEWS ========================================
        .state('home', {
            url: '/home',
            templateUrl: 'partial-home.html',
            data: { activeTab: 'home' }
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
            },
            data: { activeTab: 'about' }
            
        })

        // Showroom =================================
        .state('vehicles', {
            url: '/vehicles',
            template: '<vehicle-list></vehicle-list>',
            data: { activeTab: 'vehicles' }
        })

        .state('vehicleId', {
            url: '/vehicles/:vehicleTag',
            template: '<vehicle-detail></vehicle-detail>'
        })

        // Employees =================================
        .state('employee', {
            url: '/employee',
            templateUrl: 'protoemployee/partial-employee.html',
            data: { activeTab: 'employee' }
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

        // Manage Account ==============================
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

routerApp.run(run);

function run($http, $rootScope, $window) {
   
     // add JWT token as default auth header
    $http.defaults.headers.common.Authorization = 'Bearer ' + $window.jwtToken;


    // THIS IS NOT SECURE AT ALL, MUST CHANGE, JUST FOR DEMO PURPOSES
    // ng-show = "isEmployee" in index.html
    // !!!!!!!!!!!!!!!!!! 
    $http.get('/api/users/current').success(function(data)
    {
        if(data.usertype === "employee")
        {
            $rootScope.isEmployee = true;
        }
        else
        {
            $rootScope.isEmployee = false;
        }
    });
    // !!!!!!!!!!!!!!!!!!


    // update active tab on state change
    $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
        $rootScope.activeTab = toState.data.activeTab;
    });
}


// manually bootstrap angular after the JWT token is retrieved from the server
$(function () {
    // get JWT token from server
    $.get('/app/token', function (token) {
        window.jwtToken = token;
        angular.bootstrap(document, ['routerApp']);
    });
});


})();