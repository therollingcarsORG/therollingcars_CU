'use strict';

// angular.
//   module('core.phone').
//   factory('Phone', ['$resource',
//     function($resource) {
//       return $resource('protolist/phones/:phoneId.json', {}, {
//         fetch: {
//           method: 'GET',
//           params: {phoneId: 'phones'},
//           isArray: true
//         }
//       });
//     }
//   ]);

angular.
  module('core.phone').
  factory('Phone', ['$resource',
    function($resource) {
      return $resource('/inventory', {}, {
        fetch: {
          method: 'GET',
          params: {phoneId: 'phones'},
          isArray: true
        }
      });
    }
  ]);

