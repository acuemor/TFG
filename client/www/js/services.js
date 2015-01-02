'use strict';

//Desde aquí llamo a los métodos CRUD de mi RestService

angular.module('starterServices', ['ngResource', 'starterConfiguration'])

        .factory('usersService', ['$resource', 'CONFIG', function($resource, CONFIG) {
    return $resource(CONFIG.API_END_POINT + '/api/users', {}, {
      getAll: {method: 'GET', isArray: true}
    });
  }])

        .factory('fisiosService', ['$resource', 'CONFIG', function($resource, CONFIG) {
    return $resource(CONFIG.API_END_POINT + '/api/fisios', {}, {
      getAll: {method: 'GET', isArray: true}
    });
  }]);