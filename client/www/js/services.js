'use strict';

//Desde aquí llamo a los métodos CRUD de mi RestService

angular.module('starterServices', ['ngResource','starterConfiguration'])

  .factory('usersService', ['$resource', 'CONFIG', function($resource, CONFIG) {
    return $resource(CONFIG.API_END_POINT + '/api/users', {}, {
      'query': {method: 'GET', isArray: true}
    });
  }])

  .factory('fisiosService', ['$resource', '$http','CONFIG', function($resource, $http, CONFIG) {    
    return {
      listaFisios: function(token){
        console.log("Token en la parte del servicio: ",token);
        //Hacemos la petición al WS
        var FisiosObject = $resource(CONFIG.API_END_POINT + '/api/fisios', $http.defaults.headers.common['Authorization'] = 'Bearer ' + token, {});
        //Decimos que queremos obtener. Concretamente la lista de fisios. (las opciones son: get, save, query, remove, delete) @see https://docs.angularjs.org/api/ngResource/service/$resource
        var fisios = FisiosObject.query({method: 'GET', isArray: true});
        console.log('Lista de fisios a devolver:', fisios);
        return fisios;
      },
      fisio: $resource(CONFIG.API_END_POINT + '/api/fisios/:id', {
        'get': {method: 'GET', isArray: false}
      })
    };
  }]);

  /*.factory('fisiosService', ['$resource', 'CONFIG', function($resource, CONFIG) {
    return $resource(CONFIG.API_END_POINT + '/api/fisios/:id', {fisioId:'@id'}, {
      'get': {method: 'GET', isArray: true}
    });
  }]);*/