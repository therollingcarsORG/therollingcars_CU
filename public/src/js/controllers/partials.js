var routerApp = angular.module('routerApp', ['ui.router']);

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