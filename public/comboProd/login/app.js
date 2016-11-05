(function () {
    'use strict';

    angular
        .module('appAuth')
        .run(run);

    function run($http, $rootScope, $window) {
        // add JWT token as default auth header
        $http.defaults.headers.common['Authorization'] = 'Bearer ' + $window.jwtToken;

        // update active tab on state change
        $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
            $rootScope.activeTab = toState.data.activeTab;
        });
    }

    // manually bootstrap angular after the JWT token is retrieved from the server
    $(function () {
        // get JWT token from server
        $.get('/publicAuth/token', function (token) {
            window.jwtToken = token;

            angular.bootstrap(document, ['appAuth']);
        });
    });
})();